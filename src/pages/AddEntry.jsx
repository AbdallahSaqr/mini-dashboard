import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { createPost } from "../services/api";

export default function AddEntry() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newPost = await createPost({
        title: formData.title,
        body: formData.content,
        userId: 1, 
      });

      console.log("Post created:", newPost);

      setFormData({
        title: "",
        content: "",
        author: "",
        status: "Draft",
      });

      alert("Post added successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to add post.");
    }
  };

  return (
    <>
      <Header
        title="Add Post"
        icon={"bi bi-journal-plus gradient-icon"}
        onProfile={handleProfile}
        onLogout={handleLogout}
      />

      <div className="container-fluid d-flex justify-content-center align-items-center mt-4">
        {/* Form Card */}
        <Card title="Create a New Post">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                name="content"
                rows="4"
                className="form-control"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content..."
              />
            </div>

            {/* Author */}
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                className="form-control"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            {/* Submit */}
            <Button type="submit" className="btn btn-primary w-100">
              Add Post
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
