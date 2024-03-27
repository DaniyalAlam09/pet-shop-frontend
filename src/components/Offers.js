import React from "react";
import { banner } from "../data/Data";

export default function Offers() {
  return (
    <>
      <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
          {banner.map((offer, index) => (
            <div className="col-md-6" key={index}>
              <div className="product-offer mb-30" style={{ height: "300px" }}>
                <img className="img-fluid" src={offer.img} alt="img" />
                <div className="offer-text">
                  <h6 className="text-white text-uppercase">
                    {offer.discount}
                  </h6>
                  <h3 className="text-white mb-3">{offer.title}</h3>
                  <a href="" className="btn btn-primary">
                    {offer.btn}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
