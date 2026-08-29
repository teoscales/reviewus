import { NextResponse } from "next/server";
import { checkLogin, setSession, clearSession, isOwner } from "@/lib/auth";

export async function GET() {
  if (!isOwner()) {
    return NextResponse.json({ owner: false }, { status: 401 });
  }
  return NextResponse.json({ owner: true });
}

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!checkLogin(body.email ?? "", body.password ?? "")) {
    return NextResponse.json({ error: "Could not sign in" }, { status: 401 });
  }
  setSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  clearSession();
  return NextResponse.json({ ok: true });
}
