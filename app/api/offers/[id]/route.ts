import { NextRequest, NextResponse } from "next/server";
import { updateOffer, deleteOffer } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

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
  const patch = await req.json();
  const offer = updateOffer(id, patch);
  if (!offer) {
    return NextResponse.json({ error: "Offre introuvable." }, { status: 404 });
  }
  return NextResponse.json({ offer });
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
  const ok = deleteOffer(id);
  if (!ok) {
    return NextResponse.json({ error: "Offre introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
