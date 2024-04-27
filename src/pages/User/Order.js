import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const Order = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

    const [order, setOrder] = React.useState([]);
    React.useEffect(function () {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        axios
            .get(`http://localhost:4000/order/order?userid=${user._id}`, user, config)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, []);
    return (
        <div className="text-center ml-3 mt-4" style={{ width: "100%" }}>
            <div class=" container d-flex justify-content-center"></div>

            {order?.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th>Sr #</th> */}
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Order Status</th>
                            <th>Bill</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Object.values(order).map((item, index) => ( */}
                        {order?.map((ord) => {
                            return (
                                <tr>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{ord._id}</td>
                                    <td>
                                        <Link
                                            to={`../../product/${ord.productId}`}
                                            style={{ color: "#0C8AA0" }}
                                        >
                                            <img
                                                src={ord.productImg ? ('http://localhost:4000/' + ord.productImg?.replace('public\\', '').replace(/\\/g, '/')) : "../assets/img/carousel-1.jpg"}
                                                style={{ height: "3em", marginTop: "-5px" }}
                                            />
                                            {ord.productName}{" "}
                                        </Link>
                                    </td>

                                    <td>{ord.status}</td>
                                    <td>{ord.bill}</td>
                                    <td>{moment(ord.date_added).format("MMM Do YY")}</td>
                                </tr>
                            );
                        })}

                        {/* ))} */}
                    </tbody>
                </table>
            )}
            {order?.length === 0 && (
                <div>
                    <div class="container bootstrap snippets bootdey mb-5 mt-5">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="pull-right" style={{ marginTop: "10px" }}>
                                    <div class="row d-flex align-items-center justify-content-around text-center">
                                        <img
                                            // class="img-thumbnail "
                                            style={{ width: "40%" }}
                                            src="/images/No.png"
                                            className="col-md-6"
                                        />
                                        <div className="col-md-6">
                                            <h2>No Order Yet</h2>
                                            {/* <p>Requested page not found!</p> */}
                                            {/* <div class="error-actions">
                        <Link
                          to="/"
                          class="btn btn-primary  signin btn-lg sign-in"
                        >
                          Back Home
                        </Link>
                      </div> */}
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

export default Order;
