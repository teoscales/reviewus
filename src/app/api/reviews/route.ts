import { NextResponse } from "next/server";
import { isOwner } from "@/lib/auth";
import { addReview, listReviews, reviewStats } from "@/lib/reviews-store";

export async function GET() {
  if (!isOwner()) {
    return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  }
  const reviews = await listReviews();
  return NextResponse.json(reviewStats(reviews));
}

export async function POST(request: Request) {
  let body: {
    business_slug?: string;
    rating?: number;
    comment?: string;
    contact?: string | null;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = (body.business_slug ?? "").trim();
  const rating = Number(body.rating);
  if (!slug) {
    return NextResponse.json({ error: "Need a business slug" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Need a rating from 1 to 5" }, { status: 400 });
  }

  const review = await addReview({
    business_slug: slug,
    rating,
    comment: body.comment,
    contact: body.contact,
  });
  return NextResponse.json({ ok: true, review });
}
