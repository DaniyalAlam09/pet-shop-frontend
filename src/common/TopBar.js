import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nav, topdropdown } from "../data/Data";
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const isAdmin = localStorage.getItem('isAdmin')
  const navigate = useNavigate()
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              {nav.slice(3, 6).map((top, index) => (
                <Link to={top.path} className="text-body mr-3" key={index}>
                  {top.text}
                </Link>
              ))}
              {!user && (
                <>
                  {(!isAdmin || (isAdmin == 'false')) ? (
                    <Link to='/seller-login' className="text-body mr-3" >
                      Seller Login
                    </Link >
                  ) : <Link className="text-body mr-3" to='..//admin/my-products'>
                    Profile
                  </Link>}

                </>
              )}
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            {(!isAdmin || (isAdmin == 'false')) && ((
              <div className="d-inline-flex align-items-center">
                {user ? (
                  <>
                    {/* {topdropdown.map((btn, key) => ( */}
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-light"
                        onClick={() => {
                          navigate('../user/profile')
                        }}
                      >
                        {user.firstName}
                      </button>
                    </div>
                    {/* ))} */}

                  </>
                ) : (
                  <>
                    <Link to='/login' className="text-body mr-3" >
                      Login
                    </Link>
                    <Link to='/register' className="text-body mr-3" >
                      Register
                    </Link>
                  </>
                )}


              </div>
            ))}
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Pet
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            {/* <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form> */}
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">petshop@gmail.com</h5>
          </div>
        </div>
      </div>
    </>
  );
}
