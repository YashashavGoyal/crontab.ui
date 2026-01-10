"use client";

import CronJobRow, { CronJob } from "./CronJobRow";
import { Plus, Activity } from "lucide-react";

// Props for the CronList component
type CronListProps = {
    jobs: CronJob[];
    onStatusChange: (id: string, status: CronJob["status"]) => void;
    onDelete: (id: string) => void;
    onEdit: (job: CronJob) => void;
    onAddClick: () => void;
};

// CronList component
export default function CronList({
    jobs,
    onStatusChange,
    onDelete,
    onEdit,
    onAddClick
}: CronListProps) {

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30 text-center">
                <div className="p-4 bg-slate-900 rounded-full mb-4">
                    <Activity className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-1">No Cron Jobs Created</h3>
                <p className="text-slate-500 max-w-sm mb-6">
                    Your dashboard is empty. Create your first cron job to start managing tasks.
                </p>
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Create Job
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2 sm:gap-0">
                <h2 className="text-lg font-semibold text-slate-200">Active Schedules</h2>
                <div className="text-xs font-mono text-slate-500">
                    {jobs.filter(j => j.status === 'running').length} running / {jobs.length} total
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {jobs.map((job) => (
                    <CronJobRow
                        key={job.id}
                        job={job}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}
