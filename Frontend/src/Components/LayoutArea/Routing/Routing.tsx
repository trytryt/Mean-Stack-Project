import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import List from "../../DataArea/List/List";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import ChartVacationContainer from "../../DataArea/ChartVacationContainer/ChartVacationContainer";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
function Routing(): JSX.Element {
    return (
        <div className="Routing">  
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/list" element={<List/>} />
                <Route path="/add-Vacation" element={<AddVacation/>} />
                <Route path="/edit-vacation/:vacationId" element={<EditVacation />} />
                <Route path="/vacations/chart-vacation" element={<ChartVacationContainer />} />       
                <Route path="/" element={<Navigate to="/home" />} />
                 <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
