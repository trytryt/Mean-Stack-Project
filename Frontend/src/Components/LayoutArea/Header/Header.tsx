import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
import Routing from "../Routing/Routing";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
        
         
            <AuthMenu/>
        </div>
    );
}

export default Header;
