export const Header = () => {
  return (
    <header className="header">
        <h1 className="header__title">My Tasks</h1>
        <form action="" className="header__form">
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Description"/>
            <button className="header_button">Add</button>
        </form>
    </header>
  )
}
