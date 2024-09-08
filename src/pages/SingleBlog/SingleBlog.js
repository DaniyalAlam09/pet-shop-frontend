// src/components/SingleBlogPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogsData } from "../../data/Data";

const SingleBlogPage = () => {
    const { id } = useParams(); // Extract the blog ID from the URL
    const blog = blogsData[id]; // Find the blog using the ID

    if (!blog) {
        return <h2 className="text-center">Blog Not Found</h2>;
    }

    return (
        <div className="container mt-5">
            <Link to="/blogs" className="btn btn-secondary mb-3">
                Back to Blogs
            </Link>
            <div className="card shadow-lg">
                <img
                    src={blog.image_url}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h1 className="card-title">{blog.title}</h1>
                    <p className="card-text">{blog.content}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleBlogPage;
