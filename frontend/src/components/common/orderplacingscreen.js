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

const Orderplacingscreen = (props) => {
    const [details, setDetails] = useState([]);
    const [itemname, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState(0);
    const [addonsavailable, setAddonsAvailable] = useState([]);
    const [veg, setveg] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [addons, setAddons] = useState([]);
    const [addonsid, setAddonsId] = useState([]);
    const [wallet, setWallet] = useState("");
    const [wallettbd, incrementwallettbd] = useState(0);
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
    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };
    const addaddon = (addon) => {
        let newaddon = { "addonname": addon.addonname, "addonprice": addon.addonprice };
        if (!addonsid.includes(addon._id)) {
            setAddonsId(addonsid.concat(addon._id));
            setAddons(addons.concat(newaddon));
            alert("Added " + addon.addonname);
            incrementwallettbd(+wallettbd + parseInt(addon.addonprice));
        }
        else {
            alert("Can't add more than one quantity of the same addon");
        }

        // alert(wallettbd);
    };
    const checkfoodid = {
        _id: localStorage.getItem("foodidtbo")
    };
    useEffect(() => {
        axios
            .post("http://localhost:4000/food/getfooddata", checkfoodid)
            .then((response) => {
                setDetails(response.data);
                // setItemName(response.data.itemname);
                // setPrice(response.data.price);
                // setRating(response.data.rating);
                setAddonsAvailable(response.data.addons);
                // setveg(response.data.vegornonveg);
            })
    }, []);
    const makeanorder = (event) => {
        if (quantity === 0) {
            alert("Please select some quantity")
        }
        else {
            if (wallet >= wallettbd + (details.price * quantity)) {
                //wallet = wallet - wallettbd - (parseInt(user.price) * parseInt(quantity));
                // alert(wallet)
                const updatewallet = {
                    buyeremail: localStorage.getItem("buyeremail"),
                    wallet: wallet - wallettbd - (parseInt(details.price) * parseInt(quantity))
                }
                axios
                    .post("http://localhost:4000/buyer/updatewallet", updatewallet)
                    .then((response) => {
                        alert("Wallet has enough money to make the purchase");
                    })
                    .catch(function (error) {
                        alert("Error")
                    });
                var today = new Date();
                const neworder = {
                    buyeremail: localStorage.getItem("buyeremail"),
                    shopkeeperemail: details.shopkeeperemail,
                    shopkeepername: details.shopkeepername,
                    itemname: details.itemname,
                    price: details.price,
                    addons: addons,
                    quantity: quantity,
                    time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                };
                axios
                    .post("http://localhost:4000/order/add", neworder)
                    .then((response) => {
                        alert("Placed an order successfully");
                    })
                    .catch(function (error) {
                        alert("Invalid")
                    });
            }
            else {
                alert("Insufficient money in wallet");
            }
        }
        setAddons([]);
        setAddonsId([]);
        setQuantity(0);

    }
    return <div><Grid>
        <Grid>
          <h1>Wallet: {wallet} rupees</h1>
        </Grid>
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <h4>Item Name: {details.shopkeeperemail}</h4>
            </Grid>
            <Grid item xs={12}>
                <h4>Item Name: {details.shopkeepername}</h4>
            </Grid>
            <Grid item xs={12}>
                <h4>Item Name: {details.itemname}</h4>
            </Grid>
            <Grid item xs={12}>
                <h4>Price: {details.price}</h4>
            </Grid>
            <Grid item xs={12}>
                {details.vegornonveg ? (
                    <Grid item xs={12}>
                        <h4>Veg</h4>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <h4>Non Veg</h4>
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12}>
                <h4>Addons available</h4>
                {addonsavailable.map(addon => <h4>Name: {addon.addonname}, Price: {addon.addonprice} rupees <Button onClick={() => addaddon(addon)}> Add to order </Button></h4>)}
            </Grid>
            <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Batch"
                    onChange={onChangeQuantity}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={makeanorder}>
                    Place an order
                </Button>
            </Grid>
        </Grid>
    </Grid></div>;
};
export default Orderplacingscreen;