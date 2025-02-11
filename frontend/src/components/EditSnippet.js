import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/snippets/${id}`)
      .then(response => {
        const snippet = response.data;
        setTitle(snippet.title);
        setCode(snippet.code);
        setLanguage(snippet.language);
        setTags(snippet.tags.join(", "));
        setIsPublic(snippet.public);
      })
      .catch(error => console.error("Error fetching snippet:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSnippet = {
      title,
      code,
      language,
      tags: tags.split(",").map(tag => tag.trim()),
      public: isPublic
    };

    try {
      await axios.put(`http://localhost:5000/api/snippets/edit/${id}`, updatedSnippet);
      navigate("/");
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  return (
    <div>
      <h2>Edit Snippet</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea value={code} onChange={e => setCode(e.target.value)} required />
        <input type="text" value={language} onChange={e => setLanguage(e.target.value)} required />
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} />
        <label>
          <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          Make Public
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditSnippet;
