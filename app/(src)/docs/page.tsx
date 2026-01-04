"use client";

import { Activity, Clock, Upload, Plus, Terminal } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 py-12 px-4 sm:px-6">

            <section className="space-y-6">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                    Wait, what is a <span className="text-indigo-500">Cron Job?</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed">
                    A <strong>Cron Job</strong> is a time-based job scheduler in Unix-like computer operating systems.
                    Users who set up and maintain software environments use cron to schedule jobs (commands or shell scripts)
                    to run periodically at fixed times, dates, or intervals.
                </p>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-indigo-400" />
                        Anatomy of a Cron Expression
                    </h3>
                    <div className="font-mono text-sm space-y-2">
                        <p className="text-slate-400">
                            <span className="text-emerald-400">* * * * *</span> command_to_execute
                        </p>
                        <div className="grid grid-cols-5 gap-1 sm:gap-4 text-xs text-slate-500 pt-2 border-t border-slate-800/50">
                            <div>
                                <span className="text-emerald-500 font-bold block mb-1">Minute</span>
                                (0 - 59)
                            </div>
                            <div>
                                <span className="text-emerald-500 font-bold block mb-1">Hour</span>
                                (0 - 23)
                            </div>
                            <div>
                                <span className="text-emerald-500 font-bold block mb-1">Day</span>
                                (1 - 31)
                            </div>
                            <div>
                                <span className="text-emerald-500 font-bold block mb-1">Month</span>
                                (1 - 12)
                            </div>
                            <div>
                                <span className="text-emerald-500 font-bold block mb-1">Weekday</span>
                                (0 - 6)
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-3xl font-bold text-white">How to use Chronicle</h2>
                    <p className="text-slate-400 mt-2">Master your schedule with our command center.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                            <Plus className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">Creating Jobs</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Click <strong>Add Job</strong> to open the creator. You can use our visual <strong>Form Builder</strong> to pick times without knowing syntax, or switch to <strong>Raw Expression</strong> mode for power usage.
                        </p>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                            <Activity className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">Control Status</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Toggle jobs between <span className="text-emerald-400">Running</span>, <span className="text-amber-400">Paused</span>, and <span className="text-slate-500">Stopped</span> directly from the list. This helps you manage active tasks without deleting them.
                        </p>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                            <Upload className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">Import & Export</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Backup your configuration as <strong>JSON</strong> or export as a standard <strong>Crontab</strong> text file to deploy to your server. You can import both formats back into Chronicle.
                        </p>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">Editing</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Need to change a schedule? Just click the edit icon on any job row. Your existing schedule will be pre-filled in the form builder.
                        </p>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors md:col-span-2">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                            <span className="font-mono font-bold text-amber-400 text-xs">ESC</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">Pro Tip: Keyboard Shortcuts</h3>
                        <p className="text-slate-400 text-sm">
                            Power users appreciate speed. You can quickly close the job creation/editing modal by pressing the <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-200 text-xs font-mono border border-slate-700 mx-1">Esc</kbd> key on your keyboard.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 text-center border border-indigo-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to schedule?</h2>
                <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                    Jump into the dashboard and start organizing your tasks with precision.
                </p>
                <Link
                    href="/manage"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20"
                >
                    Go to Dashboard
                    <Activity className="w-4 h-4" />
                </Link>
            </section>

        </div>
    );
}
