import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    content: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userID: { type: String, required: true }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
