import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import {
  getCartTotal,
  removeItem,
  updateQuantity,
} from "../../redux/CartSlice";
import Heading from "../../common/Heading";

export default function Cart() {
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

  const emptyCartMsg = (
    <h4 className="container text-center p-4">Your Cart is Empty</h4>
  );

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
              <form className="mb-30" action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Coupon Code"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Apply Coupon</button>
                  </div>
                </div>
              </form>
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
                  <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Proceed To Checkout
                  </button>

                  {/* <StripeCheckout
                    token={onToken}
                    stripeKey={publishableKey}
                    amount={100 * totalAmounts}
                    name="MD"
                    currency="USD"
                    label="Proceed Checkout"
                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
