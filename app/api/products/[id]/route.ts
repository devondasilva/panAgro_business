import { NextRequest, NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "@/lib/db";
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
  const product = updateProduct(id, patch);
  if (!product) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }
  return NextResponse.json({ product });
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
  const ok = deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
