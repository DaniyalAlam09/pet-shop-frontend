import React from 'react';
import { toast } from 'react-toastify';

function SellerLogin() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        // Check if username and password are admin
        if (username === 'admin' && password === 'admin') {
            // Set admin flag in localStorage
            localStorage.setItem('isAdmin', true);
            // Reload the page
            window.location.href = '/admin/product-upload';
        } else {
            toast.error('Invalid username or password');
        }
    }

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5  pt-xl-0">
                                <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Log in</h3>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="username" name="username" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="password" name="password" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" alt="Login image" className="w-100 vh-100" style={{ objectFit: "cover", objectPosition: "left" }} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SellerLogin;
