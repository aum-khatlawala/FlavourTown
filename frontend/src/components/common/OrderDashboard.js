import { useState, useEffect } from "react";
import React from "react";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
const OrderDashboard = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const emailtbs = {
            shopkeeperemail: localStorage.getItem("vendoremail")
        };
        axios
            .post("http://localhost:4000/order/forcurrentvendor", emailtbs)
            .then((response) => {
                setUsers(response.data);
                console.log(users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const onClickmove = (user) => {
        let count = 0;
        for (let i = 0; users[i] != undefined; i++)
            if (users[i].status === "ACCEPTED" || users[i].status === "COOKING")
                count++;
        var status = "";
        if (count > 10) {
            alert("You can have at max 10 orders at ACCEPTED and COOKING stage combined")
        }
        else {
            if (user.status === "REJECTED") {
                alert("This order has been rejected by you")
                status = "REJECTED"
            }
            if (user.status === "PLACED" && count < 10) {
                status = "ACCEPTED"
            }
            if (user.status === "ACCEPTED") {
                status = "COOKING"
            }
            if (user.status === "COOKING") {
                status = "READY FOR PICKUP"
            }
            const orderupdate = {
                _id: user._id,
                status: status
            };
            axios
                .post("http://localhost:4000/order/updateorderstatus", orderupdate)
                .then((response) => {
                    alert("Done. Please reload to see the change");
                })
                .catch(function (error) {
                    alert("Invalid / You can have at max 10 orders at ACCEPTED and COOKING stage combined")
                })
        }
        //window.location.reload();
    }
    const onClickReject = (user) => {
        if (user.status === "PLACED") {
            // for (let i = 0; users[])
            const orderupdate = {
                _id: user._id,
                status: "REJECTED"
            };
            let addonscosttba = 0;
            for (let i = 0; i < user.addons.length; i++) {
                addonscosttba = parseInt(addonscosttba) + parseInt(user.addons[i].addonprice);
            };
            alert((user.quantity * user.price) + addonscosttba);
            const updatewallet = {
                buyeremail: user.buyeremail,
                wallet: (user.quantity * user.price) + addonscosttba
            };
            axios
                .post("http://localhost:4000/buyer/addtowallet", updatewallet)
                .then((response) => {
                    alert("Money refunded");
                })
                .catch(function (error) {
                    alert("Invalid!");
                });
            axios
                .post("http://localhost:4000/order/updateorderstatus", orderupdate)
                .then((response) => {
                    alert("Rejected Order");
                })
                .catch(function (error) {
                    alert("Invalid")
                })
            //window.location.reload();
        }
        else {
            alert("Order has already been accepted by you")
        }
    }
    if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Buyer") {
        window.location.href = "/login";
    }
    return (<Grid container align={"center"} spacing={0.009}>
        {users.map((user, ind) => (
            <Card variant="outlined">
                <CardContent variant="outlined">
                    <Typography variant="h6" component="div">
                        {user.buyeremail}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.itemname}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        quantity: {user.quantity} and {user.price} for each
                    </Typography>
                    <Typography>{user.addons.map(addon => <ul><li>Name: {addon.addonname}, Price: {addon.addonprice} rupees</li></ul>)}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.time}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.status}
                    </Typography>
                    <Grid item xs={12} align={"center"} spacing={2}>
                        <Button variant="contained" onClick={() => onClickmove(user)}>Move to next stage</Button>
                    </Grid>
                    <Grid item xs={12} align={"center"} spacing={2}>
                        <Button variant="contained" onClick={() => onClickReject(user)}>Reject Order</Button>
                    </Grid>
                </CardContent>
            </Card>
        ))
        }
    </Grid >);
};

export default OrderDashboard;
