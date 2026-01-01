import { useState } from "react";

function Blog() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlog] = useState([]);
  function handleSubmit(event) {
    event.preventDefault();
    setBlog([{ title: formData.title, content: formData.content }, ...blogs]);
    setFormData({ title: "", content: "" });
  }
  return (
    <div className="main-container">
      <h2>Blog-App</h2>
      <div className="add-blog">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ title: e.target.value, content: formData.content })
            }
          />
          <label>Content</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={formData.content}
            onChange={(e) =>
              setFormData({ title: formData.title, content: e.target.value })
            }
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="blog-list">
        {blogs.map((blog, index) => (
          <div key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Blog;
