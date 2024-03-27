import React from "react";
import { category } from "../data/Data";
import { useCatagories } from "../context/catagoriesProvider";

export default function Categories() {
  const { catagories } = useCatagories()

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {catagories.map((item, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
              <a className="text-decoration-none" href="">
                <div className="cat-item d-flex align-items-center mb-4">
                  <div
                    className="overflow-hidden"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img style={{ height: "100%", objectFit: "cover" }} className="img-fluid" src={`http://localhost:4000${item.imageUrl}`} alt="img" />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{item.name}</h6>
                    {/* <small className="text-body">{item.quantity}</small> */}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
