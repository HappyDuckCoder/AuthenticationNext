"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
    content: string;
    completed: boolean;
    userID: string;
    _id: string;
}

const SelfTodo = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [content, setContent] = useState<string>("");
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState<string>('');

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/self_todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: session?.user?.id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (session) {
            fetchTasks();
        }
    }, [session]);

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newTask = {
                content: content,
                completed: false,
                userID: session?.user?.id,
            };

            const response = await fetch("/api/self_todo/adding", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({newTask}),
            });

            if (response.ok) {
                setContent("");
                // router.refresh();
                fetchTasks();
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (_id: string) => {
        try {
            const response = await fetch(`/api/self_todo/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id})
            });

            if (response.ok) {
                fetchTasks();
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCompleted = async (_id: string, completed: boolean) => {
        try {
            const response = await fetch("/api/self_todo/completed", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id,
                    completed
                }),
            });

            if (response.ok) {
                fetchTasks();
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = (taskId: string, content: string) => {
        setEditingTaskId(taskId);
        setEditedName(content);
    };

    const handleSave = async (taskId: string, content: string) => {
        try {
            const res = await fetch('/api/self_todo/editing', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: taskId,
                    content: content,
                }),
            });

            if(res.ok){
                setEditingTaskId(null);
                setEditedName('');
                fetchTasks();
            }
        } catch (error) {
            console.error("Error updating task name:", error);
        }
    };

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <div>
                            {
                                editingTaskId === task._id ? (
                                    <div>
                                        <input 
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                        <button onClick={() => handleSave(task._id, editedName)}>save</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>{task.content}</p>
                                        <button onClick={() => handleEdit(task._id, task.content)}>edit</button>
                                    </div>
                                )
                            }
                        </div>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                        {
                            task.completed ? (
                                <button onClick={() => handleCompleted(task._id, task.completed)}>OKKK</button>
                            ) : (
                                <button onClick={() => handleCompleted(task._id, task.completed)}>HEHEHE</button>
                            )
                        }
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Task here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            <div>{session?.user?.id}</div>
        </div>
    );
};

export default SelfTodo;
