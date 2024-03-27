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
            icon: <i class="fa-brands fa-product-hunt"></i>,
        },
        {
            path: "my-orders",
            name: "Orders",
            icon: <i class="fa-solid fa-basket-shopping-minus"></i>,
        },
        {
            path: "product-upload",
            name: "Upload Product",
            icon: <i class="fa-solid fa-upload"></i>,
        },

        {
            path: "logout",
            name: "Logout",
            icon: <i class="fa-duotone fa-arrow-right-from-bracket"></i>,
        },
    ];
    const handleLogout = () => {

    };
    return (
        <div className="contain">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
                        PET SHOP
                    </h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <i class="fa-sharp fa-regular fa-bars-staggered"></i>
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeclassName="active"
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
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
