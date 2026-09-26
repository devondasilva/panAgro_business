import { NextRequest, NextResponse } from "next/server";
import { deleteLead, updateLeadStatus } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { LeadStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const { id } = await params;
  const { status } = (await req.json()) as { status: LeadStatus };
  const lead = updateLeadStatus(id, status);
  if (!lead) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }
  return NextResponse.json({ lead });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const { id } = await params;
  const ok = deleteLead(id);
  if (!ok) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
