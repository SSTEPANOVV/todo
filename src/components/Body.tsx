import checkImg from "../assets/check-circle.svg"
import editImg from "../assets/edit-3.svg"
import deleteImg from "../assets/trash-2.svg"

export const Body = () => {
    return (
        <main className="main">
            <div className="main_task">
                <div className="main_wrapper">
                    <div className="main_info">
                        <img src={checkImg} alt="" className="main_check" />
                        <span className="main_text">Task #1</span>
                    </div>
                    <div className="main_buttons">
                        <img src={editImg} alt="" className="main_edit" />
                        <img src={deleteImg} alt="" className="main_delete" />
                    </div>
                </div>
                <p className="main_description">Task #1 Description:</p>
            </div>
        </main>
    )
}
