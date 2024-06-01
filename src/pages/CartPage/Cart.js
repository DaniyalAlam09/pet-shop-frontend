import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartTotal,
  removeItem,
  updateQuantity,
} from "../../redux/CartSlice";
import Heading from "../../common/Heading";
import Popup from "reactjs-popup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  const elements = useElements();
  const stripe = useStripe();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null
  const [bill, setBill] = React.useState(21);
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    city: "",
  });
  const [load, setLoad] = useState(false)
  const increaseQty = (cartProductId, currentQty) => {
    const newQty = currentQty + 1;
    dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
  };

  const decreaseQty = (cartProductId, currentQty) => {
    const newQty = Math.max(currentQty - 1, 1);
    dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
  };

  const dispatch = useDispatch();
  const {
    data: cartProducts,
    totalAmounts,
    deliveryCharge,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [useSelector((state) => state.cart)]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
  };
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const emptyCartMsg = (
    <h4 className="container text-center p-4">Your Cart is Empty</h4>
  );

  const makeOrder = (id) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    // console.log(userID);
    axios
      .post(
        `http://localhost:4000/order`,
        {
          id,
          user,
          products: cart,
          fname: state.fname,
          lname: state.lname, email: state.email, phoneNo: state.phoneNo, address: state.address, bill: totalAmounts + 10
        },
        config
      )
      .then((user) => {
        window.scrollTo(0, 0);
        window.location.href = '/user/orders';
        localStorage.setItem('cart', [])
        toast.success("Order Placed Successfully");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.response.data.message);
      });
  };

  const confirmPayment = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoad(true);
    if (!stripe || !elements) {
      console.log("!stripe || !elements");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/order/payment/create`,
        { amount: totalAmounts },
        config
      );
      console.log("response", response)
      const clientSecret = response.data.clientSecret;
      console.log(clientSecret);
      if (!clientSecret) {
        toast.error("Failed to retrieve client secret");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              city: state.city,
              line1: state.address,
            },
            name: state.fname + state.lname,
            email: state.email,
            phone: state.phoneNo,
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        toast.error("Payment failed: " + result.error.message);
        setLoad(false);
        return;
      }

      console.log("Payment successful!");
      alert("Payment Received");
      makeOrder(); // You might need to pass an argument here if your makeOrder function requires one
      setLoad(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Error processing payment: " + error.message);
      setLoad(false);
    }
  };


  return (
    <>
      <Heading title="Home" subtitle="Cart" />
      {cartProducts.length === 0 ? (
        emptyCartMsg
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cartProducts.map((cartProduct) => (
                    <tr>
                      <td className="align-middle">
                        <img
                          src={cartProduct?.product_image ? ('http://localhost:4000/' + cartProduct.product_image?.replace('public\\', '').replace(/\\/g, '/')) : "../assets/img/carousel-1.jpg"}
                          alt="img"
                          style={{ width: "50px" }}
                        />{" "}
                        {cartProduct.product_name}
                      </td>
                      <td className="align-middle">{cartProduct.discounted_price}</td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() =>
                                decreaseQty(
                                  cartProduct._id,
                                  cartProduct.quantity
                                )
                              }
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={cartProduct.quantity || 1}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() =>
                                increaseQty(
                                  cartProduct._id,
                                  cartProduct.quantity
                                )
                              }
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{cartProduct.totalPrice}</td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveItem(cartProduct._id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>{totalAmounts}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">{deliveryCharge}</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>{totalAmounts + deliveryCharge}</h5>
                  </div>
                  <button onClick={() => {
                    if (user) {

                      setConfirmationModal(true)
                    } else {
                      toast.error('Please Login first')
                    }
                  }} className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Popup
        className="deleteUserModal"
        open={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
        }}
      >
        <div>
          <form>
            <h3>Confirm Your Order</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="form-outline mb-4">
              <label className="form-label required-label" htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={state.fname}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }} className="form-outline mb-4">
              <label className="form-label required-label" htmlFor="fname">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={state.lname}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="form-outline mb-4">
              <label className="form-label required-label" htmlFor="fname">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="form-outline mb-4">
              <label className="form-label required-label" htmlFor="fname">Phone No:</label>
              <input
                type="number"
                id="phoneNo"
                name="phoneNo"
                value={state.phoneNo}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="form-outline mb-4">
              <label className="form-label required-label" htmlFor="fname">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={state.address}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="form-outline mb-4">
              <label className="form-label required-label" htmlFor="fname">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={state.city}
                onChange={handleInputChange}
              />
            </div>
            <div class="d-block my-3">
              <CardElement style={{ fontSize: "30px" }} />
            </div>
            {/* Add more input fields for other user details */}
            <button
              className="btn btn-block btn-primary"
              onClick={(e) => {
                confirmPayment(e);
              }}
              disabled={!stripe ||
                !elements || load || !state.address || !state.city || !state.fname || !state.lname || !state.email || !state.phoneNo
              }
            >
              Confirm Order
            </button>
          </form>

        </div>
      </Popup>
    </>
  );
}
