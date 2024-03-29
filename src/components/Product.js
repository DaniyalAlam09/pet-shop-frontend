import React, { useEffect, useState } from "react";
import { products } from "../data/Data";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, getCartTotal } from "../redux/CartSlice";
import axios from "axios";

export default function Product({ productType }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const handleAddToCart = (product) => {
    let totalPrice = qty * product.discounted_price || product.price;
    const tempProduct = {
      ...product,
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
        if (productType === 'featured') {
          setProducts(res.data.products.reverse().slice(0, 8));
        } else if (productType === 'sort') {
          setProducts(res.data.products.sort((a, b) => a.product_price - b.product_price).slice(0, 8));

        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  console.log("d", products[6]?.product_image)
  return (

    <>
      <div className="container-fluid pt-5 pb-3">
        <h4 className="px-xl-5 m-5">{productType === 'featured' ? 'New Arival' : productType === 'sort' && 'Featured Products'}</h4>
        <div className="row px-xl-5">
          {products.map((item, index) => {
            let newPath = item.product_image?.replace('public\\', '').replace(/\\/g, '/');
            return (

              <div div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index} >
                <div className="product-item bg-light mb-4">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fluid w-100"
                      src={item?.product_image ? ('http://localhost:4000/' + newPath) : "../assets/img/carousel-1.jpg"}
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
                    <Link to={`/product/${item._id}`} className="h6 text-decoration-none text-truncate">
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
                      ) :
                        <h5>${item.product_price}</h5>
                      }
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                      {item.stars}
                      <small>({item.reviews?.length})</small>
                    </div>
                  </div>
                </div>
              </div>
            )

          })}
        </div>
      </div >
    </>
  );
}
