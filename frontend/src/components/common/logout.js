import axios from "axios";
import { useState, useEffect } from "react";

const Logout = (props) => {
    localStorage.clear();
    window.location.href = "/";
};

export default Logout;