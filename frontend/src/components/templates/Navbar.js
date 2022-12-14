import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

const Navbar = () => {
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
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

// onClick={() => {this.handleClick({value: "Vendor"})}}
