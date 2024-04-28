import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [city, setCity] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/users/register",
                { email, password, firstName, lastName, address, phoneNo, city }
            );
            toast.success("Registration successful");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem('isAdmin', false);
            window.location.replace('../user/profile')
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Registration failed:", error.response.data);
        }
    };

    return (
        <section className="">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://wallpapercave.com/wp/wp8240864.jpg"
                                        alt="Register form"
                                        className="img-fluid"
                                        style={{
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "1rem 0 0 1rem",
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleRegister();
                                            }}
                                        >
                                            <h5
                                                className="fw-normal mb-3 pb-3"
                                                style={{ letterSpacing: "1px" }}
                                            >
                                                Register yourself
                                            </h5>

                                            <div className="form-outline mb-4">
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    id="email"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="email">
                                                    Email address
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password"
                                                    id="password"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="password">
                                                    Password
                                                </label>
                                            </div>

                                            {/* Additional Fields */}

                                            <div className="form-outline mb-4">
                                                <input
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    type="text"
                                                    id="firstName"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="firstName">
                                                    First Name
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    type="text"
                                                    id="lastName"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="firstName">
                                                    Last Name
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    type="text"
                                                    id="address"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="firstName">
                                                    Address
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    value={phoneNo}
                                                    onChange={(e) => setPhoneNo(e.target.value)}
                                                    type="text"
                                                    id="phoneNo"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" htmlFor="firstName">
                                                    Phone no
                                                </label>
                                            </div>

                                            {/* Repeat the above pattern for the other fields */}

                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <p
                                                className="mb-5 pb-lg-2"
                                                s
                                                style={{ color: "#393f81" }}
                                            >
                                                Have an account?{" "}
                                                <Link to="/login" style={{ color: "#393f81" }}>
                                                    Sign in here
                                                </Link>
                                            </p>
                                            <a href="#!" className="small text-muted">
                                                Terms of use.
                                            </a>
                                            <a href="#!" className="small text-muted">
                                                Privacy policy
                                            </a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
