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
const ProfilePage = (props) => {
  const [details, setDetails] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("+91 ");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [wallet, setWallet] = useState("");
  const onSubmit = (event) => {
    if (wallet < 0) {
      alert("Please enter a positive amount if you wish to deposit money");
    }
    else {
      event.preventDefault();

      const updateBuyer = {
        _id: localStorage.getItem("id"),
        name: name,
        email: email,
        password: password,
        date: Date.now(),
        contact: contact,
        age: age,
        batch: batch,
        wallet: wallet
      };
      axios
        .post("http://localhost:4000/buyer/updateprofile", updateBuyer)
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
  }
  const onChangeName = (event) => {
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
  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };
  const checkid = {
    _id: localStorage.getItem("id")
  };
  useEffect(() => {
    axios
      .post("http://localhost:4000/buyer/getbuyerdata", checkid)
      .then((response) => {
        setDetails(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setContact(response.data.contact);
        setAge(response.data.age);
        setBatch(response.data.batch);
        setWallet(response.data.wallet);
      })
  }, []);
  if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Vendor") {
    window.location.href = "/login";
  }
  return <div>
    <Grid>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <h4>Name</h4>
          <TextField
            label={details.name}
            variant="outlined"
            value={name}
            onChange={onChangeName}
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
          <h4>Age</h4>
          <TextField
            label={details.age}
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <FormControl fullWidth>
          <h4>Batch</h4>
          <InputLabel id="demo-simple-select-label">Batch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={batch}
            onChange={onChangeBatch}
          >
            <MenuItem value="1">UG 1</MenuItem>
            <MenuItem value="2">UG 2</MenuItem>
            <MenuItem value="3">UG 3</MenuItem>
            <MenuItem value="4">UG 4</MenuItem>
            <MenuItem value="5">UG 5</MenuItem>
          </Select>
        </FormControl>
        <Grid item xs={12}>
          <h4>Deposit Money into your wallet</h4>
          <TextField
            label={details.wallet}
            variant="outlined"
            value={wallet}
            onChange={onChangeWallet}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Update Buyer Details
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </div>
}
  ;

export default ProfilePage;
