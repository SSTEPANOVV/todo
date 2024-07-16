import { ReactEventHandler, useEffect, useState } from "react";

import checkImg from "../assets/check-circle.svg"
import editImg from "../assets/edit-3.svg"
import deleteImgTask from "../assets/trash-2.svg"
import alertImg from "../assets/alert-circle.svg"
import shareImg from "../assets/share-2.svg"
import formatImg from "../assets/format-icon.svg"
import sortImg from "../assets/sort-icon.svg"
import deleteImg from "../assets/trash-1.svg"
import completedImg from "../assets/check-circle-completed.svg"

interface Task {
    id: number,
    title: string,
    description: string,
    completed: boolean
}

export const Layout = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [placeholderTitle, setPlaceholderTitle] = useState<string>("Title");
    const [classErrorTitle, setClassErrorTitle] = useState<string>("");
    const [buttonText, setButtonText] = useState<string>("Add");
    const [taskId, setTaskId] = useState<number>(0);
    const [classCompletedTask, setClassCompletedTask] = useState<string>("");
    const [isSortClicked, setIsSortClicked] = useState<boolean>(false);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const errorTitleHandler = () => {
        setPlaceholderTitle("Title");
        setClassErrorTitle("");
    }

    const editHandler = (id: number) => {
        const storedTasks: string | null = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const selectedTask = tasks.find(task => task.id === id);
            setTaskId(id);
            setTitle(selectedTask!.title);
            setDescription(selectedTask!.description);
            setButtonText("Edit");
        }
    }

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title) {
            setPlaceholderTitle("Please add a title!");
            setClassErrorTitle("error")
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title: title,
            description: description,
            completed: false
        };

        const storedTasks: string | null = localStorage.getItem("tasks");
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setTitle("");
        setDescription("");
        setTasks(tasks);
    }

    const editTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title) {
            setPlaceholderTitle("Please add a title!");
            setClassErrorTitle("error")
            return;
        }

        const storedTasks: string | null = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const selectedTaskIndex = tasks.findIndex(task => task.id === taskId);

            const updatedTask: Task = {
                id: taskId,
                title: title,
                description: description,
                completed: tasks[selectedTaskIndex].completed
            }

            tasks[selectedTaskIndex] = { ...tasks[selectedTaskIndex], ...updatedTask };
            localStorage.setItem("tasks", JSON.stringify(tasks));
            setTitle("");
            setDescription("");
            setButtonText("Add");
            setTasks(tasks);
        }
    }

    const deleteTask = (id: number) => {
        const storedTasks: string | null = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const updatedTasks: Task[] = tasks.filter(task => task.id !== id);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);

            setTitle("");
            setDescription("");
            setButtonText("Add");
        }
    }

    const deleteAllTasks = () => {
        localStorage.setItem("tasks", JSON.stringify([]));
        setTasks([]);
    }

    const completeTask = (id: number) => {
        const storedTasks: string | null = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            const selectedTaskIndex = tasks.findIndex(task => task.id === id);

            const updatedTask: Task = {
                id: id,
                title: tasks[selectedTaskIndex].title,
                description: tasks[selectedTaskIndex].description,
                completed: !tasks[selectedTaskIndex].completed
            };

            updatedTask.completed ? setClassCompletedTask("completed") : setClassCompletedTask("");

            tasks[selectedTaskIndex] = { ...tasks[selectedTaskIndex], ...updatedTask };
            localStorage.setItem("tasks", JSON.stringify(tasks));
            setTasks(tasks);
        }
    }

    const onSortClicked = () => {
        setIsSortClicked((prev) => !prev);
    }

    const sortTask = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLAnchorElement;
        const sortType: string = target.dataset.sort!;
        console.log(sortType);
        
        switch (sortType) {
            case "az":
                tasks.sort((task1, task2) => task1.title.localeCompare(task2.title));
                break;
            case "za":
                tasks.sort((task1, task2) => task2.title.localeCompare(task1.title));
                break;
            case "old-new":
                tasks.sort((task1, task2) => task1.id - task2.id);
                break;
        }

        setIsSortClicked(false);
    }

    return (
        <div className="wrapper">
            <header className="header">
                <h1 className="header__title">My Tasks</h1>
                <form onSubmit={buttonText === "Add" ? addTask : editTask} className="header__form">
                    <input type="text" placeholder={placeholderTitle} value={title} className={`header__titleInput ${classErrorTitle}`} onClick={errorTitleHandler} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button className="header_button">{buttonText}</button>
                </form>
            </header>
            <main className="main">
                {tasks && tasks.map(task => {
                    return (
                        <div className="main_task" key={task.id}>
                            <div className="main_wrapper">
                                <div className="main_info">
                                    <img src={task.completed ? completedImg : checkImg} alt="" className="main_check" onClick={() => completeTask(task.id)} />
                                    <span className={`main_text ${classCompletedTask}`}>{task.title}</span>
                                </div>
                                <div className="main_buttons">
                                    <img src={editImg} alt="" className="main_edit" onClick={() => editHandler(task.id)} />
                                    <img src={deleteImgTask} alt="" className="main_delete" onClick={() => deleteTask(task.id)} />
                                </div>
                            </div>
                            <p className={`main_description ${classCompletedTask}`}>{task.description}</p>
                        </div>
                    )
                })}
            </main>
            <footer className="footer">
                {
                    isSortClicked ?
                        <div className="footer_dropdown">
                            <button className="footer_dropbtn">Select Sort Option</button>
                            <div className="footer_dropdown-content" onClick={sortTask}>
                                <a href="#" data-sort="az">A - Z</a>
                                <a href="#" data-sort="za">Z - A</a>
                                <a href="#" data-sort="old-new">Old - New</a>
                            </div>
                        </div>
                        : ""
                }
                <img src={alertImg} alt="" className="footer_button" />
                <img src={shareImg} alt="" className="footer_button" />
                <img src={formatImg} alt="" className="footer_button" />
                <img src={sortImg} alt="" className="footer_button" onClick={onSortClicked} />
                <img src={deleteImg} alt="" className="footer_button" onClick={deleteAllTasks} />
            </footer>
        </div>
    )
}
