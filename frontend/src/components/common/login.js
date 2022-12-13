import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from "react-router-dom";
import React from "react";
const LogIn = (props) => {
    localStorage.clear();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logindone, setLoginType] = useState("");
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onSubmit = (event) => {
        event.preventDefault();

        if (email === "" || password === "") {
            alert("Some value is not filled")
        }
        else {
            const checklogin = {
                email: email,
                password: password
            };
            axios
                .post("http://localhost:4000/buyer/login", checklogin)
                .then((response) => {
                    // console.log(response);
                    if (response.data.typeofuser === "Vendor") {
                        setLoginType("Vendor");
                        alert("Vendor");
                        // console.log(response.data._id);
                        localStorage.setItem("id", response.data._id);
                        localStorage.setItem("type", response.data.typeofuser);
                        localStorage.setItem("vendoremail", response.data.email);
                        localStorage.setItem("vendorshop", response.data.shopname);
                        navigate("/vendordashboard");
                    }
                    else if (response.data.typeofuser === "Buyer") {
                        setLoginType("Buyer");
                        alert("Buyer");
                        localStorage.setItem("id", response.data._id);
                        localStorage.setItem("type", response.data.typeofuser);
                        localStorage.setItem("buyeremail", response.data.email);
                        navigate("/buyerdashboard");
                    }
                    else {
                        alert("xD");
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    alert("Invalid")
                });
        }
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Log In
                </Button>
            </Grid>
        </Grid>
    );
};

export default LogIn;
