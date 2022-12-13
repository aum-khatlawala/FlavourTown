import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const Profile = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/buyer") // unimplemented
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div></div>;
};

export default Profile;
