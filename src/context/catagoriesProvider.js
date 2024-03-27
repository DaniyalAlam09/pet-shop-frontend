import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
const CatagoriesContext = createContext({});

export const CatagoriesProvider = ({ children }) => {
    const [catagories, setCatagories] = useState([]);
    const getCategory = () => {
        axios
            .get("http://localhost:4000/category")
            .then((res) => {
                console.log("res", res)
                setCatagories(res.data.categories);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    useEffect(() => { getCategory() }, [])

    return (
        <CatagoriesContext.Provider
            value={{
                catagories
            }}
        >
            {children}
        </CatagoriesContext.Provider>
    );
};

export const useCatagories = () => useContext(CatagoriesContext);
