import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const menuItem = [
        {
            path: "my-products",
            name: "My Products",
            icon: <i className="fa-brands fa-product-hunt"></i>,
        },
        {
            path: "my-orders",
            name: "Orders",
            icon: <i className="fa-solid fa-basket-shopping-minus"></i>,
        },
        {
            path: "product-upload",
            name: "Upload Product",
            icon: <i className="fa-solid fa-upload"></i>,
        },
        {
            path: "logout",
            name: "Logout",
            icon: <i className="fa-duotone fa-arrow-right-from-bracket"></i>,
        },
    ];

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Redirect to home page
        window.location.replace('/')
    };

    return (
        <div className="contain">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
                        PET SHOP
                    </h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <i className="fa-sharp fa-regular fa-bars-staggered"></i>
                    </div>
                </div>
                {menuItem.slice(0, menuItem.length - 1).map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeClassName="active"
                    >
                        <div className="icon">{item.icon}</div>
                        <div
                            style={{ display: isOpen ? "block" : "none" }}
                            className="link_text"
                        >
                            {item.name}
                        </div>
                    </NavLink>
                ))}
                <div onClick={handleLogout} className="link">
                    <div className="icon">{menuItem[3].icon}</div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                        {menuItem[3].name}
                    </div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
