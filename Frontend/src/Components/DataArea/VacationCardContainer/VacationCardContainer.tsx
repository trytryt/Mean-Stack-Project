// import "./VacationCardContainer.css";

import { Box, Grid } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";

const VacationCardsContainer: React.FC<{ vacations: VacationModel[]; user: UserModel; getData: Function }> = ({
    vacations,
    user,
    getData,
}) => {
    return (
        <Box sx={{ overflowY: 'auto', maxHeight: '30vh', padding: 2 }}>
            <Grid container direction="column" spacing={2}>
                {vacations.map((vacation) => (
                    <Grid item key={vacation.vacationId}>
                        <VacationCard vacation={vacation} user={user} getData={getData} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default VacationCardsContainer;