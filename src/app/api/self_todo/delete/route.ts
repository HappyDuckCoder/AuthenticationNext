import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDB";

export async function DELETE(req: NextRequest) {
    try {
        await connectMongoDB();

        const { _id } = await req.json();

        const result = await Task.findByIdAndDelete(_id);

        if (result) {
            return NextResponse.json({ status: 200, message: "Task deleted successfully" });
        } else {
            return NextResponse.json({ status: 404, message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
    }
}
