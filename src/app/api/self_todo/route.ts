import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const { userID } = await req.json();

        const tasks = await Task.find({ userID }); 

        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to retrieve tasks" }, { status: 500 });
    }
}
