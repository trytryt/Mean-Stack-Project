
import { useState, useEffect } from "react";
import { Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import UserModel from "../../../Models/UserModel";
import AddVacation from "../AddVacation/AddVacation";
import CheckBox from "../CheckBox/CheckBox";
import { NavLink } from "react-router-dom";
import Pagination from "../pagination-controls/pagination-controls";
import { authStore } from "../../../Redux/AuthState";
import { BarChart } from "@mui/icons-material";
import { toast } from "react-toastify";


function List(): JSX.Element {
    useVerifyLoggedIn();
    const [specificVacation, setSpecificVacation] = useState('');
    const [searchedVacation, setSearchedVacation] = useState<VacationModel | null>(null);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        const userFromStore = authStore.getState().user;
        setUser(userFromStore);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        getData();
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (specificVacation.trim() === '') {
            setSearchedVacation(null);
        } else {
            const filteredVacations = vacations.filter((vacation) =>
                vacation.destination.toLowerCase().includes(specificVacation.toLowerCase())
            );
            setSearchedVacation(filteredVacations.length > 0 ? filteredVacations[0] : null);
        }
    }, [specificVacation, vacations]);

    const getData = async () => {
        try {
            const vacations = await vacationsService.getAllVacations();
            setVacations(vacations);
        } catch (err: any) {
            toast(err.message);
        }
    };

    const handleFetchInProgress = (vacations: VacationModel[]) => {
        setVacations(vacations);
    };

    const handleFetchFuture = (vacations: VacationModel[]) => {
        setVacations(vacations);
    };

    const handleFetchFollowed = (vacations: VacationModel[]) => {
        setVacations(vacations);
    };

    return (
        <div className="List">
            {user && (
                <>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                label="Where..."
                                value={specificVacation}
                                onChange={(event) => setSpecificVacation(event.target.value)}
                                placeholder="Where..."
                            />
                        </Grid>
                    </Grid>

                   

                    <CheckBox
                        inProgress={handleFetchInProgress}
                        future={handleFetchFuture}
                        followed={handleFetchFollowed}
                        userId={user.userId}
                        isAdmin={user.role === 'Admin'}
                    />

                    <div className="admin-actions">
                   

{searchedVacation ? (
                        <div style={{ marginTop: '1rem' }}>
                            <Typography variant="h5"></Typography>
                            <VacationCard vacation={searchedVacation} user={user} getData={getData} />
                        </div>
                    ) : null}
                      
                    </div>

                    <Typography variant="h5" style={{ marginTop: '1rem' }}> </Typography>

                    {vacations.map((vacation) => (
                        <VacationCard key={vacation.vacationId} vacation={vacation} user={user} getData={getData} />
                    ))}

                
                </>
            )}
        </div>
    );
}

export default List;