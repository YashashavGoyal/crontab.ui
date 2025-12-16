import { useState } from "react";
import { CronJob } from "../components/dashboard/CronJobRow";

export function useCronJobs(initialJobs: CronJob[] = []) {
    const [jobs, setJobs] = useState<CronJob[]>(initialJobs);

    const addJob = (data: { name: string; schedule: string; command: string }) => {
        const newJob: CronJob = {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: "stopped",
        };
        setJobs([...jobs, newJob]);
    };

    const updateJob = (id: string, data: Partial<CronJob>) => {
        setJobs(jobs.map(j => j.id === id ? { ...j, ...data } : j));
    };

    const deleteJob = (id: string) => {
        setJobs(jobs.filter(j => j.id !== id));
    };

    const setStatus = (id: string, status: CronJob["status"]) => {
        updateJob(id, { status });
    };

    const setAllJobs = (newJobs: CronJob[]) => {
        setJobs(newJobs);
    };

    return {
        jobs,
        addJob,
        updateJob,
        deleteJob,
        setStatus,
        setAllJobs
    };
}
