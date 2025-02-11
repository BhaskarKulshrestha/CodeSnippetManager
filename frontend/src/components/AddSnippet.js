import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSnippet() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const snippetData = { title, code, language, tags: tags.split(",") };

    try {
      await axios.post("http://localhost:5000/api/snippets/add", snippetData);
      navigate("/");
    } catch (error) {
      console.error("Error adding snippet:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">➕ Add New Snippet</h2>

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Code</label>
            <textarea className="form-control" rows="5" value={code} onChange={(e) => setCode(e.target.value)} required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Language</label>
            <input type="text" className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Tags (comma-separated)</label>
            <input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-success w-100">✅ Save Snippet</button>
        </form>
      </div>
    </div>
  );
}

export default AddSnippet;
