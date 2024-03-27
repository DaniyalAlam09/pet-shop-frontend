import React from "react";
import { Link } from "react-router-dom";

export default function Heading({ title, subtitle }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link to="/" className="breadcrumb-item text-dark">
                {title}
              </Link>
              <Link className="breadcrumb-item text-dark">{subtitle}</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
