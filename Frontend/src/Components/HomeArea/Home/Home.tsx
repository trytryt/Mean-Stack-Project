import React from 'react';
import "./Home.css";
import Clock from '../../DataArea/Clock/Clock';
import { Box, Typography, IconButton } from '@mui/material';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useNavigate } from 'react-router-dom';


function Home(): JSX.Element {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/list');
    };

    return (
        <Box className="Home" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f0f0f0">
            <Clock />
            <Box display="flex" alignItems="center" mt={4}>
                <Typography variant="h4" component="div" color="primary" gutterBottom>
                    Winter Vacation
                </Typography>
                <IconButton onClick={handleClick} color="primary" aria-label="go to our vacations">
                    <BeachAccessIcon fontSize="large" className="icon-button-hover"/>
                </IconButton>
            </Box>
            <Typography variant="body1" color="textSecondary" mt={2}>
                Plan your perfect winter getaway with us.
             <br></br>    Discover amazing vacation spots and enjoy the best winter has to offer!
            </Typography>
        </Box>
    );
}

export default Home;
