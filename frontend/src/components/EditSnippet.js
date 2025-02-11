import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";

const EditSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState({ title: "", code: "", language: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/snippets/${id}`)
      .then((res) => setSnippet(res.data))
      .catch((err) => console.error("Error fetching snippet:", err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/snippets/update/${id}`, snippet);
      navigate("/");
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Snippet</h2>
      <input
        type="text"
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        placeholder="Snippet Title"
        className="form-control mb-3"
      />
      <CodeEditor
        value={snippet.code}
        language={snippet.language}
        onChange={(code) => setSnippet({ ...snippet, code })}
      />
      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Save Changes
      </button>
    </div>
  );
};

export default EditSnippet;
