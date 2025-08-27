import { NextResponse } from "next/server";
import { getRuns } from "@/lib/runs";

export async function GET() {
  const runs = await getRuns();
  runs.sort((a, b) => (a.at < b.at ? 1 : -1)); // newest first
  return NextResponse.json({ runs });
}
