import React, { useState } from "react";
import axios from "axios";
import { sidebar } from "../data/Data";
import { useCatagories } from "../context/catagoriesProvider";

export default function Sidebar({ setProducts, category }) {
  const [selectedRadio, setSelectedRadio] = useState(""); // State to hold the selected radio button ID
  const [selectedCatagorey, setSelectedCatagorey] = useState(category ? category : "All"); // State to hold the selected radio button ID
  const { catagories } = useCatagories();

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
  const handleSelectedCatagoreyChange = (e, item) => {
    setSelectedCatagorey(item.slug);
  };


  const [minPrice, setMinPrice] = useState(0); // State to hold minimum price
  const [maxPrice, setMaxPrice] = useState(10000000); // State to hold maximum price

  // Function to handle apply button click
  const handleApplyClick = () => {
    // Make API call with Axios
    axios
      .get(
        `http://localhost:4000/shops?price[gte]=${minPrice}&price[lt]=${maxPrice}&&category=${selectedCatagorey}`
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
        <div className="bg-light p-4 mb-30">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Filter by Catagorey</span>
          </h5>
          <form>
            {catagories.map((item) => (
              <div className="custom-radio d-flex align-items-center justify-content-between mb-3" key={item.id}>
                <input
                  type="radio"
                  className=""
                  id={item.id}
                  checked={selectedCatagorey == item.slug}
                  onChange={(e) => handleSelectedCatagoreyChange(e, item)}
                />
                <label className="">
                  {item.name}
                </label>
              </div>
            ))}
          </form>
        </div>
        <button className="btn btn-primary" onClick={handleApplyClick}>
          Apply
        </button>
      </div>
    </>
  );
}
