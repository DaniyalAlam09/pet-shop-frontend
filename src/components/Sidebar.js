import React from "react";
import { sidebar } from "../data/Data";

export default function Sidebar() {
  return (
    <>
      <div className="col-lg-3 col-md-4">
        {sidebar.map((val, index) => (
          <div key={index}>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">{val.header}</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-all"
                  />
                  <label className="custom-control-label">{val.all}</label>
                  <span className="badge border font-weight-normal">
                    {val.total_quantity}
                  </span>
                </div>
                {val.subItem.map((val, index) => (
                  <div
                    className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-1"
                    />
                    <label className="custom-control-label">
                      {val.variety}
                    </label>
                    <span className="badge border font-weight-normal">
                      {val.quantity}
                    </span>
                  </div>
                ))}
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
