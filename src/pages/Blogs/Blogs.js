// src/components/BlogsPage.js
import React from 'react';
import { blogsData } from '../../data/Data';
import { Link } from 'react-router-dom';

const BlogsPage = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Our Latest Blogs</h1>
            <div className="row">
                {blogsData.map((blog, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={blog.image_url}
                                className="card-img-top"
                                alt={blog.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">
                                    {blog.content.substring(0, 100)}... {/* Short preview */}
                                </p>
                                <Link to={`/blog/${index}`} className="btn btn-primary">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogsPage;
