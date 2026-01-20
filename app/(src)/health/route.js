import { NextResponse } from "next/server";

// Health Check Route
export async function GET() {
    return NextResponse.json(
        {
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
        { status: 200 }
    );
}
