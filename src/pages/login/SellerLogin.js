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
            localStorage.setItem('user', null);
            localStorage.setItem('token', null);
            // Reload the page
            window.location.href = '/admin/my-products';
        } else {
            toast.error('Invalid username or password');
        }
    }

    return (
        <div className='container'>
            <section className="">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5  pt-xl-0">
                                <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Log in</h3>
                                    <div className="form-outline mb-4">
                                        <label className="required-label form-label" htmlFor="username">Username</label>
                                        <input type="text" id="username" name="username" className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className=" required-label form-label" htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" className="form-control form-control-lg" />
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/e3/e5/7b/e3e57b55-f723-a6c4-618b-bd895608424d/6e673855-2305-461f-8d55-5349b5e644f8_Simulator_Screen_Shot_-_iPad_Pro__U002812.9-inch_U0029__U00282nd_generation_U0029_-_2020-07-16_at_20.27.57.png/576x768bb.png" alt="Login image" className="w-100 vh-100" style={{ objectFit: "cover", objectPosition: "left" }} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SellerLogin;
