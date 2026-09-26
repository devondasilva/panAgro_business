import { NextRequest, NextResponse } from "next/server";
import { getOffers, createOffer } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const offers = getOffers();
  return NextResponse.json({ offers });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 401 });
  }

  const body = await req.json();
  const { title, durationLabel, roiPercent, minAmountFCFA, benefits, featured } = body as {
    title: string;
    durationLabel: string;
    roiPercent: number;
    minAmountFCFA: number;
    benefits: string[];
    featured?: boolean;
  };

  if (!title || !durationLabel || roiPercent == null || minAmountFCFA == null) {
    return NextResponse.json(
      { error: "Titre, durée, taux de rendement et montant minimum sont requis." },
      { status: 400 }
    );
  }

  const offer = createOffer({
    title,
    durationLabel,
    roiPercent,
    minAmountFCFA,
    benefits: benefits ?? [],
    featured: featured ?? false,
    active: true,
  });
  return NextResponse.json({ offer });
}
