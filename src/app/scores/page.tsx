"use client";
import { useEffect, useState } from "react";

export default function ScoresPage() {
  const [runs, setRuns] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/runs")
      .then(res => res.json())
      .then(data => setRuns(data.runs || []));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Scores</h1>
      <ul>
        {runs.map(run => (
          <li key={run.id} className="mb-2">
            <p><strong>{run.query}</strong> ({new Date(run.at).toLocaleString()})</p>
            <ul className="ml-4">
              {run.engines.map((e: any) => (
                <li key={e.name}>{e.name}: {e.score}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
