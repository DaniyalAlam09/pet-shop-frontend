import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/shops')
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);


    const openModal = (productId) => {
        console.log('called')
        setProductIdToDelete(productId);
        setOpen(true);
    };

    const closeModal = () => {
        setProductIdToDelete(null);
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:4000/shops/delete/${productIdToDelete}`)
            .then(response => {
                setProducts(products.filter(product => product._id !== productIdToDelete));
                closeModal();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                closeModal();
            });
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>  <img
                                src={product.product_image ? ('http://localhost:4000/' + product.product_image?.replace('public\\', '').replace(/\\/g, '/')) : "../assets/img/carousel-1.jpg"}
                                style={{ height: "3em", marginTop: "-5px" }}
                            /></td>
                            <td>{product.product_description}</td>
                            <td>{product.product_price}</td>
                            <td>{product.product_stoke}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => openModal(product._id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td className="text-center" colSpan={8}>No Products Found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Popup contentStyle={{ width: "300px", padding: "30px", alignSelf: "center" }} open={open} onClose={closeModal}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="">
                    <b className="header"> Confirm Deletion </b>
                    <div className="content">
                        Are you sure you want to delete this product?
                    </div>
                    <div style={{ margin: "10px" }} className="actions">
                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Confirm</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default ProductTable;
