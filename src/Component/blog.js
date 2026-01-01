import { useEffect, useReducer, useRef, useState } from "react";

function reducerFunction(blogs, action) {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...blogs];
    case "REMOVE":
      return blogs.filter((_, index) => index !== action.index);
    default:
      return blogs;
  }
}

function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, dispatch] = useReducer(reducerFunction, []);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No-Blogs";
    }
  }, [blogs]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({
      type: "ADD",
      blog: { title: formData.title, content: formData.content },
    });
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }
  function removeBlog(index) {
    dispatch({ type: "REMOVE", index: index });
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
            ref={titleRef}
            value={formData.title}
            onChange={(e) =>
              setFormData({ title: e.target.value, content: formData.content })
            }
          />
          <label>Content</label>
          <input
            type="text"
            placeholder="Enter Title"
            required
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
            <button onClick={() => removeBlog(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Blog;
