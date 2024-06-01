import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getCartTotal, updateQuantity } from "../../redux/CartSlice";
import { toast } from "react-toastify";

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = React.useState(null);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const navigate = useNavigate()

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
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    React.useEffect(() => {
        getProduct();
    }, []);

    const [state, setState] = useState({
        comment: "",
        name: user ? user.firstName + ' ' + user.lastName : '',
        rating: "",
    });
    const [value, setValue] = React.useState(0);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        console.log(state);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("comment", state.comment);
        formData.append("rating", value);
        formData.append("userid", user._id);
        // formData.append("product_sku", state.color);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        axios
            .post(`http://localhost:4000/shops/review/${id}`, formData, config)
            .then((response) => {
                if (response.data.message === "Review added") {
                    navigate(0);
                    console.log(response.data.message);
                    toast.success("Review added");
                } else if (response.data.message === "First Buy this Product") {
                    toast.error("First Buy this Product To Review");
                } else if (response.data.message === "Already Reviewed") {
                    toast.error("Already Reviewed");
                } else if (
                    response.data.message === "You Can't Review your Own Product"
                ) {
                    toast.error("You Can't Review your Own Product");
                }
            })
            .catch((error) => {
                if (error.response.data === "Please Login First") {
                    toast.error("Please Login First");
                } else {
                    toast.error(error.response.data.message);
                }
            });
    };

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
                                        src={product?.product_image ? ('http://localhost:4000/' + product.product_image?.replace('public\\', '').replace(/\\/g, '/')) : "../assets/img/carousel-1.jpg"}
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
                                    </div>
                                    <span class="ms-1">{product.reviews.length} Reviews</span>

                                    <span class="ml-5 text-success ms-2">
                                        {product.product_stoke} In stock
                                    </span>
                                </div>

                                <div class="mb-3">
                                    <span class="h5">${product.discounted_price || product.price}</span>
                                    <span class="text-muted">/per peice</span>
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
                        <div style={{ width: "100%" }} className="">
                            <div className="preview">
                                <h2>Reviews</h2>
                                {(product.reviews?.length > 0) ? product.reviews?.map((product) => (
                                    <div>
                                        <div className="">
                                            <div className="">
                                                <div>
                                                    <p className="mt-3 ml-4 review-name">
                                                        <b >
                                                            {`${product.name}`}
                                                        </b>
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-start">
                                                    <div className="ml">
                                                        <p className="ml-5 comment">{`${product.comment}`}</p>
                                                    </div>
                                                    <div className="">
                                                        {/* <Rating
                                                            className="ml-5"
                                                            size="small"
                                                            readOnly
                                                            value={product.rating}
                                                        /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    'No Reviews yet'
                                )}
                            </div>
                            {/* ENter Reviews */}
                            {user && (

                                <div className="mt-5">
                                    <h3>Enter Your Review</h3>
                                    <form style={{ width: "100%" }} onSubmit={handleSubmit} className="">
                                        <div className="">

                                            <label for="inputZip" className="form-label">
                                                Enter Your Review
                                            </label>
                                            <textarea
                                                name="comment"
                                                type="text"
                                                className="form-control"
                                                rows="3"
                                                onChange={handleChange}
                                                value={state.comment}
                                            ></textarea>
                                            {/* <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      /> */}
                                        </div>

                                        <button
                                            type="submit"
                                            className="buttons btn   btn-primary mt-3"
                                        >
                                            Post
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    "No Product Found"
                )}
            </div>
        </section>
    );
}

export default ProductPage;
