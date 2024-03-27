import React from "react";
import Features from "../../components/Features";
import Product from "../../components/Product";
import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import Offers from "../../components/Offers";
import Vendor from "../../components/Vendor";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <Product />
      <Offers />
      <Vendor />
    </>
  );
}
