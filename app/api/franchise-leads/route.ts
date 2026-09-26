import { NextRequest, NextResponse } from "next/server";
import { createFranchiseLead, getFranchiseLeads } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
  const leads = getFranchiseLeads().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body as {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Nom, email et téléphone sont requis." }, { status: 400 });
  }
  const lead = createFranchiseLead({ name, email, phone, message: message ?? "" });
  return NextResponse.json({ lead });
}
