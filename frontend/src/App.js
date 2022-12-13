import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./components/common/Home";
import Register_Main from "./components/common/Register_Main";
import Navbar from "./components/templates/Navbar";
// import Profile from "./components/users/Profile";
import LogIn from "./components/common/login";
import VendorDashboard from "./components/common/vendordashboard";
import BuyerDashboard from "./components/common/buyerdashboard";
import Navbarvendor from "./components/templates/Navbar2";
import FoodAdd from "./components/common/FoodAdd";
import Navbarbuyer from "./components/templates/Navbar3";
import ProfilePage from "./components/common/profilepage";
import Orders from "./components/common/ordersbuyer";
import Logout from "./components/common/logout";
import ProfilePageV from "./components/common/profilepagev";
import EditFoodItem from "./components/common/editfooditem";
import OrderDashboard from "./components/common/OrderDashboard";
import Placeanorder from "./components/common/placeanorder";
import Statistics from "./components/common/statistics";
import Orderplacingscreen from "./components/common/orderplacingscreen";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layoutvendor = () => {
  return (
    <div>
      <Navbarvendor />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layoutbuyer = () => {
  return (
    <div>
      <Navbarbuyer />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register_Main />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path='/' element={<Layoutvendor />}>
          <Route path="vendordashboard" element={<VendorDashboard />} />
          <Route path="vendorprofilepage" element={<ProfilePageV />} />
          <Route path="foodadd" element={<FoodAdd />} />
          <Route path="login" element={<Logout />} />
          <Route path="editfooditem" element={<EditFoodItem />} />
          <Route path="orderdashboard" element={<OrderDashboard />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
        <Route path='/' element={<Layoutbuyer />}>
          <Route path="buyerdashboard" element={<BuyerDashboard />} />
          <Route path="buyerprofilepage" element={<ProfilePage />} />
          <Route path="placeanorder" element={<Placeanorder />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Logout />} />
          <Route path="orderplace" element={< Orderplacingscreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
