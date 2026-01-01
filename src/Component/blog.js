import { useEffect, useReducer, useRef, useState } from "react";
import { db } from "../firebaseInit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

/* ================= REDUCER ================= */
/*
  blogs = current state
  action = { type, payload }
*/
function reducerFunction(blogs, action) {
  switch (action.type) {
    case "SET":
      // Initial load from Firestore
      return action.blogs;

    case "ADD":
      // Add new blog at top
      return [action.blog, ...blogs];

    case "REMOVE":
      // Remove blog using Firebase document ID
      return blogs.filter((blog) => blog.id !== action.id);

    case "UPDATE":
      // Update blog using Firebase document ID
      return blogs.map((blog) => (blog.id === action.id ? action.blog : blog));

    default:
      return blogs;
  }
}

/* ================= COMPONENT ================= */
function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, dispatch] = useReducer(reducerFunction, []);
  const [editId, setEditId] = useState(null); // Firebase doc id
  const titleRef = useRef(null);

  /* Auto focus on title input */
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  /* Update browser tab title */
  useEffect(() => {
    document.title = blogs.length > 0 ? blogs[0].title : "No-Blogs";
  }, [blogs]);

  /* ================= LOAD BLOGS FROM FIRESTORE ================= */
  useEffect(() => {
    async function fetchBlogs() {
      const querySnapshot = await getDocs(collection(db, "blogs"));

      const blogsFromDB = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "SET", blogs: blogsFromDB });
    }

    fetchBlogs();
  }, []);

  /* ================= ADD / UPDATE ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    // -------- UPDATE --------
    if (editId) {
      const blogRef = doc(db, "blogs", editId);

      await updateDoc(blogRef, {
        title: formData.title,
        content: formData.content,
      });

      dispatch({
        type: "UPDATE",
        id: editId,
        blog: {
          id: editId,
          title: formData.title,
          content: formData.content,
        },
      });

      setEditId(null);
    }
    // -------- ADD --------
    else {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: formData.title,
        content: formData.content,
        createdOn: new Date(),
      });

      dispatch({
        type: "ADD",
        blog: {
          id: docRef.id, // Firebase ID
          title: formData.title,
          content: formData.content,
        },
      });
    }

    // Reset form
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }

  /* ================= EDIT ================= */
  function handleEdit(blog) {
    setEditId(blog.id);
    setFormData({
      title: blog.title,
      content: blog.content,
    });
    titleRef.current.focus();
  }

  /* ================= DELETE ================= */
  async function removeBlog(id) {
    await deleteDoc(doc(db, "blogs", id));
    dispatch({ type: "REMOVE", id });
  }

  /* ================= UI ================= */
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

          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>
      </div>

      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <button onClick={() => handleEdit(blog)}>Edit</button>
            <button onClick={() => removeBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
