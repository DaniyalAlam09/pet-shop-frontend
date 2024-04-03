import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/shops')
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleEdit = (productId) => {
        // Implement edit functionality
        console.log('Edit product with ID:', productId);
    };

    const handleDelete = (productId) => {
        // Implement delete functionality
        console.log('Delete product with ID:', productId);
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_description}</td>
                            <td>{product.product_price}</td>
                            <td>{product.product_stoke}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEdit(product._id)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
