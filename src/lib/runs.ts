import { promises as fs } from "fs";
import path from "path";

export type EngineResult = { name: string; status: "done"; score: number };
export type Run = { id: string; query: string; at: string; engines: EngineResult[] };

const DATA_DIR = path.join(process.cwd(), "data");
const RUNS_FILE = path.join(DATA_DIR, "runs.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(RUNS_FILE); } catch { await fs.writeFile(RUNS_FILE, "[]", "utf8"); }
}

export async function getRuns(): Promise<Run[]> {
  await ensureFile();
  const raw = await fs.readFile(RUNS_FILE, "utf8");
  return JSON.parse(raw) as Run[];
}

export async function addRun(run: Run): Promise<Run> {
  const runs = await getRuns();
  runs.push(run);
  await fs.writeFile(RUNS_FILE, JSON.stringify(runs, null, 2), "utf8");
  return run;
}
