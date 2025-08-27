import { NextResponse } from "next/server";
import { addRun, Run } from "@/lib/runs";

export async function POST(request: Request) {
  const { query } = await request.json();

  const engines = [
    { name: "ChatGPT",    status: "done" as const, score: 62 },
    { name: "Perplexity", status: "done" as const, score: 48 },
    { name: "Copilot",    status: "done" as const, score: 30 },
  ];

  const run: Run = {
    id: crypto.randomUUID(),
    query,
    at: new Date().toISOString(),
    engines,
  };

  await addRun(run);
  return NextResponse.json(run);
}
