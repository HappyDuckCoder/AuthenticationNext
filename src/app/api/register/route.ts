import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/connectDB";

export async function POST(req: NextRequest){
    try {
        // console.log('MONGODB_URI:', process.env.MONGODB_URI);

        await connectMongoDB(); 

        const { name, email, password } = await req.json();
        
        console.log(name, email, password);

        const hashPassword = await bcrypt.hash(password, 10);

        const data = new User({
            name: name,
            email: email,
            password: hashPassword,
        })        

        await User.create(data);

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({message: "fail in register"}, {status: 500})
    }
}