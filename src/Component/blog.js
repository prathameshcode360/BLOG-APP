import { useEffect, useReducer, useRef, useState } from "react";
import { db } from "../firebaseInit";

/* ---------------- REDUCER ---------------- */
function reducerFunction(blogs, action) {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...blogs];

    case "REMOVE":
      return blogs.filter((_, index) => index !== action.index);

    case "UPDATE":
      return blogs.map((blog, index) =>
        index === action.index ? action.blog : blog
      );

    default:
      return blogs;
  }
}

/* ---------------- COMPONENT ---------------- */
function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, dispatch] = useReducer(reducerFunction, []);
  const [editIndex, setEditIndex] = useState(null);
  const titleRef = useRef(null);

  /* Auto focus */
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  /* Document title */
  useEffect(() => {
    document.title = blogs.length > 0 ? blogs[0].title : "No-Blogs";
  }, [blogs]);

  /* Submit (ADD / UPDATE) */
  function handleSubmit(e) {
    e.preventDefault();

    if (editIndex !== null) {
      dispatch({
        type: "UPDATE",
        index: editIndex,
        blog: {
          title: formData.title,
          content: formData.content,
        },
      });
      setEditIndex(null);
    } else {
      dispatch({
        type: "ADD",
        blog: {
          title: formData.title,
          content: formData.content,
        },
      });
    }

    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }

  /* Edit */
  function handleEdit(index) {
    setEditIndex(index);
    setFormData({
      title: blogs[index].title,
      content: blogs[index].content,
    });
    titleRef.current.focus();
  }

  /* Delete */
  function removeBlog(index) {
    dispatch({ type: "REMOVE", index });
  }

  return (
    <div className="main-container">
      <h2>Blog-App</h2>

      <div className="add-blog">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            ref={titleRef}
            value={formData.title}
            required
            onChange={(e) =>
              setFormData({
                title: e.target.value,
                content: formData.content,
              })
            }
          />

          <label>Content</label>
          <input
            type="text"
            value={formData.content}
            required
            onChange={(e) =>
              setFormData({
                title: formData.title,
                content: e.target.value,
              })
            }
          />

          <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
        </form>
      </div>

      <div className="blog-list">
        {blogs.map((blog, index) => (
          <div key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => removeBlog(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
