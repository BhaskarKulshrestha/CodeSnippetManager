import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSnippet() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSnippet = {
      title,
      code,
      language,
      tags: tags.split(",").map(tag => tag.trim()),
      public: isPublic
    };

    try {
      await axios.post("http://localhost:5000/api/snippets/add", newSnippet);
      navigate("/");
    } catch (error) {
      console.error("Error adding snippet:", error);
    }
  };

  return (
    <div>
      <h2>Add New Snippet</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Code" value={code} onChange={e => setCode(e.target.value)} required />
        <input type="text" placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} required />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <label>
          <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          Make Public
        </label>
        <button type="submit">Save Snippet</button>
      </form>
    </div>
  );
}

export default AddSnippet;
