import { CronJob } from "../components/dashboard/CronJobRow";

// Saves the list of cron jobs to localStorage
export function saveCron(jobs: CronJob[]) {
    if (typeof window === 'undefined') return;
    const jobJson = JSON.stringify(jobs)
    localStorage.setItem('cronJobs', jobJson)
}

// Loads cron jobs from localStorage, falling back to default example jobs if empty
export function loadCron(): CronJob[] {
    if (typeof window === 'undefined') return [];

    const jobJson = localStorage.getItem('cronJobs')
    return jobJson ? JSON.parse(jobJson) : [
        { id: "1", name: "Daily Backup", schedule: "0 0 * * *", command: "pg_dump db > /backup/db.sql", status: "running" },
        { id: "2", name: "Log Rotation", schedule: "0 0 1 * *", command: "logrotate /etc/logrotate.conf", status: "paused" },
    ]
}
