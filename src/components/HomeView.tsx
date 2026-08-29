"use client";

import { useEffect, useState } from "react";

type Stats = {
  total: number;
  average: number;
  stars: { 1: number; 2: number; 3: number; 4: number; 5: number };
  bad: {
    id: string;
    business_slug: string;
    rating: number;
    comment: string;
    contact: string;
    createdAt: string;
  }[];
};

export function HomeView() {
  const [owner, setOwner] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  async function refresh() {
    const me = await fetch("/api/login");
    if (!me.ok) {
      setOwner(false);
      setStats(null);
      return;
    }
    setOwner(true);
    const res = await fetch("/api/reviews");
    if (!res.ok) return;
    setStats((await res.json()) as Stats);
  }

  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    if (!owner) return;
    const id = window.setInterval(() => void refresh(), 30000);
    return () => window.clearInterval(id);
  }, [owner]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setBusy(false);
    if (!res.ok) {
      setError("Could not sign in");
      return;
    }
    setPassword("");
    setLoginOpen(false);
    await refresh();
  }

  async function logout() {
    await fetch("/api/login", { method: "DELETE" });
    setOwner(false);
    setStats(null);
  }

  if (owner && stats) {
    const maxStar = Math.max(1, ...Object.values(stats.stars));
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[#5f6368]">Live</p>
            <h1 className="mt-1 text-[22px] font-normal text-[#202124]">Reviews</h1>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-[13px] text-[#5f6368] hover:text-[#202124]"
          >
            Sign out
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Reviews" value={String(stats.total)} />
          <Stat label="Average" value={stats.total ? `${stats.average}` : "—"} />
          <Stat label="Bad" value={String(stats.bad.length)} />
        </div>

        <div className="mt-8 space-y-2">
          {([5, 4, 3, 2, 1] as const).map((star) => (
            <div key={star} className="flex items-center gap-3 text-[13px] text-[#5f6368]">
              <span className="w-8">{star}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8eaed]">
                <div
                  className="h-full rounded-full bg-[#fbbc04]"
                  style={{ width: `${(stats.stars[star] / maxStar) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right">{stats.stars[star]}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-[16px] font-medium text-[#202124]">Bad reviews</h2>
        {stats.bad.length === 0 ? (
          <p className="mt-3 text-[14px] text-[#5f6368]">None yet. This list updates live.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {stats.bad.map((review) => (
              <li key={review.id} className="rounded-xl border border-[#dadce0] p-4">
                <p className="text-[13px] text-[#5f6368]">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)} · {review.business_slug} ·{" "}
                  {new Date(review.createdAt).toLocaleString()}
                </p>
                {review.comment ? (
                  <p className="mt-2 text-[15px] leading-6 text-[#202124]">{review.comment}</p>
                ) : null}
                {review.contact ? (
                  <p className="mt-2 text-[13px] text-[#5f6368]">{review.contact}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }

  return (
    <main className="relative mx-auto flex min-h-full w-full max-w-[480px] flex-1 flex-col justify-center px-5 py-10 text-center">
      <p className="text-[13px] text-[#5f6368]">ReviewUs</p>
      <h1 className="mt-2 text-[22px] font-normal text-[#202124]">Rate your experience</h1>
      <p className="mt-2 text-[14px] leading-5 text-[#5f6368]">
        Open a review link from your NFC tap to leave a rating.
      </p>

      {loginOpen ? (
        <form onSubmit={(event) => void login(event)} className="mt-10 space-y-3 text-left">
          <label className="block">
            <span className="mb-1 block text-[12px] text-[#5f6368]">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              inputMode="email"
              autoComplete="username"
              placeholder="Optional"
              className="w-full rounded-lg border border-[#dadce0] px-3.5 py-2.5 text-[16px] outline-none focus:border-[#1a73e8]"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[12px] text-[#5f6368]">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="w-full rounded-lg border border-[#dadce0] px-3.5 py-2.5 text-[16px] outline-none focus:border-[#1a73e8]"
            />
          </label>
          {error ? <p className="text-[13px] text-[#d93025]">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-[#1a73e8] px-5 py-2 text-[14px] font-medium text-white disabled:opacity-50"
          >
            {busy ? "…" : "Sign in"}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="absolute bottom-4 right-5 text-[10px] text-[#e8eaed] hover:text-[#9aa0a6]"
          aria-label="Owner sign in"
        >
          Owner
        </button>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#dadce0] px-4 py-3 text-left">
      <p className="text-[12px] text-[#5f6368]">{label}</p>
      <p className="mt-1 text-[22px] text-[#202124]">{value}</p>
    </div>
  );
}
