import { NextRequest, NextResponse } from "next/server";
import {
  createInvestment,
  findOrCreateInvestor,
  getInvestments,
  getOfferById,
  getRates,
} from "@/lib/db";
import { requireAdmin, getServerSession } from "@/lib/auth";
import { toFCFA } from "@/lib/currency";
import { Currency, PaymentMethod } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const investments = getInvestments().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ investments });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, offerId, amount, currency, paymentMethod } = body as {
    name: string;
    email: string;
    phone: string;
    offerId: string;
    amount: number;
    currency: Currency;
    paymentMethod: PaymentMethod;
  };

  if (!name || !email || !phone || !offerId || !amount || !currency) {
    return NextResponse.json(
      { error: "Tous les champs sont requis pour investir." },
      { status: 400 }
    );
  }

  const offer = getOfferById(offerId);
  if (!offer || !offer.active) {
    return NextResponse.json({ error: "Offre introuvable ou inactive." }, { status: 400 });
  }

  const rates = getRates();
  const amountFCFA = Math.round(toFCFA(Number(amount), currency, rates));
  if (amountFCFA < offer.minAmountFCFA) {
    return NextResponse.json(
      { error: `Le montant minimum pour cette offre est ${offer.minAmountFCFA.toLocaleString("fr-FR")} FCFA (ou l'équivalent).` },
      { status: 400 }
    );
  }

  // Si un investisseur est déjà connecté, on rattache l'investissement à son
  // compte plutôt que d'en (re)chercher un par email/téléphone au hasard.
  const session = await getServerSession();
  const investor =
    session?.role === "investor"
      ? { id: session.id, name: session.name }
      : findOrCreateInvestor(name, email, phone);

  const investment = createInvestment({
    investorId: investor.id,
    investorName: investor.name,
    offerId: offer.id,
    offerTitle: offer.title,
    amountFCFA,
    currency,
    roiPercent: offer.roiPercent,
    durationLabel: offer.durationLabel,
    paymentMethod: paymentMethod ?? "virement",
  });

  return NextResponse.json({ investment, investor });
}
