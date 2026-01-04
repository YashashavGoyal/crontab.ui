"use client";

import { useState } from "react";
import CronParser from "cron-parser";
import { X, Check } from "lucide-react";
import { CronJob } from "./CronJobRow";

type AddCronModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (job: { name: string; schedule: string; command: string }) => void;
    initialData?: CronJob | null;
};

export default function AddCronModal({ isOpen, onClose, onSave, initialData }: AddCronModalProps) {

    const [mode, setMode] = useState<"manual" | "raw">(() => {
        if (!initialData) return "manual";
        const parts = initialData.schedule.split(" ");
        return parts.length === 5 ? "manual" : "raw";
    });

    const [name, setName] = useState(initialData?.name || "");
    const [command, setCommand] = useState(initialData?.command || "");
    const [rawSchedule, setRawSchedule] = useState(initialData?.schedule || "* * * * *");
    const [isRawCorrect, setIsRawCorrect] = useState(true);
    const [isManualCorrect, setIsManualCorrect] = useState(true);

    const [minute, setMinute] = useState(() => initialData?.schedule.split(" ")[0] || "*");
    const [hour, setHour] = useState(() => initialData?.schedule.split(" ")[1] || "*");
    const [dom, setDom] = useState(() => initialData?.schedule.split(" ")[2] || "*");
    const [month, setMonth] = useState(() => initialData?.schedule.split(" ")[3] || "*");
    const [dow, setDow] = useState(() => initialData?.schedule.split(" ")[4] || "*");


    const validateRawSchedule = () => {
        try {
            const interval = CronParser.parse(rawSchedule);
            interval.next();
            setIsRawCorrect(true);
        }
        catch {
            setIsRawCorrect(false);
        }
    }

    const validateManualSchedule = (
        m: string,
        h: string,
        d: string,
        mo: string,
        w: string
    ) => {
        try {
            const interval = CronParser.parse(`${m} ${h} ${d} ${mo} ${w}`);
            interval.next();
            setIsManualCorrect(true);
        }
        catch {
            setIsManualCorrect(false);
        }
    }

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const schedule = mode === "raw" ? rawSchedule : `${minute} ${hour} ${dom} ${month} ${dow}`;
        onSave({ name, schedule, command });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    <h2 className="text-lg font-semibold text-slate-200">
                        {initialData ? "Edit Job" : "Create New Job"}
                    </h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Job Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Database Backup"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700"
                        />
                    </div>

                    <div className="p-1 bg-slate-950 rounded-lg border border-slate-800 flex">
                        <button
                            type="button"
                            onClick={() => setMode("manual")}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${mode === "manual" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                                }`}
                        >
                            Form Builder
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("raw")}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${mode === "raw" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                                }`}
                        >
                            Raw Expression
                        </button>
                    </div>

                    {mode === "raw" ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Cron Expression</label>
                            <input
                                type="text"
                                required
                                value={rawSchedule}
                                onChange={(e) => {
                                    setRawSchedule(e.target.value);
                                    validateRawSchedule();
                                }}
                                className={`w-full px-3 py-2 bg-slate-950 border ${isRawCorrect ? "border-slate-800" : "border-red-500"} rounded-lg text-indigo-400 font-mono focus:outline-none focus:${isRawCorrect ? "border-indigo-500" : "border-red-500"} transition-colors`}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 gap-1 sm:gap-2">
                            {[
                                { label: "Minute", val: minute, set: setMinute },
                                { label: "Hour", val: hour, set: setHour },
                                { label: "Day", val: dom, set: setDom },
                                { label: "Month", val: month, set: setMonth },
                                { label: "Week", val: dow, set: setDow },
                            ].map((field) => (
                                <div key={field.label} className="space-y-1">
                                    <label className="text-xs font-medium text-slate-500 block text-center">{field.label}</label>
                                    <input
                                        type="text"
                                        required
                                        className={`w-full text-center px-1 py-2 bg-slate-950 border ${isManualCorrect ? "border-slate-800" : "border-red-500"} rounded-lg text-slate-200 focus:outline-none focus:${isManualCorrect ? "border-indigo-500" : "border-red-500"} transition-colors`}
                                        value={field.val}
                                        onChange={(e) => {
                                            field.set(e.target.value);
                                            validateManualSchedule(
                                                field.label === "Minute" ? e.target.value : minute,
                                                field.label === "Hour" ? e.target.value : hour,
                                                field.label === "Day" ? e.target.value : dom,
                                                field.label === "Month" ? e.target.value : month,
                                                field.label === "Week" ? e.target.value : dow
                                            );;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Command to Execute</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-600 font-mono">$</span>
                            <input
                                type="text"
                                required
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="echo 'hello world' >> /tmp/log.txt"
                                className="w-full pl-6 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={mode === "raw" && !isRawCorrect || mode === "manual" && !isManualCorrect}
                        >
                            <Check className="w-4 h-4" />
                            {initialData ? "Save Changes" : "Create Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
