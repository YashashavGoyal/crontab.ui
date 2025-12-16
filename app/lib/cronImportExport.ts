import { CronJob } from "../components/dashboard/CronJobRow";

export const downloadFile = (content: string, filename: string, type: string) => {
    const dataStr = `data:${type};charset=utf-8,` + encodeURIComponent(content);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

export const exportToJSON = (jobs: CronJob[]) => {
    downloadFile(JSON.stringify(jobs, null, 2), "cron_jobs.json", "text/json");
};

export const exportToCrontab = (jobs: CronJob[]) => {
    const textContent = jobs.map(j => {
        const statusComment = j.status !== 'running' ? `# [${j.status.toUpperCase()}] ` : '';
        return `${statusComment}${j.schedule} ${j.command} # ${j.name}`;
    }).join('\n');

    downloadFile(textContent, "crontab.txt", "text/plain");
};

export const parseImportFile = (file: File): Promise<CronJob[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            try {
                // Try parsing as JSON first
                const imported = JSON.parse(content);
                if (Array.isArray(imported)) {
                    resolve(imported);
                    return;
                }
            } catch (err) {
                // Not JSON, try line-by-line text parse
                const lines = content.split('\n');
                const newJobs: CronJob[] = [];

                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (!trimmed) return;

                    // Check for status comment prefix from our export
                    let status: CronJob['status'] = 'stopped';
                    let textToParse = trimmed;

                    const statusMatch = trimmed.match(/^# \[(RUNNING|PAUSED|STOPPED)\]\s+(.*)/i);
                    if (statusMatch) {
                        status = statusMatch[1].toLowerCase() as CronJob['status'];
                        textToParse = statusMatch[2];
                    } else if (trimmed.startsWith('#')) {
                        // Skip other comments
                        return;
                    }

                    // Parse name from end comment
                    let name = 'Imported Job';
                    const nameMatch = textToParse.match(/^(.*)\s+#\s+(.*)$/);
                    if (nameMatch) {
                        textToParse = nameMatch[1].trim();
                        name = nameMatch[2].trim();
                    }

                    // Split schedule and command
                    const parts = textToParse.split(/\s+/);
                    if (parts.length >= 6) {
                        const schedule = parts.slice(0, 5).join(' ');
                        const command = parts.slice(5).join(' ');

                        newJobs.push({
                            id: Math.random().toString(36).substr(2, 9),
                            name,
                            schedule,
                            command,
                            status
                        });
                    }
                });

                if (newJobs.length > 0) {
                    resolve(newJobs);
                } else {
                    reject(new Error("Could not parse any valid cron jobs from this file."));
                }
            }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
    });
};
