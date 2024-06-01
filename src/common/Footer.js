import React from "react";
import { footer, footerTouch, nav, socialIcon } from "../data/Data";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div style={{ display: 'flex', justifyContent: "center" }} className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">
              <b> What we sell: Cat Food</b>, Dog Food, Cat Litter, Litter Boxes & Trays, Leashes, Chains, Dog & Cat Collars, Cat Houses, Carrying Boxes, Jet Boxes, Wet Food, Jellies, Toys for Cats & Dogs
            </p>
            {footerTouch.map((val, index) => (
              <p className="mb-2" key={index}>
                {val.icon}
                {val.contact}
              </p>
            ))}
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              {footer.map((val, index) => (
                <div className="col-md-4 mb-5" key={index}>
                  <h5 className="text-secondary text-uppercase mb-4">
                    {val.header}
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    {nav.map((val, item) => (
                      <Link className="text-secondary mb-2" to={val.path} key={item}>
                        <i className="fa fa-angle-right mr-2"></i>
                        {val.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
