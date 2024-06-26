import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCatagories } from '../../context/catagoriesProvider';
import { useNavigate } from 'react-router-dom';

function ProductUpload() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [stock, setStock] = useState('');
    const [sku, setSku] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [error, setError] = useState('');
    const { catagories } = useCatagories();
    const navigate = useNavigate();

    const validateInputs = () => {
        const namePattern = /^[a-zA-Z\s]+$/;
        const numberPattern = /^[0-9]+$/;

        if (!namePattern.test(productName)) {
            setError('Product name should only contain alphabetic characters.');
            return false;
        }

        if (!numberPattern.test(productPrice) || !numberPattern.test(stock) || !numberPattern.test(sku)) {
            setError('Price, stock, and SKU should only contain numeric characters.');
            return false;
        }

        if (discount && (!numberPattern.test(discount) || Number(discount) >= Number(productPrice))) {
            setError('Discounted price should be numeric and less than the product price.');
            return false;
        }

        setError('');
        return true;
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        switch (id) {
            case 'productName':
                setProductName(value);
                break;
            case 'productPrice':
                setProductPrice(value);
                break;
            case 'productDescription':
                setProductDescription(value);
                break;
            case 'productCategory':
                setProductCategory(value);
                break;
            case 'sku':
                setSku(value);
                break;
            case 'stock':
                setStock(value);
                break;
            case 'discount':
                setDiscount(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) { // Check file size (3MB)
                setError('File size exceeds 3MB limit.');
            } else if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) { // Check file type
                setError('Invalid file type. Please upload PNG, JPEG, or JPG.');
            } else {
                setProductImage(file);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('stoke', Number(stock));
        formData.append('sku', Number(sku));
        formData.append('description', productDescription);
        formData.append('discounted_price', Number(discount));
        formData.append('category', productCategory);
        formData.append('product', productImage);

        try {
            const response = await axios.post('http://localhost:4000/shops/add-product', formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Product Uploaded');
            navigate('../../admin/my-products');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error uploading product');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center mb-4">Product Upload Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="productName" className="required-label">Product Name</label>
                            <input type="text" className="form-control" id="productName" placeholder="Enter product name" value={productName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productPrice" className="required-label">Price</label>
                            <input type="text" className="form-control" id="productPrice" placeholder="Enter product price" value={productPrice} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="discount">Discounted Price</label>
                            <input type="text" className="form-control" id="discount" placeholder="Enter discounted price" value={discount} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sku" className="required-label">SKU</label>
                            <input required type="text" className="form-control" id="sku" placeholder="Enter SKU" value={sku} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock" className="required-label">Stock</label>
                            <input required type="text" className="form-control" id="stock" placeholder="Enter stock" value={stock} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDescription" className="required-label">Description</label>
                            <textarea required className="form-control" id="productDescription" rows="3" placeholder="Enter product description" value={productDescription} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productCategory" className="required-label">Category</label>
                            <select required className="form-control" id="productCategory" value={productCategory} onChange={handleInputChange}>
                                <option value=''>Select Category</option>
                                {catagories.map(
                                    category => (
                                        <option key={category.slug} value={category.slug}>{category.name}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productImage" className="required-label">Upload Image</label>
                            <div className="custom-file">
                                <input required type="file" className="custom-file-input" id="productImage" onChange={handleImageChange} accept="image/png, image/jpeg, image/jpg" />
                                <label className="custom-file-label" htmlFor="productImage">Choose file</label>
                            </div>
                            {productImage && <img className='uploadedImage' src={URL.createObjectURL(productImage)} alt="Preview" />}
                            {error && <div className="text-danger">{error}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductUpload;
