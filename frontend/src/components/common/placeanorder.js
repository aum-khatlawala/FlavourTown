import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Fuse from "fuse.js";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Placeanorder = (props) => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState("");

  const checkid = {
    _id: localStorage.getItem("id")
  };
  useEffect(() => {
    axios
      .post("http://localhost:4000/buyer/getbuyerdata", checkid)
      .then((response) => {
        setWallet(response.data.wallet);
      })
  }, []);
  const [foods, setFoods] = useState([]);
  const makeanorder = (user) => {
    localStorage.setItem("foodidtbo", user._id);
    navigate("/orderplace")
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setFoods(response.data);
      });
  }, []);

  if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Vendor") {
    window.location.href = "/login";
  }
  else {
    return (
      <div>
        <Grid>
          <h1>Wallet: {wallet} rupees</h1>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="large" fullWidth>
              <TableHead>
                <TableRow>
                  <TableCell> Sr No. </TableCell>
                  <TableCell> Shopkeeper Name </TableCell>
                  <TableCell> Item Name </TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Add Ons</TableCell>
                  <TableCell>Place an Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foods.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{user.shopkeepername}</TableCell>
                    <TableCell>{user.itemname}</TableCell>
                    <TableCell>{user.price}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.addons.map(addon => <ul><li>Name: {addon.addonname}, Price: {addon.addonprice} rupees </li></ul>)}</TableCell>
                    <TableCell>
                      <Button onClick={() => makeanorder(user)}>Place an order</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div >
    );
  }
};

export default Placeanorder;
