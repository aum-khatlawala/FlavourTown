import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

const Navbarvendor = () => {
    const navigate = useNavigate();
    // const data = JSON.parse(localStorage.getItem("access-token"));
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/vendordashboard")}
                    >
                        Vendor Dashboard
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" onClick={() => navigate("/vendorprofilepage")}>
                        Profile Page
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/foodadd")}>
                        Food Menu Dashboard
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/orderdashboard")}>
                        Order Dashboard
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/statistics")}>
                        Statistics
                    </Button>
                    <Button color="error" variant="outline" onClick={() => navigate("/login")}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
};

export default Navbarvendor;

// onClick={() => {this.handleClick({value: "Vendor"})}}
