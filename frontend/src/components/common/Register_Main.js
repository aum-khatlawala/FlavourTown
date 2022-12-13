import { useState } from "react";
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
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createBrowserHistory as history } from 'history';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";

const Register_Main = (props) => {
    const [type, setType] = useState("");

    const handleChange = (event) => {
        setType(event.target.value);
    };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState(null);
    const [contact, setContact] = useState("+91 ");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [managername, setManagerName] = useState("");
    const [shopname, setShopName] = useState("");
    const [openingtime, setOpeningTime] = useState("");
    const [closingtime, setClosingTime] = useState("");

    const onChangeUsername = (event) => {
        setName(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onChangeContact = (event) => {
        setContact(event.target.value);
    };
    const onChangeAge = (event) => {
        setAge(event.target.value);
    };
    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };

    const onChangeManagerName = (event) => {
        setManagerName(event.target.value);
    };

    const onChangeShopName = (event) => {
        setShopName(event.target.value);
    };

    const onChangeOpeningTime = (event) => {
        setOpeningTime(event.target.value);
    };

    const onChangeClosingTime = (event) => {
        setClosingTime(event.target.value);
    };

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        setDate(null);
        setContact("+91 ");
        setAge("");
        setBatch("");
        setManagerName("");
        setShopName("");
        setOpeningTime("");
        setClosingTime("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newBuyer = {
            name: name,
            email: email,
            password: password,
            date: Date.now(),
            contact: contact,
            age: age,
            batch: batch
        };
        const newVendor = {
            managername: managername,
            shopname: shopname,
            email: email,
            password: password,
            contact: contact,
            date: Date.now(),
            openingtime: openingtime,
            closingtime: closingtime
        };
        if (type == "Buyer") {
            var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
            if (name === "" || email === "" || contact === "" || password === "" || age === "" || batch === "" || !regex.test(email) || age < 0) {
                if (name === "" || email === "" || contact === "" || password === "" || age === "" || batch === "") {
                    alert("Some value is not filled");
                }
                if (!regex.test(email)) {
                    alert("Incorrect email format");
                }
                if (age < 0) {
                    alert("Age cannot be negative");
                }
            }
            else {
                axios
                    .post("http://localhost:4000/buyer/register", newBuyer)
                    .then((response) => {
                        alert("Created " + response.data.name);
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                        alert("Invalid")
                    });

                resetInputs();
            }
        };
        if (type == "Vendor") {
            var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
            if (managername === "" || email === "" || contact === "" || password === "" || shopname === "" || openingtime === "" || closingtime === "" || !regex.test(email)) {
                if (managername === "" || email === "" || contact === "" || password === "" || shopname === "" || openingtime === "" || closingtime === "") {
                    alert("Some value is not filled");
                }
                if (!regex.test(email)) {
                    alert("Incorrect email format");
                }
            }
            else {
                axios
                    .post("http://localhost:4000/vendor/register", newVendor)
                    .then((response) => {
                        alert("Created " + response.data.managername);
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                        alert("Invalid")
                    });

                resetInputs();
            }
        };
    };

    if (type == "Buyer") {
        return (
            <Grid>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Buyer"}>Buyer Registration</MenuItem>
                        <MenuItem value={"Vendor"}>Vendor Registration</MenuItem>
                    </Select>
                </FormControl>

                <Grid container align={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeUsername}
                        />
                    </Grid>
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
                        <TextField
                            label="Contact"
                            variant="outlined"
                            value={contact}
                            onChange={onChangeContact}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Age"
                            variant="outlined"
                            value={age}
                            onChange={onChangeAge}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={batch}
                                label="Batch"
                                onChange={onChangeBatch}
                            >
                                <MenuItem value="1">UG 1</MenuItem>
                                <MenuItem value="2">UG 2</MenuItem>
                                <MenuItem value="3">UG 3</MenuItem>
                                <MenuItem value="4">UG 4</MenuItem>
                                <MenuItem value="5">UG 5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )

    }
    if (type == "Vendor") {
        return (
            <Grid>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Buyer"}>Buyer Registration</MenuItem>
                        <MenuItem value={"Vendor"}>Vendor Registration</MenuItem>
                    </Select>
                </FormControl>

                <Grid container align={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Manager Name"
                            variant="outlined"
                            value={managername}
                            onChange={onChangeManagerName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Shop Name"
                            variant="outlined"
                            value={shopname}
                            onChange={onChangeShopName}
                        />
                    </Grid>
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
                        <TextField
                            label="Contact"
                            variant="outlined"
                            value={contact}
                            onChange={onChangeContact}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Canteen Opening Time"
                            variant="outlined"
                            value={openingtime}
                            onChange={onChangeOpeningTime}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Canteen Closing Time"
                            variant="outlined"
                            value={closingtime}
                            onChange={onChangeClosingTime}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )

    }
    return (
        <Grid>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value={"Buyer"}>Buyer Registration</MenuItem>
                    <MenuItem value={"Vendor"}>Vendor Registration</MenuItem>
                </Select>
            </FormControl>
        </Grid>);

};

export default Register_Main;
