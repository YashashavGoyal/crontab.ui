import { useEffect, useRef, useState } from "react";
import { CronJob } from "../components/dashboard/CronJobRow";
import { saveCron, loadCron } from "../lib/saveCron";

export function useCronJobs() {
    const [jobs, setJobs] = useState<CronJob[]>([]);
    const hasHydrated = useRef(false);

    // Load jobs from local storage on initial mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setJobs(loadCron());
        hasHydrated.current = true;
    }, []);

    // Save jobs to local storage whenever the jobs state changes
    useEffect(() => {
        if (!hasHydrated.current) return;
        saveCron(jobs);
    }, [jobs]);

    // Adds a new job to the list
    const addJob = (data: { name: string; schedule: string; command: string }) => {
        const newJob: CronJob = {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: "stopped",
        };
        setJobs([...jobs, newJob]);
    };

    // Updates an existing job by ID
    const updateJob = (id: string, data: Partial<CronJob>) => {
        setJobs(jobs.map(j => j.id === id ? { ...j, ...data } : j));
    };

    // Deletes a job by ID
    const deleteJob = (id: string) => {
        setJobs(jobs.filter(j => j.id !== id));
    };

    // Sets the status (running/stopped) of a job
    const setStatus = (id: string, status: CronJob["status"]) => {
        updateJob(id, { status });
    };

    // Replaces all the jobs (used for import)
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
