import { NextResponse } from "next/server";
import { requireInvestor } from "@/lib/auth";
import { getInvestorById, getInvestmentsByInvestor, getOrdersByInvestor, getRates } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireInvestor();
  if (!session) {
    return NextResponse.json({ error: "Connexion investisseur requise." }, { status: 401 });
  }
  const investor = getInvestorById(session.id);
  if (!investor) {
    return NextResponse.json({ error: "Investisseur introuvable." }, { status: 404 });
  }
  const investments = getInvestmentsByInvestor(investor.id);
  const orders = getOrdersByInvestor(investor.id);
  const rates = getRates();
  return NextResponse.json({ investor, investments, orders, rates });
}
