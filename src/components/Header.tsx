import { useState } from "react"

interface Task {
    id: number,
    title: string,
    description: string
}

export const Header = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title: title,
            description: description
        };

        const storedTasks = localStorage.getItem("tasks");
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTitle("");
        setDescription("");
    }

    return (
        <header className="header">
            <h1 className="header__title">My Tasks</h1>
            <form onSubmit={addTask} className="header__form">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button className="header_button">Add</button>
            </form>
        </header>
    )
}
