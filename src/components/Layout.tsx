import { useEffect, useState } from "react";

import checkImg from "../assets/check-circle.svg"
import editImg from "../assets/edit-3.svg"
import deleteImgTask from "../assets/trash-2.svg"
import alertImg from "../assets/alert-circle.svg"
import shareImg from "../assets/share-2.svg"
import formatImg from "../assets/format-icon.svg"
import sortImg from "../assets/sort-icon.svg"
import deleteImg from "../assets/trash-1.svg"

interface Task {
    id: number,
    title: string,
    description: string
}

export const Layout = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title: title,
            description: description
        };

        const storedTasks: string | null = localStorage.getItem("tasks");
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTitle("");
        setDescription("");
        setTasks(tasks);
    }

    const deleteTask = (id: number) => {
        const storedTasks: string | null = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const updatedTasks = tasks.filter(task => task.id !== id);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
        }
    }

    const deleteAllTasks = () => {
        localStorage.setItem("tasks", JSON.stringify([]));
        setTasks([]);
    }

    return (
        <div className="wrapper">
            <header className="header">
                <h1 className="header__title">My Tasks</h1>
                <form onSubmit={addTask} className="header__form">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button className="header_button">Add</button>
                </form>
            </header>
            <main className="main">
                {tasks && tasks.map(task => {
                    return (
                        <div className="main_task" key={task.id}>
                            <div className="main_wrapper">
                                <div className="main_info">
                                    <img src={checkImg} alt="" className="main_check" />
                                    <span className="main_text">{task.title}</span>
                                </div>
                                <div className="main_buttons">
                                    <img src={editImg} alt="" className="main_edit" />
                                    <img src={deleteImgTask} alt="" className="main_delete" onClick={() => deleteTask(task.id)} />
                                </div>
                            </div>
                            <p className="main_description">{task.description}</p>
                        </div>
                    )
                })}
            </main>
            <footer className="footer">
                <img src={alertImg} alt="" className="footer_button" />
                <img src={shareImg} alt="" className="footer_button" />
                <img src={formatImg} alt="" className="footer_button" />
                <img src={sortImg} alt="" className="footer_button" />
                <img src={deleteImg} alt="" className="footer_button" onClick={deleteAllTasks} />
            </footer>
        </div>
    )
}
