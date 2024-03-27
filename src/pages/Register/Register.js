import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLRegister = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/users/register",
                { email, password }
            );
            // Handle successful login, such as storing the token in local storage
            console.log("Login successful:", response.data);
        } catch (error) {
            // Handle login error, such as displaying an error message
            toast.error(error.response.data.message);
            console.error("Login failed:", error.response.data);
        }
    };
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
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
                                                handleLRegister();
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
                                                    id="form2Example17"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" for="form2Example17">
                                                    Email address
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password"
                                                    id="form2Example27"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label" for="form2Example27">
                                                    Password
                                                </label>
                                            </div>

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
                                                Have account?{" "}
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
