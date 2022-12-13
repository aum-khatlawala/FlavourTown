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
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';

const BuyerDashboard = (props) => {

    // const [open, setOpen] = useState(false);
    // const [quantity, setQuantity] = useState(0);
    // const [addons, setAddons] = useState([]);
    // const [wallet, setWallet] = useState("");
    // const [wallettbd, incrementwallettbd] = useState(0);
    const [order, setOrder] = useState("ASC");
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [foods, setFoods] = useState([]);
    const [foodsdefault, setFoodsDefault] = useState([]);
    const [tags, setTags] = useState([]);
    const [vegnonveg, setVegorNonVeg] = useState([]);
    const [shopnames, setShopNames] = useState([]);
    const [addons, setAddons] = useState([]);

    const [shopnamechosen, setshopnamechosen] = useState("");
    const [tagchosen, settagchosen] = useState("");
    const [vegchosen, setvegchosen] = useState(false);
    const [nonvegchosen, setnonvegchosen] = useState(false);
    const [min, setmin] = useState("");
    const [max, setmax] = useState("");
    const onchangemin = (event) => {
        setmin(event.target.value);
    };
    const onchangemax = (event) => {
        setmax(event.target.value);
    };

    // const checkid = {
    //     _id: localStorage.getItem("id")
    // };
    // useEffect(() => {
    //     axios
    //         .post("http://localhost:4000/buyer/getbuyerdata", checkid)
    //         .then((response) => {
    //             // setWallet(response.data.wallet);
    //         })
    // }, []);


    // const onChangeQuantity = (event) => {
    //     setQuantity(event.target.value);
    // };
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const [searchText, setSearchText] = useState("");
    // const [foodsdefault, setFoodsDefault] = useState([]);

    // const onChangeSearchText = (event) => {
    //   setSearchText(event.target.value);
    // };
    // const filtered = foodsdefault.filter(food => {
    //   return food.itemname.tolowerCase().includes(searchText.tolowerCase())
    // })
    // setSearchText(searchText);
    // setFoods(filtered);
    // const fuse = new Fuse(users, {
    //   keys: ["itemname"],
    //   includeScore: true
    // });
    // const makeanorder = (user) => {
    //     // alert(quantity);
    //     // alert(wallettbd);
    //     // const checkifenoughbalance = {
    //     //   parseInt
    //     // }
    //     const neworder = {
    //         buyeremail: localStorage.getItem("buyeremail"),
    //         shopkeeperemail: user.shopkeeperemail,
    //         itemname: user.itemname,
    //         price: user.price,
    //         addons: addons,
    //         quantity: quantity,
    //         time: "0900"
    //         // Date.now().getHours() + ":" + Date.now().getMinutes() + ":" + Date.now().getSeconds()
    //     };
    //     axios
    //         .post("http://localhost:4000/order/add", neworder)
    //         .then((response) => {
    //             alert("Placed an order successfully");
    //         })
    //         .catch(function (error) {
    //             alert("Invalid")
    //         });
    //     setOpen(false);
    //     setAddons([]);
    //     setQuantity(0);
    //     // incrementwallettbd(0);
    // };
    // const addaddon = (addon) => {
    //     let newaddon = { "addonname": addon.addonname, "addonprice": addon.addonprice };
    //     setAddons(addons.concat(newaddon));
    //     alert("Added " + addon.addonname);
    //     incrementwallettbd(wallettbd + parseInt(addon.addonprice));
    //     alert(wallettbd);
    // };
    useEffect(() => {
        axios
            .get("http://localhost:4000/food")
            .then((response) => {
                setFoods(response.data);
                setFoodsDefault(response.data);
                let uniquetags = [];
                response.data.forEach((food) => {
                    for (let i = 0; i < food.tags.length; i++) {
                        if (!uniquetags.includes(food.tags[i])) {
                            uniquetags.push(food.tags[i]);
                        }
                    }
                });
                let uniqueshopnames = [];
                response.data.forEach((food) => {
                    if (!uniqueshopnames.includes(food.shopkeepername)) {
                        uniqueshopnames.push(food.shopkeepername);
                    }
                });
                setShopNames(uniqueshopnames);
                setTags(uniquetags);
                // setVegorNonVeg(["Veg", "Non Veg"]);
            });
    }, []);
    const sortChangePrice = () => {
        let usersTemp = foods;
        const flag = sortName;
        usersTemp.sort((a, b) => {
            if (a.price != undefined && b.price != undefined) {
                return (1 - flag * 2) * (a.price - b.price);
            } else {
                return 1;
            }
        });
        setFoods(usersTemp);
        setSortName(!sortName);
    };
    const sortChangeRating = () => {
        let usersTemp = foods;
        const flag = sortName;
        usersTemp.sort((a, b) => {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating);
            } else {
                return 1;
            }
        });
        setFoods(usersTemp);
        setSortName(!sortName);
    };
    useEffect(() => {
        let result = foodsdefault.slice();
        // console.log(result);
        if (min) {
            result = result.filter((item) => item.price >= min);
        }
        if (max) {
            result = result.filter((item) => item.price <= max);
        }
        if (shopnamechosen) {
            result = result.filter((item) => item.shopkeepername === shopnamechosen)
        }
        if (vegchosen === false && nonvegchosen === false) {
            result = result
        }
        if (vegchosen === true && nonvegchosen === false) {
            result = result.filter((item) => item.vegornonveg === true)
        }
        if (vegchosen === false && nonvegchosen === true) {
            result = result.filter((item) => item.vegornonveg === false)
        }
        if (vegchosen === true && nonvegchosen === true) {
            result = result
        }
        if (tagchosen) {
            let tagstbd = [];
            result.forEach((item) => {
                if (item.tags.includes(tagchosen)) {
                    tagstbd.push(item);
                }
            })
            result = tagstbd
        }
        if (searchText) {
            const fuse = new Fuse(result, {
                keys: ["itemname"],
                threshold: 0.4
            });
            let answer = fuse.search(searchText);
            let temp = [];
            answer.forEach((food) => {
                temp.push(food.item);
            });
            console.log(answer);

            // result = temp;
            setFoods(temp);
            //result = temp;
        }
        else {
            setFoods(result);
        }
        console.log(result);
    }, [searchText, shopnamechosen, tagchosen, vegchosen, nonvegchosen, min, max]);

    if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Vendor") {
        window.location.href = "/login";
    }
    else {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <h1>Filters</h1>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <List component="nav" aria-label="mailbox folders">
                            <TextField
                                id="standard-basic"
                                label="Search"
                                fullWidth={true}
                                value={searchText}
                                onChange={(event) => {
                                    setSearchText(event.target.value);
                                }}

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        Price
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="standard-basic"
                                            label="Enter Min"
                                            fullWidth={true}
                                            onChange={onchangemin}
                                            value={min}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="standard-basic"
                                            label="Enter Max"
                                            fullWidth={true}
                                            onChange={onchangemax}
                                            value={max}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={shopnames}
                                    getOptionLabel={(option) => option}
                                    fullWidth
                                    onChange={(_, value) => setshopnamechosen(value)}
                                    value={shopnamechosen}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Shop Names"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={tags}
                                    getOptionLabel={(option) => option}
                                    fullWidth
                                    onChange={(_, value) => settagchosen(value)}
                                    value={tagchosen}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select Tags"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </ListItem>
                            <Divider />
                            {vegchosen ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={() => setvegchosen(false)} />} label="Veg" />
                            ) : (
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={() => setvegchosen(true)} />} label="Veg" />
                            )}
                            {nonvegchosen ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={() => setnonvegchosen(false)} />} label="Non Veg" />
                            ) : (
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={() => setnonvegchosen(true)} />} label="Non Veg" />
                            )}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small" fullWidth>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sr No.</TableCell>
                                        <TableCell>Shopkeeper Name</TableCell>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>
                                            Price
                                            <Button onClick={sortChangePrice}>
                                                {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            Rating
                                            <Button onClick={sortChangeRating}>
                                                {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                            </Button>
                                        </TableCell>
                                        <TableCell>Veg or Non Veg</TableCell>
                                        <TableCell>Add Ons</TableCell>
                                        <TableCell>Tags</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {foods.map((user, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell><h4>{ind + 1}</h4></TableCell>
                                            <TableCell><h4>{user.shopkeepername}</h4></TableCell>
                                            <TableCell><h4>{user.itemname}</h4></TableCell>
                                            <TableCell><h4>{user.price}</h4></TableCell>
                                            <TableCell><h4>{user.rating}</h4></TableCell>
                                            <TableCell>
                                                {user.vegornonveg == true ? (
                                                    <h4>Veg</h4>
                                                ) : (
                                                    <h4>Non Veg</h4>
                                                )}
                                            </TableCell>
                                            <TableCell>{user.addons.map(addon => <ul><li><h4>Name: {addon.addonname}, Price: {addon.addonprice} rupees</h4></li></ul>)}</TableCell>
                                            <TableCell>{user.tags.map(tag => <ul><li><h4>{tag}</h4></li></ul>)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default BuyerDashboard;
