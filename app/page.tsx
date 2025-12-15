"use client";

import { useEffect, useState } from "react";
import CronParser from "cron-parser";
import { format } from "date-fns";
import {
  Globe,
  Terminal,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";


type Timezone = "UTC" | "LOCAL";

const PRESETS = [
  { label: "Every Minute", value: "* * * * *" },
  { label: "Every 5 Min", value: "*/5 * * * *" },
  { label: "Hourly", value: "0 * * * *" },
  { label: "Daily Midnight", value: "0 0 * * *" },
  { label: "Weekly (Sun)", value: "0 0 * * 0" },
];

// In a real app, this would use an NLP library or API.
// This is a heuristic parser for the demo.
// NOTE: This is intentionally heuristic.
// Real NLP should ALWAYS require user confirmation.
// Dummy NLP using regex
const parseNaturalLanguage = (input: string): string | null => {
  const text = input.toLowerCase().trim();

  if (/every minute/.test(text)) return "* * * * *";

  const everyMin = text.match(/every (\d+) minutes?/);
  if (everyMin) return `*/${everyMin[1]} * * * *`;

  if (/every hour/.test(text)) return "0 * * * *";

  if (/midnight/.test(text)) return "0 0 * * *";

  const weekly = text.match(
    /every (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/
  );

  if (weekly) {
    const days: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    return `0 0 * * ${days[weekly[1]]}`;
  }

  return null;
};



export default function ChronicleApp() {

  const [inputValue, setInputValue] = useState("*/5 * * * *");
  const [cronExpression, setCronExpression] = useState("*/5 * * * *");
  const [nextRuns, setNextRuns] = useState<Date[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<Timezone>("LOCAL");
  const [isNaturalLang, setIsNaturalLang] = useState(false);


  useEffect(() => {
    if (!inputValue.trim()) {
      setNextRuns([]);
      setError(null);
      setIsNaturalLang(false);
      return;
    }

    try {
      const nlResult = parseNaturalLanguage(inputValue);
      const expression = nlResult ?? inputValue;

      setIsNaturalLang(Boolean(nlResult));
      setCronExpression(expression);

      const interval = CronParser.parse(expression, {
        currentDate: new Date(),
        tz:
          timezone === "UTC"
            ? "UTC"
            : Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      const runs: Date[] = [];
      for (let i = 0; i < 5; i++) {
        runs.push(interval.next().toDate());
      }

      setNextRuns(runs);
      setError(null);
    } catch {
      setNextRuns([]);
      setError("Invalid Cron Expression");
    }
  }, [inputValue, timezone]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="space-y-6">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <label className="text-sm text-slate-400">
                Cron or Natural Language
              </label>

              <div className="relative mt-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="*/5 * * * * or 'Every Tuesday'"
                  className={`w-full bg-slate-950 border rounded-lg p-4 pl-12 text-lg
                    ${error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-700 focus:ring-indigo-500"
                    }
                    focus:outline-none focus:ring-2`}
                />
                <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>

              <div className="mt-3 text-sm">
                {error ? (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {isNaturalLang
                      ? "Natural language detected"
                      : "Valid cron syntax"}
                  </span>
                )}
              </div>
            </div>


            <div>
              <h3 className="text-sm text-slate-500 mb-2">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setInputValue(p.value)}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm hover:bg-slate-700"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {isNaturalLang && !error && (
              <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                <p className="text-xs text-indigo-300 font-bold mb-1">
                  Generated Cron
                </p>
                <code className="text-xl font-mono text-white">
                  {cronExpression}
                </code>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Upcoming Runs
              </h2>

              <button
                onClick={() =>
                  setTimezone((t) => (t === "UTC" ? "LOCAL" : "UTC"))
                }
                className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700"
              >
                <Globe className="w-3 h-3" />
                {timezone}
              </button>
            </div>

            {nextRuns.length ? (
              <div className="space-y-4 border-l border-slate-800 pl-6">
                {nextRuns.map((run, i) => (
                  <div key={i}>
                    <div
                      className={`font-mono ${i === 0 ? "text-white font-bold" : "text-slate-400"
                        }`}
                    >
                      {format(run, "HH:mm:ss")}
                    </div>
                    <div className="text-sm text-slate-500">
                      {format(run, "EEEE, MMMM do, yyyy")}
                    </div>
                    {i === 0 && (
                      <div className="text-xs text-indigo-400 mt-1">
                        Next run
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-600 text-center py-12">
                Waiting for valid schedule…
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
