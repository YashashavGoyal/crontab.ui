"use client";

import { useState } from "react";
import { Plus, Download, Upload, Activity, FileJson, FileText, ChevronDown } from "lucide-react";

type DashboardHeaderProps = {
    onImport: () => void;
    onExportJSON: () => void;
    onExportCrontab: () => void;
    onAddClick: () => void;
};

export default function DashboardHeader({
    onImport,
    onExportJSON,
    onExportCrontab,
    onAddClick
}: DashboardHeaderProps) {
    const [showExportMenu, setShowExportMenu] = useState(false);

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0" onClick={() => setShowExportMenu(false)}>
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Activity className="w-8 h-8 text-indigo-500" />
                    Command Center
                </h1>
                <p className="text-slate-400">Manage, schedule, and execute your cron jobs.</p>
            </div>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={onImport}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Import
                </button>

                <div className="relative" onClick={e => e.stopPropagation()}>
                    <button
                        onClick={() => setShowExportMenu(!showExportMenu)}
                        className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export
                        <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                    </button>

                    {showExportMenu && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-10 overflow-hidden">
                            <button
                                onClick={onExportJSON}
                                className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-2"
                            >
                                <FileJson className="w-4 h-4 text-emerald-400" />
                                Export as JSON
                            </button>
                            <button
                                onClick={onExportCrontab}
                                className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4 text-indigo-400" />
                                Export to Crontab
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={onAddClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Job
                </button>
            </div>
        </div>
    );
}
