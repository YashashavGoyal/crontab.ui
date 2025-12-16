"use client";

import { useState } from "react";
import CronList from "./CronList";
import AddCronModal from "./AddCronModal";
import DashboardHeader from "./DashboardHeader";
import { CronJob } from "./CronJobRow";
import { useCronJobs } from "../../hooks/useCronJobs";
import { exportToJSON, exportToCrontab, parseImportFile } from "../../lib/cronImportExport";

export default function CronDashboard() {

    const { jobs, addJob, updateJob, deleteJob, setStatus, setAllJobs } = useCronJobs([
        { id: "1", name: "Daily Backup", schedule: "0 0 * * *", command: "pg_dump db > /backup/db.sql", status: "running" },
        { id: "2", name: "Log Rotation", schedule: "0 0 1 * *", command: "logrotate /etc/logrotate.conf", status: "paused" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<CronJob | null>(null);

    const handleSaveJob = (data: { name: string; schedule: string; command: string }) => {
        if (editingJob) {
            updateJob(editingJob.id, data);
        } else {
            addJob(data);
        }
    };

    const handleEditJob = (job: CronJob) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingJob(null);
        setIsModalOpen(true);
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,.txt,application/json,text/plain';
        input.onchange = async (e: any) => {
            const file = e.target.files[0];
            try {
                const newJobs = await parseImportFile(file);
                setAllJobs(newJobs);
            } catch (err: any) {
                alert(err.message || "Failed to import jobs.");
            }
        };
        input.click();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            <DashboardHeader
                onImport={handleImport}
                onExportJSON={() => exportToJSON(jobs)}
                onExportCrontab={() => exportToCrontab(jobs)}
                onAddClick={handleAddClick}
            />

            <CronList
                jobs={jobs}
                onStatusChange={setStatus}
                onDelete={deleteJob}
                onEdit={handleEditJob}
                onAddClick={handleAddClick}
            />

            <AddCronModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveJob}
                initialData={editingJob}
            />
        </div>
    );
}
