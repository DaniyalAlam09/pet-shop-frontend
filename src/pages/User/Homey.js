import React from "react";
import { Outlet } from "react-router-dom";
import SideBarCusomer from "../../components/SideBarCusomer";
const Homey = () => {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", width: "auto" }}>
                    <SideBarCusomer />
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Homey;
