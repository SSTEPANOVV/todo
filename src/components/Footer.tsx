import alertImg from "../assets/alert-circle.svg"
import shareImg from "../assets/share-2.svg"
import formatImg from "../assets/format-icon.svg"
import sortImg from "../assets/sort-icon.svg"
import deleteImg from "../assets/trash-1.svg"

export const Footer = () => {
  return (
    <footer className="footer">
        <img src={alertImg} alt="" className="footer_button"/>
        <img src={shareImg} alt="" className="footer_button"/>
        <img src={formatImg} alt="" className="footer_button"/>
        <img src={sortImg} alt="" className="footer_button"/>
        <img src={deleteImg} alt="" className="footer_button"/>
    </footer>
  )
}
