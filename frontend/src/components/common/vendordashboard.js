import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";

const VendorDashboard = (props) => {
  const [details, setDetails] = useState([]);
  //var manager;
  //const [email, setEmail] = useState("");
  //const [shopname, setShopName] = useState("");
  //const [openingtime, setOpeningTime] = useState("");
  //const [closingtime, setClosingTime] = useState("");
  const checkid = {
    id: localStorage.getItem("id")
  };
  if (localStorage.getItem("id") === null || localStorage.getItem("type") === "Buyer") {
    window.location.href = "/login";
  }
  else {
    axios
      .get("http://localhost:4000/vendor/getvendordata", checkid)
      .then((response) => {
        setDetails(response.data);
      })
    return <div>
    </div>
  }
};

export default VendorDashboard;