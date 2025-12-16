"use client";

import { Play, Pause, Square, Trash2, Settings2 } from "lucide-react";

export type CronJob = {
    id: string;
    name: string;
    schedule: string;
    command: string;
    status: "running" | "paused" | "stopped";
};

type CronJobRowProps = {
    job: CronJob;
    onStatusChange: (id: string, status: CronJob["status"]) => void;
    onDelete: (id: string) => void;
    onEdit: (job: CronJob) => void;
};

export default function CronJobRow({
    job,
    onStatusChange,
    onDelete,
    onEdit
}: CronJobRowProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors group">
            <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-slate-200 truncate">{job.name}</h3>
                    <span className={`px-2 py-0.5 text-[10px] rounded-full uppercase tracking-wider font-semibold ${job.status === 'running' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        job.status === 'paused' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                        }`}>
                        {job.status}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="bg-slate-950 px-1.5 py-0.5 rounded text-indigo-400">{job.schedule}</span>
                    <span className="truncate opacity-70" title={job.command}>{job.command}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {job.status !== 'running' && (
                    <button
                        onClick={() => onStatusChange(job.id, 'running')}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-md transition-colors"
                        title="Run"
                    >
                        <Play className="w-4 h-4" />
                    </button>
                )}

                {job.status === 'running' && (
                    <button
                        onClick={() => onStatusChange(job.id, 'paused')}
                        className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
                        title="Pause"
                    >
                        <Pause className="w-4 h-4" />
                    </button>
                )}

                <button
                    onClick={() => onStatusChange(job.id, 'stopped')}
                    className={`p-2 rounded-md transition-colors ${job.status === 'stopped'
                        ? 'text-slate-600 cursor-not-allowed'
                        : 'text-slate-400 hover:text-red-400 hover:bg-red-400/10'
                        }`}
                    disabled={job.status === 'stopped'}
                    title="Stop"
                >
                    <Square className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-slate-800 mx-1" />

                <button
                    onClick={() => onEdit(job)}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-md transition-colors"
                    title="Edit"
                >
                    <Settings2 className="w-4 h-4" />
                </button>

                <button
                    onClick={() => onDelete(job.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
