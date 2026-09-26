import { NextRequest, NextResponse } from "next/server";
import { createOrder, findOrCreateInvestor, getOrders, getProductById, getRates } from "@/lib/db";
import { requireAdmin, getServerSession } from "@/lib/auth";
import { toFCFA } from "@/lib/currency";
import { Currency, OrderItem, PaymentMethod } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const orders = getOrders().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ orders });
}

interface CartLine {
  productId: string;
  qty: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, items, currency, paymentMethod } = body as {
    name: string;
    email: string;
    phone: string;
    items: CartLine[];
    currency: Currency;
    paymentMethod: PaymentMethod;
  };

  if (!name || !email || !phone || !items || items.length === 0 || !currency) {
    return NextResponse.json(
      { error: "Coordonnées et au moins un article sont requis." },
      { status: 400 }
    );
  }

  const orderItems: OrderItem[] = [];
  for (const line of items) {
    const product = getProductById(line.productId);
    if (!product || !product.active) {
      return NextResponse.json({ error: "Un des produits est introuvable." }, { status: 400 });
    }
    if (product.stock < line.qty) {
      return NextResponse.json(
        { error: `Stock insuffisant pour "${product.name}" (restant : ${product.stock}).` },
        { status: 400 }
      );
    }
    orderItems.push({
      productId: product.id,
      name: product.name,
      qty: line.qty,
      priceFCFA: product.priceFCFA,
    });
  }

  const totalFCFA = orderItems.reduce((s, it) => s + it.priceFCFA * it.qty, 0);
  const rates = getRates();
  // On vérifie juste que la devise choisie est bien gérée ; le montant réglé
  // correspond au total FCFA converti côté affichage (voir lib/currency.ts).
  void toFCFA(0, currency, rates);

  const session = await getServerSession();
  const buyer =
    session?.role === "investor"
      ? { id: session.id, name: session.name }
      : findOrCreateInvestor(name, email, phone);

  const order = createOrder({
    investorId: buyer.id,
    investorName: buyer.name,
    items: orderItems,
    totalFCFA,
    currency,
    paymentMethod: paymentMethod ?? "virement",
  });

  return NextResponse.json({ order });
}
