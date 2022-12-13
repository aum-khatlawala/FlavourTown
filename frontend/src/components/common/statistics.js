import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
const Statistics = (props) => {
    const [totalnum, setTotalnum] = useState(0);
    const [pendingorders, setPendingOrders] = useState(0);
    const [completedorders, setCompletedOrders] = useState(0);
    const [toporders, setTopOrders] = useState([]);
    useEffect(() => {
        const emailtbs = {
            shopkeeperemail: localStorage.getItem("vendoremail")
        };
        axios
            .post("http://localhost:4000/order/forcurrentvendor", emailtbs)
            .then((response) => {
                let pendinganswer = 0;
                let completedanswer = 0;
                let toporderarr = [];
                setTotalnum(response.data.length);
                response.data.forEach((order) => {
                    if (order.status === "PLACED" || order.status === "ACCEPTED" || order.status === "COOKING" || order.status === "READY FOR PICKUP") {
                        pendinganswer++;
                    }
                    if (order.status === "COMPLETED") {
                        completedanswer++;
                        if (!toporderarr.filter(e => e.itemname === order.itemname).length > 0) {
                            toporderarr.push({ itemname: order.itemname, quantity: order.quantity })
                            console.log(order.itemname)
                        }
                        else {
                            toporderarr.map(food => {
                                if (food.itemname === order.itemname) {
                                    food.quantity = food.quantity + order.quantity
                                }
                            })
                        }
                    }
                    toporderarr.sort((a, b) => b.quantity - a.quantity)
                });
                setPendingOrders(pendinganswer);
                setCompletedOrders(completedanswer);
                console.log(toporderarr);
                setTopOrders(toporderarr);
                //setTotalnumberoforders(totalnum);
                // alert(totalnum);
            });
    }, []);
    return (<div>
        <h1>
            Top Orders:
            {toporders.map(toporder => <ol>Item Name: {toporder.itemname}, Total quantity ordered: {toporder.quantity}</ol>)}
        </h1>
        <h1>
            Orders placed (Total orders the seller received till that moment (irrespective of being cancelled or completed)): {totalnum}
        </h1>
        <h1>
            Pending orders (Orders which are active (not cancelled) and not delivered): {pendingorders}
        </h1>
        <h1>
            Completed orders (Orders which are delivered/completed successfully): {completedorders}
        </h1>
    </div>)
};

export default Statistics;