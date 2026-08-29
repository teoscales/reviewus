import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Review = {
  id: string;
  business_slug: string;
  rating: number;
  comment: string;
  contact: string;
  createdAt: string;
};

const BLOB_PATH = "reviewus-reviews.json";
const localFile = path.join(process.cwd(), "data", "reviews.json");
const tmpFile = path.join("/tmp", "reviewus-reviews.json");

type GlobalReviews = { reviews?: Review[] };

function cache() {
  const g = globalThis as GlobalReviews;
  if (!g.reviews) g.reviews = [];
  return g;
}

function blobOn() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function filePath() {
  return process.env.VERCEL ? tmpFile : localFile;
}

async function readFileStore() {
  try {
    const raw = await readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(reviews: Review[]) {
  const file = filePath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(reviews), "utf8");
}

async function readBlob() {
  if (!blobOn()) return null;
  try {
    const { get } = await import("@vercel/blob");
    const result = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return [];
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeBlob(reviews: Review[]) {
  if (!blobOn()) return;
  const { put } = await import("@vercel/blob");
  await put(BLOB_PATH, JSON.stringify(reviews), {
    access: "private",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

function merge(a: Review[], b: Review[]) {
  const map = new Map<string, Review>();
  for (const item of [...a, ...b]) map.set(item.id, item);
  return Array.from(map.values()).sort((x, y) => y.createdAt.localeCompare(x.createdAt));
}

export async function listReviews() {
  const mem = cache().reviews ?? [];
  const file = await readFileStore();
  const blob = (await readBlob()) ?? [];
  const all = merge(mem, merge(file, blob));
  cache().reviews = all;
  return all;
}

export async function addReview(input: {
  business_slug: string;
  rating: number;
  comment?: string;
  contact?: string | null;
}) {
  const review: Review = {
    id: crypto.randomUUID(),
    business_slug: input.business_slug,
    rating: input.rating,
    comment: (input.comment ?? "").trim(),
    contact: (input.contact ?? "").trim(),
    createdAt: new Date().toISOString(),
  };
  const reviews = [review, ...(await listReviews())];
  cache().reviews = reviews;
  await writeFileStore(reviews);
  await writeBlob(reviews);
  return review;
}

export function reviewStats(reviews: Review[]) {
  const stars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;
  for (const review of reviews) {
    if (review.rating >= 1 && review.rating <= 5) {
      stars[review.rating as 1 | 2 | 3 | 4 | 5] += 1;
      sum += review.rating;
    }
  }
  const total = reviews.length;
  return {
    total,
    average: total ? Math.round((sum / total) * 10) / 10 : 0,
    stars,
    bad: reviews.filter((review) => review.rating <= 3),
  };
}
