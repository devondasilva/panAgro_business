import { NextResponse } from "next/server";
import {
  getInvestors,
  getInvestments,
  getOrders,
  getProducts,
  getOffers,
  getFranchiseLeads,
  getRates,
} from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }

  const investors = getInvestors();
  const investments = getInvestments();
  const orders = getOrders();
  const products = getProducts();
  const offers = getOffers();
  const leads = getFranchiseLeads();
  const rates = getRates();

  const totalInvestedFCFA = investments
    .filter((i) => i.status !== "annulee")
    .reduce((s, i) => s + i.amountFCFA, 0);
  const totalOrdersFCFA = orders
    .filter((o) => o.status !== "annulee")
    .reduce((s, o) => s + o.totalFCFA, 0);

  return NextResponse.json({
    totals: {
      investors: investors.length,
      investments: investments.length,
      totalInvestedFCFA,
      orders: orders.length,
      totalOrdersFCFA,
      products: products.length,
      offers: offers.length,
      newLeads: leads.filter((l) => l.status === "nouveau").length,
    },
    investors,
    investments,
    orders,
    products,
    offers,
    leads,
    rates,
  });
}
