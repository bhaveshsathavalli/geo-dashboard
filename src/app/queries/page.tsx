"use client";
import { useState } from "react";

type EngineResult = { name: string; status: "queued" | "running" | "done"; score?: number };

export default function QueriesPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EngineResult[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setResults([]);

    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });

    const data = await res.json();
    setResults(data.engines);
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Track a query</h1>
      <p className="text-sm text-gray-600">Enter a query your brand should rank for.</p>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2 outline-none"
          placeholder="e.g., best productivity tool for freelancers"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Running..." : "Track"}
        </button>
      </form>

      <div className="mt-6 rounded-md border bg-white p-4">
        <h2 className="font-medium">Results</h2>
        {!results.length && <p className="text-sm text-gray-600">No runs yet.</p>}
        <ul className="mt-2 space-y-2">
          {results.map((r) => (
            <li key={r.name} className="flex items-center justify-between rounded border p-3">
              <span className="font-medium">{r.name}</span>
              <span className="text-sm">
                {r.status === "done" ? `Score: ${r.score}` : r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
