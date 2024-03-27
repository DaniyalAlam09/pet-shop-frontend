import React from "react";
import { features } from "../data/Data";

export default function Features() {
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {features.map((val, ky) => (
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div
                className="d-flex align-items-center bg-light mb-4"
                style={{ padding: "30px" }}
              >
                {val.icon}
                <h5 className="font-weight-semi-bold m-0">{val.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
