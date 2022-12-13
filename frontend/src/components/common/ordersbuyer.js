import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import React from "react";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
const Orders = (props) => {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const emailtbs = {
      buyeremail: localStorage.getItem("buyeremail")
    };
    axios
      .post("http://localhost:4000/order/forcurrentbuyer", emailtbs)
      .then((response) => {
        setUsers(response.data);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onClickmove = (user) => {
    const orderupdate = {
      _id: user._id,
      status: "COMPLETED"
    };
    axios
      .post("http://localhost:4000/order/updateorderstatus", orderupdate)
      .then((response) => {
        alert("Done");
      })
      .catch(function (error) {
        alert("Invalid")
      })
    window.location.reload();
  }
  if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Vendor") {
    window.location.href = "/login";
  }
  return (<Grid container align={"center"} spacing={0.009}>
    {users.map((user, ind) => (
      <Card variant="outlined">
        <CardContent variant="outlined">
          <Typography variant="h6" component="div">
            Vendor Name: {user.shopkeepername}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Time placed: {user.time}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Item Name: {user.itemname}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            quantity: {user.quantity} and {user.price} rupees for each
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Status: {user.status}
          </Typography>
          <Grid item xs={12} align={"center"} spacing={2}>
            {user.status == "READY FOR PICKUP" ? (
              <Button variant="contained" onClick={() => onClickmove(user)}>Picked up</Button>
            ) : (
              <Button variant="contained" disabled >Picked up</Button>
            )}
          </Grid>
        </CardContent>
      </Card>))}</Grid>);
};

export default Orders;
