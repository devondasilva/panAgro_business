import { NextRequest, NextResponse } from "next/server";
import { updateInvestmentStatus } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { InvestmentStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID: InvestmentStatus[] = ["en_attente", "confirmee", "terminee", "annulee"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const { id } = await params;
  const { status } = (await req.json()) as { status: InvestmentStatus };
  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }
  const investment = updateInvestmentStatus(id, status);
  if (!investment) {
    return NextResponse.json({ error: "Investissement introuvable." }, { status: 404 });
  }
  return NextResponse.json({ investment });
}
