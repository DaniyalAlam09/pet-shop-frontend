import React, { useState } from "react";
import { Link } from "react-router-dom";
import { category } from "../data/Data";
import { useCatagories } from "../context/catagoriesProvider";

export default function Category() {
  const [show, setShow] = useState(false);
  const { catagories } = useCatagories()

  const [hover, setHover] = useState(false);

  const handleMouseEnter = (catId) => {
    setHover(catId);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <>
      <div className="col-lg-3 d-none d-lg-block">
        <Link
          onClick={() => setShow(!show)}
          className="btn d-flex align-items-center justify-content-between bg-primary w-100"
          style={{ height: "65px", padding: "0 30px" }}
        >
          <h6 className="text-dark m-0">
            <i className="fa fa-bars mr-2"></i>Categories
          </h6>
          <i className="fa fa-angle-down text-dark"></i>
        </Link>
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
            {catagories.slice(0, 10).map((cat, index) => (
              <div key={index}>
                {cat.subCat ? (
                  <div className="nav-item dropdown dropright">
                    <Link
                      className="nav-link dropdown-toggle"
                      onMouseEnter={() => handleMouseEnter(cat.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {cat.name}
                      <i className="fa fa-angle-right float-right mt-1"></i>
                    </Link>
                  </div>
                ) : (
                  <Link className="nav-item nav-link">{cat.name}</Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
