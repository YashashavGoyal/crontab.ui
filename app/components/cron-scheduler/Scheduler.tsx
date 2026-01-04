"use client";

import { useState, useMemo } from "react";
import CronParser from "cron-parser";
import { format } from "date-fns";
import {
    Globe,
    Terminal,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Clock,
    Zap,
} from "lucide-react";
import parseNaturalLanguage from "../../lib/parseNL";


export default function Scheduler() {

    type Timezone = "UTC" | "LOCAL";

    const PRESETS = [
        { label: "Every Minute", value: "* * * * *" },
        { label: "Every 5 Min", value: "*/5 * * * *" },
        { label: "Hourly", value: "0 * * * *" },
        { label: "Daily Midnight", value: "0 0 * * *" },
        { label: "Weekly (Sun)", value: "0 0 * * 0" },
    ];

    const [inputValue, setInputValue] = useState("*/5 * * * *");
    const [timezone, setTimezone] = useState<Timezone>("LOCAL");

    const derivedData = useMemo(() => {
        if (!inputValue.trim()) {
            return {
                nextRuns: [],
                error: null,
                isNaturalLang: false,
                cronExpression: inputValue
            };
        }

        try {
            const nlResult = parseNaturalLanguage(inputValue);
            const expression = nlResult ?? inputValue;
            const isNatural = Boolean(nlResult);

            const interval = CronParser.parse(expression, {
                currentDate: new Date(),
                tz: timezone === "UTC"
                    ? "UTC"
                    : Intl.DateTimeFormat().resolvedOptions().timeZone,
            });

            const runs: Date[] = [];
            for (let i = 0; i < 5; i++) {
                runs.push(interval.next().toDate());
            }

            return {
                nextRuns: runs,
                error: null,
                isNaturalLang: isNatural,
                cronExpression: expression
            };
        } catch {
            return {
                nextRuns: [],
                error: "Invalid Cron Expression",
                isNaturalLang: false,
                cronExpression: inputValue
            };
        }
    }, [inputValue, timezone]);

    const { nextRuns, error, isNaturalLang, cronExpression } = derivedData;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12 relative z-10">

            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/50 text-indigo-400 text-xs font-medium mb-2">
                    <Zap className="w-3 h-3" />
                    <span>Cron Scheduler</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                    Schedule with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Precision</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Generate cron expressions using natural language or validate existing ones instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">


                <div className="md:col-span-7 space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-3xl p-1 shadow-2xl">
                        <div className="bg-slate-950/80 rounded-[1.4rem] p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-indigo-400" />
                                    Expression
                                </label>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${error ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                    {error ? "Invalid" : "Active"}
                                </span>
                            </div>

                            <div className="relative group">
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="*/5 * * * * or 'Every Tuesday'"
                                    className={`w-full bg-slate-900/50 border rounded-xl p-5 pl-4 text-xl font-mono tracking-wide text-white transition-all
                            ${error
                                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-slate-700 group-hover:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20"
                                        }
                            focus:outline-none focus:ring-4 placeholder:text-slate-600`}
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="h-6">
                                    {error ? (
                                        <span className="text-red-400 flex items-center gap-2 animate-pulse">
                                            <AlertCircle className="w-4 h-4" />
                                            {error}
                                        </span>
                                    ) : (
                                        <span className="text-emerald-400 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {isNaturalLang ? "Natural language recognized" : "Standard cron syntax"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Quick Start</h3>
                        <div className="flex flex-wrap gap-3">
                            {PRESETS.map((p) => (
                                <button
                                    key={p.label}
                                    onClick={() => setInputValue(p.value)}
                                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isNaturalLang && !error && (
                        <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-indigo-300 font-bold mb-1 uppercase tracking-wider">
                                    Translates To
                                </p>
                                <code className="text-2xl font-mono text-white font-bold">
                                    {cronExpression}
                                </code>
                            </div>
                            <div className="p-3 bg-indigo-500/20 rounded-full">
                                <Clock className="w-6 h-6 text-indigo-400" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="md:col-span-5">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl sticky top-24">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                                <Calendar className="w-5 h-5 text-indigo-400" />
                                Forecast
                            </h2>

                            <button
                                onClick={() => setTimezone((t) => (t === "UTC" ? "LOCAL" : "UTC"))}
                                className="group flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 transition-all"
                            >
                                <Globe className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                                {timezone}
                            </button>
                        </div>

                        {nextRuns.length ? (
                            <div className="relative">
                                <div className="absolute top-3 bottom-5 left-[7px] w-0.5 bg-slate-800" />
                                <div className="space-y-6">
                                    {nextRuns.map((run, i) => (
                                        <div key={i} className="relative pl-8 group">
                                            <div className={`absolute left-0 w-4 h-4 rounded-full border-2 z-10 transition-colors ${i === 0 ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-900 border-slate-700 group-hover:border-slate-500'}`} />
                                            <div
                                                className={`font-mono text-lg ${i === 0 ? "text-white font-bold" : "text-slate-400 group-hover:text-slate-300"
                                                    }`}
                                            >
                                                {format(run, "HH:mm:ss")}
                                            </div>
                                            <div className="text-sm text-slate-500 group-hover:text-slate-400">
                                                {format(run, "EEEE, MMMM do")}
                                            </div>
                                            {i === 0 && (
                                                <div className="absolute right-0 top-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">
                                                    Next
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 px-4 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                                <Clock className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                                <p className="text-slate-500">Waiting for a valid schedule...</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}