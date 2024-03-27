import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, getCartTotal, updateQuantity } from "../../redux/CartSlice";
import { toast } from "react-toastify";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = React.useState(null);

    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const handleAddToCart = (product) => {
        let totalPrice = qty * product.discounted_price || product.price;
        const tempProduct = {
            ...product,
            quantity: qty,
            totalPrice,
        };
        dispatch(addToCart(tempProduct));
        dispatch(getCartTotal());
        toast.success("Item added to cart")
    };

    const getProduct = () => {
        axios
            .get(`http://localhost:4000/shops/${id}`)
            .then((res) => {
                console.log("id", res);
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    React.useEffect(() => {
        getProduct();
    }, []);

    return (
        <section class="py-5">
            <div class="container">
                {product ? (
                    <div class="row gx-5">
                        <aside class="col-lg-6">
                            <div class="border rounded-4 mb-3 d-flex justify-content-center">
                                <a
                                    data-fslightbox="mygalley"
                                    class="rounded-4"
                                    target="_blank"
                                    data-type="image"
                                    href="https://wallpapercave.com/wp/wp8240864.jpg"
                                >
                                    <img
                                        style={{
                                            maxWidth: "100% ",
                                            maxHeight: "100vh",
                                            margin: "auto",
                                        }}
                                        class="rounded-4 fit"
                                        src="https://wallpapercave.com/wp/wp8240864.jpg"
                                    />
                                </a>
                            </div>
                        </aside>
                        <main class="col-lg-6">
                            <div class="ps-lg-3">
                                <h4 class="title text-dark">{product.product_name}</h4>
                                <div class="d-flex flex-row my-3">
                                    <div class="text-warning mb-1 me-2">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                        <span class="ms-1">{product.reviews.length / 5}</span>
                                    </div>

                                    <span class="ml-5 text-success ms-2">
                                        {product.product_stoke} In stock
                                    </span>
                                </div>

                                <div class="mb-3">
                                    <span class="h5">$75.00</span>
                                    <span class="text-muted">/per box</span>
                                </div>

                                <p>{product.product_description}</p>

                                <div class="row">
                                    <dt class="col-3">Type:</dt>
                                    <dd class="col-9">{product.category}</dd>
                                </div>

                                <hr />

                                <div class="row mb-4">
                                    <div class="col-md-4 col-6 mb-3">
                                        <label class="mb-2 d-block">Quantity</label>
                                        <div class="input-group mb-3" style={{ width: "170px" }}>
                                            <button
                                                class="btn btn-white border border-secondary px-3"
                                                type="button"
                                                id="button-addon1"
                                                disabled={qty === 1}
                                                data-mdb-ripple-color="dark"
                                                onClick={() =>
                                                    setQty(pre => pre - 1)
                                                }
                                            >
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="text"
                                                class="form-control text-center border border-secondary"
                                                placeholder="14"
                                                aria-label="Example text with button addon"
                                                aria-describedby="button-addon1"
                                                value={qty || 1}
                                            />
                                            <button
                                                class="btn btn-white border border-secondary px-3"
                                                type="button"
                                                id="button-addon2"
                                                data-mdb-ripple-color="dark"
                                                onClick={() =>
                                                    setQty(pre => pre + 1)
                                                }
                                            >
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    class="btn btn-primary shadow-0"
                                >
                                    {" "}
                                    <i class="me-1 fa fa-shopping-basket"></i> Add to cart{" "}
                                </button>
                            </div>
                        </main>
                    </div>
                ) : (
                    "No Product Found"
                )}
            </div>
        </section>
    );
}

export default ProductPage;
