import { useState } from "react";

function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Content</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="blog-list">
        <h3>Title:{title}</h3>
        <p>Content:{content}</p>
      </div>
    </div>
  );
}
export default Blog;
