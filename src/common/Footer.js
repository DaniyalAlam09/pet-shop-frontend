import React from "react";
import { footer, footerTouch, nav, socialIcon } from "../data/Data";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">
              No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
              et dolor sed dolor. Rebum tempor no vero est magna amet no
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
                      <Link className="text-secondary mb-2" href="#" key={item}>
                        <i className="fa fa-angle-right mr-2"></i>
                        {val.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  Newsletter
                </h5>
                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                <form action="">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email Address"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary">Sign Up</button>
                    </div>
                  </div>
                </form>
                <h6 className="text-secondary text-uppercase mt-4 mb-3">
                  Follow Us
                </h6>
                <div className="d-flex">
                  {socialIcon.map((icon, index) => (
                    <a
                      className="btn btn-primary btn-square mr-2"
                      href="#"
                      key={index}
                    >
                      {icon.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row border-top mx-xl-5 py-4"
          style={{ borderColor: "rgba(256, 256, 256, 0.1) !important" }}
        >
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-secondary">
              &copy;{" "}
              <a
                className="text-primary"
                href="https://www.youtube.com/channel/UCOvxBONcR2tHE1ISGPRNNDg"
              >
                Subscribe
              </a>
              . All Rights Reserved. Designed by{" "}
              <a
                className="text-primary"
                href="https://www.youtube.com/channel/UCOvxBONcR2tHE1ISGPRNNDg"
              >
                ShamsKhus
              </a>
            </p>
          </div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="img/payments.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
