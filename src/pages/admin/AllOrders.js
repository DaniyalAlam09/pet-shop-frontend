import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);
    const [orderStates, setOrderStates] = useState({});

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        setOrderStates((prevStates) => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                [name]: value,
            },
        }));
    };

    useEffect(() => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        axios
            .get("http://localhost:4000/order/allorders", config)
            .then((res) => {
                setOrders(res.data);
                const initialOrderStates = res.data.reduce((acc, order) => {
                    acc[order._id] = {
                        status: order.status,
                        tracking: "",
                    };
                    return acc;
                }, {});
                setOrderStates(initialOrderStates);
                userDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const userDetails = (orders) => {
        orders.forEach((order) => {
            axios
                .get(`http://localhost:4000/users/${order.userId}`)
                .then((res) => {
                    setUser((prevUser) => [...prevUser, res.data]);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        });
    };

    const updateOrder = (id) => {
        const formData = new FormData();
        formData.append("status", orderStates[id].status);
        formData.append("tracking", orderStates[id].tracking);

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        axios
            .put(`http://localhost:4000/order/update/${id}`, formData, config)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Status Updated");
                } else {
                    toast.error("Something went wrong");
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="text-center ml-3 mt-4" style={{ width: "100%" }}>
            <div className="container d-flex justify-content-center"></div>
            {orders.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr #</th>
                            <th>Order Number</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Bill</th>
                            <th>User Name</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody className="mt-3">
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order._id}</td>
                                <td>{moment(order.date_added).format("MMM Do YY")}</td>
                                <td>
                                    <Link
                                        to={`../../product/${order.productId}`}
                                        style={{ color: "#0C8AA0" }}
                                    >
                                        {order.productName}
                                    </Link>
                                </td>
                                <td>
                                    <img
                                        src={
                                            order.productImg
                                                ? `http://localhost:4000/${order.productImg.replace('public\\', '').replace(/\\/g, '/')}`
                                                : "../assets/img/carousel-1.jpg"
                                        }
                                        style={{ height: "5em", marginTop: "-5px" }}
                                    />
                                </td>
                                <td>{order.bill}</td>
                                <td>
                                    {order.fname} {order.lname}
                                </td>
                                <td width={20}>{order.address}</td>
                                <td>
                                    <select
                                        onChange={(e) => handleChange(e, order._id)}
                                        name="status"
                                        className="form-select"
                                        value={orderStates[order._id]?.status || ""}
                                    >
                                        <option value="Accept">Accept</option>
                                        <option value="Reject">Reject</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() => updateOrder(order._id)}
                                        className="buttons btn text-white btn-block btn-primary"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <div className="container bootstrap snippets bootdey mb-5 mt-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pull-right" style={{ marginTop: "10px" }}>
                                    <div className="d-flex align-items-center justify-content-around text-center">
                                        <img
                                            style={{ width: "40%" }}
                                            src="/images/No.png"
                                        />
                                        <div>
                                            <h2>No Order Yet</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
