import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB(); 

        const { name, email } = await req.json();
        const dataName = await User.findOne({ name });
        const dataEmail = await User.findOne({ email });

        let check = false;

        if(dataName || dataEmail){
            check = true;
        }

        if(check){
            return NextResponse.json({ check }, { status: 409 });
        }

        return NextResponse.json({ check }, { status: 201 });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({ message: "Fail in register" }, { status: 500 });
    }
}
