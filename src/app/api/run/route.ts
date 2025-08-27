import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query } = await request.json();

  // TODO: replace mock data with real engine checks
  const engines = [
    { name: "ChatGPT",    status: "done" as const, score: 62 },
    { name: "Perplexity", status: "done" as const, score: 48 },
    { name: "Copilot",    status: "done" as const, score: 30 },
  ];

  return NextResponse.json({ query, engines });
}
