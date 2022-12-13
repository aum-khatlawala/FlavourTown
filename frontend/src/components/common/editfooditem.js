import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
const EditFoodItem = (props) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [itemname, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState(0);
    const [addons, setAddons] = useState([]);
    const [currenttag, setCurrentTag] = useState("");
    const [tags, setTags] = useState([]);
    const [addonnametba, setAddonNametba] = useState("");
    const [addonpricetba, setAddonPricetba] = useState("");
    const [veg, setveg] = useState(true);

    const onChangeItemName = (event) => {
        setItemName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const onChangeRating = (event) => {
        setRating(event.target.value);
    };
    const onChangeAddonNametba = (event) => {
        setAddonNametba(event.target.value);
    };
    const onChangeAddonPricetba = (event) => {
        setAddonPricetba(event.target.value);
    };
    const onChangeCurrentTag = (event) => {
        setCurrentTag(event.target.value);
    };
    const onSubmitTag = (event) => {
        setTags(tags.concat(currenttag));
        alert("Added " + currenttag);
        setCurrentTag("");
    };
    const onSubmitAddonstba = (event) => {
        let newaddon = { "addonname": addonnametba, "addonprice": addonpricetba };
        setAddons(addons.concat(newaddon));
        alert("Added " + addonnametba);
        setAddonNametba("");
        setAddonPricetba("");
    };
    const onSubmitResetAddons = (event) => {
        setAddons([]);
    };
    const onSubmitResetTags = (event) => {
        setTags([]);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const updateItem = {
            _id: localStorage.getItem("foodid"),
            itemname: itemname,
            price: price,
            rating: rating,
            vegornonveg: veg,
            addons: addons,
            tags: tags
        };
        axios
            .post("http://localhost:4000/food/updatefooditem", updateItem)
            .then((response) => {
                alert("Updated");
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
                alert("Invalid")
            });
        navigate("/foodadd")
    }
    const checkfoodid = {
        _id: localStorage.getItem("foodid")
    };
    useEffect(() => {
        axios
            .post("http://localhost:4000/food/getfooddata", checkfoodid)
            .then((response) => {
                setDetails(response.data);
                setItemName(response.data.itemname);
                setPrice(response.data.price);
                setRating(response.data.rating);
                setAddons(response.data.addons);
                setTags(response.data.tags);
                setveg(response.data.vegornonveg);
            })
    }, []);
    if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Buyer") {
        window.location.href = "/login";
    }
    return <div><Grid>
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <h4>Item Name</h4>
                <TextField
                    label={details.itemname}
                    variant="outlined"
                    value={itemname}
                    onChange={onChangeItemName}
                />
            </Grid>
            <Grid item xs={12}>
                <h4>Price</h4>
                <TextField
                    label={details.price}
                    variant="outlined"
                    value={price}
                    onChange={onChangePrice}
                />
            </Grid>
            <Grid item xs={12}>
                <h4>Rating</h4>
                <TextField
                    label={details.rating}
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
                    value={addonnametba}
                    onChange={onChangeAddonNametba}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Add On Price"
                    variant="outlined"
                    value={addonpricetba}
                    onChange={onChangeAddonPricetba}
                />
            </Grid>
            <Grid item xs={12} align={"center"} spacing={2}>
                <Button variant="contained" onClick={onSubmitAddonstba}>Add Add On</Button>
            </Grid>
            <Grid item xs={12} align={"center"} spacing={2}>
                <Button variant="contained" onClick={onSubmitResetAddons}>Reset Add Ons</Button>
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
            <Grid item xs={12} align={"center"} spacing={2}>
                <Button variant="contained" onClick={onSubmitResetTags}>Reset Tags</Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Update Food Details
                </Button>
            </Grid>
        </Grid>
    </Grid></div>;
};

export default EditFoodItem;
