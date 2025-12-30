import { useEffect, useState } from "react";
import { CronJob } from "../components/dashboard/CronJobRow";
import { saveCron, loadCron } from "../lib/saveCron";

export function useCronJobs() {
    const [jobs, setJobs] = useState<CronJob[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const initialJobs = loadCron();
        setJobs(initialJobs);
        setIsLoaded(true);
    }, []);


    useEffect(() => {
        if (isLoaded) {
            saveCron(jobs);
        }
    }, [jobs, isLoaded]);

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
