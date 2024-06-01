import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:4000/users/login", {
                email,
                password,
            });
            // Handle successful login, such as storing the token in local storage
            toast.success("Login successful");
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            localStorage.setItem('isAdmin', false);
            window.location.replace('../user/profile')
        } catch (error) {
            // Handle login error, such as displaying an error message
            toast.error(error.response.data.message);
            console.error("Login failed:", error.response.data);
        }
    };

    return (
        <section className="">
            <div className="container py-5 ">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww"
                                        alt="login form"
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
                                                handleLogin();
                                            }}
                                        >
                                            <h5
                                                className="fw-normal mb-3 pb-3"
                                                style={{ letterSpacing: "1px" }}
                                            >
                                                Sign into your account
                                            </h5>

                                            <div className="form-outline mb-4">
                                                <label className="form-label required-label" htmlFor="form2Example17">
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="form2Example17"
                                                    className="form-control form-control-lg"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="required-label form-label" htmlFor="form2Example27">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="form2Example27"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button
                                                    disabled={!email && !password}
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                Don't have an account?{" "}
                                                <Link to="/register" style={{ color: "#393f81" }}>
                                                    Register here
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

export default Login;
