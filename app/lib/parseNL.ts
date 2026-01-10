
// Parses natural language input - Mimics cron expression
// (e.g. "every 5 minutes") into a cron expression
// Uses regex to match patterns and convert them to cron expressions
export default function parseNaturalLanguage(input: string): string | null {
    const text = input.toLowerCase().trim();

    if (/every minute/.test(text)) return "* * * * *";

    const everyMin = text.match(/every (\d+) minutes?/);
    if (everyMin) return `*/${everyMin[1]} * * * *`;

    if (/every hour/.test(text)) return "0 * * * *";

    const everyhour = text.match(/every (\d+) hours?/);
    if (everyhour) return `0 */${everyhour[1]} * * *`;

    if (/midnight/.test(text)) return "0 0 * * *";

    const weekly = text.match(
        /every (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/
    );
    if (weekly) {
        const days: Record<string, number> = {
            sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
            thursday: 4, friday: 5, saturday: 6,
        };
        return `0 0 * * ${days[weekly[1]]}`;
    }
    return null;
}