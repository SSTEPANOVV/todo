import { useEffect, useState } from "react"
import checkImg from "../assets/check-circle.svg"
import editImg from "../assets/edit-3.svg"
import deleteImg from "../assets/trash-2.svg"

interface Task {
    id: number,
    title: string,
    description: string
}

export const Body = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    return (
        <main className="main">
            {tasks && tasks.map((task: Task) => {
                return (
                    <div className="main_task" key={task.id}>
                        <div className="main_wrapper">
                            <div className="main_info">
                                <img src={checkImg} alt="" className="main_check" />
                                <span className="main_text">{task.title}</span>
                            </div>
                            <div className="main_buttons">
                                <img src={editImg} alt="" className="main_edit" />
                                <img src={deleteImg} alt="" className="main_delete" />
                            </div>
                        </div>
                        <p className="main_description">{task.description}</p>
                    </div>
                )
            })}
        </main>
    )
}
