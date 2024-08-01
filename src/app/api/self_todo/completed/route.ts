import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDB";

export async function PUT(req: NextRequest) {
    try {
        await connectMongoDB();

        const { _id, completed } = await req.json();

        const updatedTask = await Task.findByIdAndUpdate(_id, { completed: !completed }, { new: true });

        if (updatedTask) {
            return NextResponse.json({ status: 200, task: updatedTask });
        } else {
            return NextResponse.json({ status: 404, message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
    }
}
