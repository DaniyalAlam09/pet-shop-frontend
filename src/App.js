import "./css/style.css";
import "./App.css";
import 'reactjs-popup/dist/index.css';

import Header from "./common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart, Home, Shop } from "./pages";
import Footer from "./common/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/contact";
import About from "./pages/About/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./components/Product";
import ProductPage from "./pages/product/product";
import ProductUpload from "./pages/admin/ProductUpload";
import Homex from "./pages/admin/Homex";
import SellerLogin from "./pages/login/SellerLogin";
import Homey from "./pages/User/Homey";
import Profile from "./pages/User/Profile";
import Order from "./pages/User/Order";
import ProductTable from "./pages/admin/ProductTable";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "./redux/CartSlice";
const promise = loadStripe(
  "pk_test_51MO12UBGAZ3oqEpyMdmmANOskndSrDKAKjLGmH0Nz2zG5M8yJyuW2b02hm5XSGbJd6kWPDiUlYUaNIPTPmMSV8WN003P00H5U9"
);

function App() {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        // Dispatching actions inside forEach loop
        dispatch(addToCart({ ...item, price: item.product_price }));
        dispatch(getCartTotal());
      });
    }
  }, [cart]); // Adding 'cart' as a dependency to useEffect

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/cart"
            element={
              <Elements stripe={promise}>
                <Cart />
              </Elements>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="admin" element={<Homex />}>
            <Route path="product-upload" element={<ProductUpload />} />
            <Route path="my-products" element={<ProductTable />} />
            <Route path="edit-product/:id" element={<ProductUpload />} />
            <Route path="my-orders" element={<ProductUpload />} />
          </Route>
          <Route path="user" element={<Homey />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Order />} />
          </Route>

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
