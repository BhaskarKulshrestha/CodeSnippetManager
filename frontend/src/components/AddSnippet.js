import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react"; // Ensure this is installed

const AddSnippet = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState("// Write your code here...");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/snippets/add", {
        title,
        language,
        tags,
        code,
      });

      console.log("Snippet created:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating snippet:", error.response?.data || error.message);
      alert("Failed to create snippet! Check console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Snippet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Language</label>
          <input
            type="text"
            className="form-control"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            className="form-control"
            placeholder="Comma-separated tags (e.g., JavaScript, WebDev)"
            onChange={(e) => setTags(e.target.value.split(","))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Code</label>
          <Editor
            height="300px"
            theme="vs-dark"
            language={language || "javascript"}
            value={code}
            onChange={(value) => setCode(value)}
            options={{ fontSize: 14 }}
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Snippet</button>
      </form>
    </div>
  );
};

export default AddSnippet;
