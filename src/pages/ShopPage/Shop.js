import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { products } from "../../data/Data";
import { Link } from "react-router-dom";
import Heading from "../../common/Heading";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../../redux/CartSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const handleAddToCart = (item) => {
    console.log(item);
    let totalPrice = qty * item.price;
    const tempProduct = {
      ...item,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
  };

  return (
    <>
      <Heading title="Home" subtitle="Shop" />
      <div className="container-fluid">
        <div className="row px-xl-5">
          <Sidebar />

          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <button className="btn btn-sm btn-light">
                      <i className="fa fa-th-large"></i>
                    </button>
                    <button className="btn btn-sm btn-light ml-2">
                      <i className="fa fa-bars"></i>
                    </button>
                  </div>
                  <div className="ml-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Sorting
                      </button>
                    </div>
                    <div className="btn-group ml-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Showing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {products.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={index}>
                  <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                      <img
                        className="img-fluid w-100"
                        src={item.product_img}
                        alt="img"
                      />
                      <div className="product-action">
                        <Link
                          className="btn btn-outline-dark btn-square"
                          onClick={() => handleAddToCart(item)}
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                        <Link className="btn btn-outline-dark btn-square">
                          <i className="far fa-heart"></i>
                        </Link>
                        <Link className="btn btn-outline-dark btn-square">
                          <i className="fa fa-sync-alt"></i>
                        </Link>
                        <Link className="btn btn-outline-dark btn-square">
                          <i className="fa fa-search"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <Link className="h6 text-decoration-none text-truncate">
                        {item.product_name}
                      </Link>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>${item.price}</h5>
                        <h6 className="text-muted ml-2">
                          <del>${item.price}</del>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        {item.star}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
