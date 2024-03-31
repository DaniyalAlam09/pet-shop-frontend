import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import Heading from "../../common/Heading";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../../redux/CartSlice";
import axios from "axios";

export default function Shop() {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (item) => {
    let totalPrice = qty * item.discounted_price || item.price;
    const tempProduct = {
      ...item,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
  };

  const getProducts = () => {
    axios
      .get("http://localhost:4000/shops")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Heading title="Home" subtitle="Shop" />
      <div className="container-fluid">
        <div className="row px-xl-5">
          <Sidebar setProducts={setProducts} />
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form style={{ width: "100%" }} action="">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </form>
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
                  </div>
                </div>
              </div>
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((item, index) => {
                    let newPath = item.product_image
                      ?.replace("public\\", "")
                      .replace(/\\/g, "/");
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-sm-6 pb-1"
                        key={index}
                      >
                        <div className="product-item bg-light mb-4">
                          <div className="product-img position-relative overflow-hidden">
                            <img
                              className="img-fluid w-100"
                              src={
                                item?.product_image
                                  ? "http://localhost:4000/" + newPath
                                  : "../assets/img/carousel-1.jpg"
                              }
                              alt="img"
                            />
                            <div className="product-action">
                              <Link
                                className="btn btn-outline-dark btn-square"
                                onClick={() => handleAddToCart(item)}
                              >
                                <i className="fa fa-shopping-cart"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="text-center py-4">
                            <Link
                              to={`/product/${item._id}`}
                              className="h6 text-decoration-none text-truncate"
                            >
                              {item.product_name}
                            </Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                              {item.discounted_price ? (
                                <>
                                  <h5>${item.discounted_price}</h5>
                                  <h6 className="text-muted ml-2">
                                    <del>${item.product_price}</del>
                                  </h6>
                                </>
                              ) : (
                                <h5>${item.product_price}</h5>
                              )}
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                              {item.star}
                              <small>({item.reviews?.length})</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                "No Product Found"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
