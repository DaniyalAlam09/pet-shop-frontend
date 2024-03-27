import React from 'react'

function ProductUpload() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center mb-4">Product Upload Form</h2>
                    <form>
                        <div className="form-group">
                            <label for="productName" className="required-label">Product Name</label>
                            <input type="text" className="form-control" id="productName" placeholder="Enter product name" required />
                        </div>
                        <div className="form-group">
                            <label for="productPrice">Price</label>
                            <input type="text" className="form-control" id="productPrice" placeholder="Enter product price" />
                        </div>
                        <div className="form-group">
                            <label for="productDescription">Description</label>
                            <textarea className="form-control" id="productDescription" rows="3" placeholder="Enter product description"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="productCategory">Category</label>
                            <select className="form-control" id="productCategory">
                                <option value="1">Category 1</option>
                                <option value="2">Category 2</option>
                                <option value="3">Category 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="productImage">Upload Image</label>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="productImage" />
                                <label className="custom-file-label" for="productImage">Choose file</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ProductUpload