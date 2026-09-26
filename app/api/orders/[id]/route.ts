import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { OrderStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID: OrderStatus[] = ["en_attente", "payee", "expediee", "annulee"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const { id } = await params;
  const { status } = (await req.json()) as { status: OrderStatus };
  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }
  const order = updateOrderStatus(id, status);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }
  return NextResponse.json({ order });
}
