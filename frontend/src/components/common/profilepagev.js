import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import React from "react";
const ProfilePageV = (props) => {
    const [details, setDetails] = useState([]);
    const [managername, setManagerName] = useState("");
    const [shopname, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("+91 ");
    const [openingtime, setOpeningTime] = useState("");
    const [closingtime, setClosingTime] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();

        const updateVendor = {
            _id: localStorage.getItem("id"),
            managername: managername,
            shopname: shopname,
            email: email,
            password: password,
            contact: contact,
            date: Date.now(),
            openingtime: openingtime,
            closingtime: closingtime
        };
        axios
            .post("http://localhost:4000/vendor/updateprofile", updateVendor)
            .then((response) => {
                alert("Updated");
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
                alert("Invalid")
            });
        window.location.reload();
    }
    const onChangeManagerName = (event) => {
        setManagerName(event.target.value);
    };
    const onChangeShopName = (event) => {
        setShopName(event.target.value);
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
    const onChangeOpeningTime = (event) => {
        setOpeningTime(event.target.value);
    };
    const onChangeClosingTime = (event) => {
        setClosingTime(event.target.value);
    };
    const checkid = {
        _id: localStorage.getItem("id")
    };
    useEffect(() => {
        axios
            .post("http://localhost:4000/vendor/getvendordata", checkid)
            .then((response) => {
                setDetails(response.data);
                setManagerName(response.data.managername);
                setShopName(response.data.shopname);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setContact(response.data.contact);
                setOpeningTime(response.data.openingtime);
                setClosingTime(response.data.closingtime);
            })
    }, []);
    if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Buyer") {
        window.location.href = "/login";
    }
    return <div>
        <Grid>
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <h4>Manager Name</h4>
                    <TextField
                        label={details.managername}
                        variant="outlined"
                        value={managername}
                        onChange={onChangeManagerName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>Shop Name</h4>
                    <TextField
                        label={details.shopname}
                        variant="outlined"
                        value={shopname}
                        onChange={onChangeShopName}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>Email</h4>
                    <TextField
                        label={details.email}
                        variant="outlined"
                        value={email}
                        onChange={onChangeEmail}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>Password</h4>
                    <TextField
                        label={details.password}
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>Contact</h4>
                    <TextField
                        label={details.contact}
                        variant="outlined"
                        value={contact}
                        onChange={onChangeContact}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>Opening Time</h4>
                    <TextField
                        label={details.openingtime}
                        variant="outlined"
                        value={openingtime}
                        onChange={onChangeOpeningTime}
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4>Closing Time</h4>
                    <TextField
                        label={details.closingtime}
                        variant="outlined"
                        value={closingtime}
                        onChange={onChangeClosingTime}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Update Vendor Details
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </div>
}
    ;

export default ProfilePageV;
