import { NextRequest, NextResponse } from "next/server";
import { findOrCreateInvestor } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone } = body as { name: string; email: string; phone: string };

  if (!email || !phone) {
    return NextResponse.json({ error: "Email et téléphone sont requis." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json(
      { error: "Le nom est requis pour la première connexion." },
      { status: 400 }
    );
  }

  const investor = findOrCreateInvestor(name, email, phone);
  const token = await createSessionToken("investor", investor.id, investor.name);
  const res = NextResponse.json({
    session: { role: "investor", id: investor.id, name: investor.name },
    investor,
  });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
