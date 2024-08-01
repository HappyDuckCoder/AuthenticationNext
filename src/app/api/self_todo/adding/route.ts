import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const { newTask } = await req.json();

        Task.create(newTask)

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to retrieve tasks" }, { status: 500 });
    }
}
