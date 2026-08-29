import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "ru_session";
const WEEK = 60 * 60 * 24 * 7;

function secret() {
  return process.env.OWNER_SECRET || process.env.OWNER_PASSWORD || "reviewus-dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function ownerEmail() {
  return (process.env.OWNER_EMAIL || "").trim().toLowerCase();
}

export function ownerPassword() {
  return process.env.OWNER_PASSWORD || "";
}

function sameSecret(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkLogin(email: string, password: string) {
  const wantEmail = ownerEmail();
  const wantPass = ownerPassword();
  if (!wantPass) return false;

  const trimmed = email.trim().toLowerCase();
  const looksLikeEmail = trimmed.includes("@");
  const pass = looksLikeEmail ? password : password || email;
  if (!sameSecret(pass, wantPass)) return false;
  if (looksLikeEmail && wantEmail && trimmed !== wantEmail) return false;
  return true;
}

export function setSession() {
  const exp = Date.now() + WEEK * 1000;
  const payload = `1.${exp}`;
  cookies().set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge: WEEK,
  });
}

export function clearSession() {
  cookies().set(COOKIE, "", { path: "/", maxAge: 0 });
}

export function isOwner() {
  const raw = cookies().get(COOKIE)?.value || "";
  const [ok, exp, sig] = raw.split(".");
  if (!ok || !exp || !sig) return false;
  const payload = `${ok}.${exp}`;
  const expect = sign(payload);
  try {
    if (sig.length !== expect.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return false;
  } catch {
    return false;
  }
  return Number(exp) > Date.now();
}
