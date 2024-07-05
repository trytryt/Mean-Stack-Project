import React from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import { CalendarToday, PunchClockSharp, Add, BarChart, Favorite } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Clock from "../Clock/Clock";

interface CheckBoxProps {
    inProgress: (vacations: VacationModel[]) => void;
    future: (vacations: VacationModel[]) => void;
    followed: (vacations: VacationModel[]) => void;
    userId: number;
    isAdmin: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ inProgress, future, followed, userId, isAdmin }) => {
    const navigate = useNavigate();

    const handleGetInProgress = async () => {
        try {
            const vacations = await vacationsService.getVacationsInProgress();
            inProgress(vacations);
        } catch (error) {
            console.error('Failed to get vacations in progress:', error);
        }
    };

    const handleGetFuture = async () => {
        try {
            const vacations = await vacationsService.getFutureVacations();
            future(vacations);
        } catch (error) {
            console.error('Failed to get future vacations:', error);
        }
    };

    const handleGetFollowed = async () => {
        try {
            const vacations = await vacationsService.getFollowedVacations(userId);
            followed(vacations);
        } catch (error) {
            console.error('Failed to get followed vacations:', error);
        }
    };

    const handleAddVacation = () => {
        navigate('/add-vacation'); 
    };

    return (
        <div className="CheckBox">
         
            <Tooltip title="Get Vacations In Progress">
                <Button variant="outlined" color="error" size="small" onClick={handleGetInProgress}>
                    <CalendarToday />
                </Button>
            </Tooltip>
            <Tooltip title="Get Future Vacations">
                <Button variant="outlined" color="error" size="small" onClick={handleGetFuture}>
                    <PunchClockSharp />
                </Button>
            </Tooltip>
            {isAdmin && (
                <>
                    <Tooltip title="Add New Vacation">
                        <IconButton onClick={handleAddVacation}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Vacation Popularity Chart">
                        <IconButton component={NavLink} to="/vacations/chart-vacation">
                            <BarChart />
                        </IconButton>
                    </Tooltip>
                </>
            )}
            {!isAdmin && (
                <Tooltip title="Get Followed Vacations">
                    <Button variant="outlined" color="error" size="small" onClick={handleGetFollowed}>
                        <Favorite />
                    </Button>
                </Tooltip>
            )}
        </div>
    );
};

export default CheckBox;

