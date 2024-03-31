import React, { useState } from "react";
import axios from "axios";
import { sidebar } from "../data/Data";

export default function Sidebar({ setProducts }) {
  const [selectedRadio, setSelectedRadio] = useState(""); // State to hold the selected radio button ID

  // Function to handle radio button change
  const handleRadioChange = (e) => {
    const { id } = e.target;
    setSelectedRadio(id); // Update selected radio button ID
    const price = sidebar[0].subItem.find((item) => item.id == id)
    if (price) {
      let min = price.variety.split('-')[0];
      let max = price.variety.split('-')[1];
      setMinPrice(min);
      setMaxPrice(max);
    }
  };


  const [minPrice, setMinPrice] = useState(""); // State to hold minimum price
  const [maxPrice, setMaxPrice] = useState(""); // State to hold maximum price

  // Function to handle apply button click
  const handleApplyClick = () => {
    // Make API call with Axios
    axios
      .get(
        `http://localhost:4000/shops?price[gte]=${minPrice}&price[lt]=${maxPrice}`
      )
      .then((response) => {
        // Set products with response data
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

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
                {val.subItem.map((item, index) => (
                  <div
                    className="custom-radio d-flex align-items-center justify-content-between mb-3"
                    key={index}
                  >
                    <input
                      type="radio"
                      className=""
                      id={item.id}
                      checked={selectedRadio == item.id}
                      onChange={handleRadioChange}
                    />
                    <label className="">
                      {item.variety}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={handleApplyClick}>
          Apply
        </button>
      </div>
    </>
  );
}
