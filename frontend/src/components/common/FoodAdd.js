import { useState, useEffect } from "react";
import axios from "axios";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import React from "react";

const FoodAdd = (props) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [alignment, setAlignment] = useState("");
    const [itemname, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState(0);
    const [addons, setAddons] = useState([]);
    const [addonname, setAddonName] = useState("");
    const [addonprice, setAddonPrice] = useState("");
    const [currenttag, setCurrentTag] = useState("");
    const [tags, setTags] = useState([]);
    const [veg, setveg] = useState(true);
    const [itemnametbc, setItemNametbc] = useState("");
    const [pricetbe, setPricetbe] = useState("");
    const [ratingtbe, setRatingTbe] = useState("");
    const [addonstbe, setAddonstbe] = useState([]);
    const [addonnametbe, SetAddonNametbe] = useState("");
    const [addonpricetbe, SetAddonPricetbe] = useState("");
    const [tagstbe, setTagstbe] = useState([]);
    const [currenttagtbe, setCurrentTagtbe] = useState("");
    useEffect(() => {
        const emailtbs = {
            shopkeeperemail: localStorage.getItem("vendoremail")
        };
        axios
            .post("http://localhost:4000/food/forcurrentvendor", emailtbs)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const onChangeItemName = (event) => {
        setItemName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const onChangeRating = (event) => {
        setRating(event.target.value);
    };
    const onChangeAddonName = (event) => {
        setAddonName(event.target.value);
    };
    const onChangeAddonPrice = (event) => {
        setAddonPrice(event.target.value);
    };
    const onChangeCurrentTag = (event) => {
        setCurrentTag(event.target.value);
    };
    const onSubmitGoBack = (event) => {
        window.location.reload();
    };
    const onSubmitTag = (event) => {
        setTags(tags.concat(currenttag));
        alert("Added " + currenttag);
        setCurrentTag("");
    };
    const onSubmitAddons = (event) => {
        if (addonprice < 0) {
            alert("Addon price can't be negative")
        }
        if (addonprice === "" || addonname === "") {
            alert("Please enter all addon details")
        }
        else {
            let newaddon = { "addonname": addonname, "addonprice": addonprice };
            setAddons(addons.concat(newaddon));
            alert("Added " + addonname);
            setAddonName("");
            setAddonPrice("");
        }
    };
    const resetInputs = () => {
        setItemName("");
        setPrice("");
        setRating("");
        setAddons([]);
        setAddonName("");
        setAddonPrice("");
        setCurrentTag("");
        setTags([]);
    };
    const redirecttonewpage = (user) => {
        localStorage.setItem("foodid", user._id);
        navigate("/editfooditem");
    };
    const deleteitem = (user) => {
        const deletefoodbyid = {
            _id: user._id
        };
        axios
            .post("http://localhost:4000/food/deletefooditem", deletefoodbyid)
            .then((response) => {
                alert("Deleted Item. Reload to see updated list.");
            })
            .catch(function (error) {
                alert(error)
            });
    }
    const onSubmitAdd = (event) => {
        if (price < 0) {
            alert("Price can't be negative");
        }
        else {
            console.log(addons);
            event.preventDefault();
            const newFood = {
                shopkeeperemail: localStorage.getItem("vendoremail"),
                shopkeepername: localStorage.getItem("vendorshop"),
                itemname: itemname,
                price: price,
                rating: rating,
                vegornonveg: veg,
                addons: addons,
                tags: tags
            };
            if (itemname === "" || price === "" || rating === "") {
                alert("Some compulsary value is not filled");
            }
            else {
                axios
                    .post("http://localhost:4000/food/add", newFood)
                    .then((response) => {
                        alert("Added " + response.data.itemname);
                        console.log(response.data);
                    });

                resetInputs();
            }
        }
    };
    if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Buyer") {
        window.location.href = "/login";
    }
    if (alignment === "Add") {
        return (
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Item Name"
                        variant="outlined"
                        value={itemname}
                        onChange={onChangeItemName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={onChangePrice}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Rating"
                        variant="outlined"
                        value={rating}
                        onChange={onChangeRating}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    {veg ? (
                        <Grid item xs={12}>
                            <Button variant="outlined" onClick={() => setveg(false)}>
                                Veg
                            </Button>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Button variant="outlined" onClick={() => setveg(true)}>
                                Non Veg
                            </Button>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <h4 align={"center"}> Please add One Add On at a time </h4>
                    <TextField
                        label="Add On Name"
                        variant="outlined"
                        value={addonname}
                        onChange={onChangeAddonName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Add On Price"
                        variant="outlined"
                        value={addonprice}
                        onChange={onChangeAddonPrice}
                    />
                </Grid>
                <Grid item xs={12} align={"center"} spacing={2}>
                    <Button variant="contained" onClick={onSubmitAddons}>Add Add On</Button>
                </Grid>
                <Grid item xs={12} align={"center"} spacing={2}>
                    <TextField
                        label="Add Tag"
                        variant="outlined"
                        value={currenttag}
                        onChange={onChangeCurrentTag}
                    />
                </Grid>
                <Grid item xs={12} align={"center"} spacing={2}>
                    <Button variant="contained" onClick={onSubmitTag}>Add Tag</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmitAdd}>
                        Add Food Item
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmitGoBack}>
                        Go Back
                    </Button>
                </Grid>
            </Grid>
        );
    };
    if (alignment === "EditDelete") {
        return (
            <Grid container align={"center"} spacing={0.009}>
                {users.map((user, ind) => (
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">
                            <CardContent variant="outlined">
                                <Typography variant="h6" component="div">
                                    Item Name: {user.itemname}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Price: {user.price} rupees
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Rating: {user.rating}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Tags: {user.tags.map(tag => <p>{tag}</p>)}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Addons (Name and price): {user.addons.map(addon => <ul><li>Name: {addon.addonname}, Price: {addon.addonprice} rupees</li></ul>)}
                                </Typography>
                                <Button variant="contained" onClick={() => redirecttonewpage(user)}>
                                    Update Food Details
                                </Button>
                                <Button variant="contained" onClick={() => deleteitem(user)}>
                                    Delete Item
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                ))
                }
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmitGoBack}>
                        Go Back
                    </Button>
                </Grid>
            </Grid >
        );
    };
    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            fullWidth
        >
            <ToggleButton value={"Add"}>Add</ToggleButton>
            <ToggleButton value={"EditDelete"}>Edit / Delete</ToggleButton>
        </ToggleButtonGroup>
    );
};
export default FoodAdd;
