import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCatagories } from "../context/catagoriesProvider";

export default function Category() {
  const [show, setShow] = useState(false);
  const { catagories } = useCatagories();
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  const handleMouseEnter = (catId) => {
    setHover(catId);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const handleNavigate = (cat) => {
    navigate(`/shop?category=${cat.slug}`);
    setShow(false);
  };

  return (
    <>
      <div className="col-lg-3 d-none d-lg-block">
        <div
          onClick={() => setShow(!show)}
          className="btn d-flex align-items-center justify-content-between bg-primary w-100"
          style={{ height: "65px", padding: "0 30px", cursor: "pointer" }}
        >
          <h6 className="text-dark m-0">
            <i className="fa fa-bars mr-2"></i>Categories
          </h6>
          <i className="fa fa-angle-down text-dark"></i>
        </div>
        <nav
          className={
            show
              ? "show position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              : "collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
          }
          id="navbar-vertical"
          style={{ width: "calc(100% - 30px)", zIndex: "999" }}
        >
          <div className="navbar-nav w-100">
            {catagories.map((cat, index) => (
              <div key={index}>
                <div className="nav-item dropdown dropright">
                  <div
                    className="nav-link dropdown-toggle"
                    onClick={() => handleNavigate(cat)}
                    style={{ cursor: "pointer" }}
                  >
                    {cat.name}
                    <i className="fa fa-angle-right float-right mt-1"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
