import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = () => {
    axios.get("http://localhost:5000/api/snippets")
      .then(response => setSnippets(response.data))
      .catch(error => console.error("Error fetching snippets:", error));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/snippets/delete/${id}`);
      fetchSnippets();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const uniqueTags = [...new Set(snippets.flatMap(snippet => snippet.tags))];
  const uniqueLanguages = [...new Set(snippets.map(snippet => snippet.language))];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📜 Your Code Snippets</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search snippets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to="/add" className="btn btn-primary">➕ Add Snippet</Link>
      </div>

      {/* Filters */}
      <div className="d-flex gap-3 mb-3">
        <select className="form-select" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="">All Tags</option>
          {uniqueTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>

        <select className="form-select" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="">All Languages</option>
          {uniqueLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </select>
      </div>

      {/* Snippets List */}
      <div className="row">
        {snippets
          .filter(snippet => snippet.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter(snippet => !selectedTag || snippet.tags.includes(selectedTag))
          .filter(snippet => !selectedLanguage || snippet.language === selectedLanguage)
          .map(snippet => (
            <div key={snippet._id} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{snippet.title}</h5>
                  <pre className="bg-light p-2">{snippet.code}</pre>
                  <p><strong>Language:</strong> {snippet.language}</p>
                  <p><strong>Tags:</strong> {snippet.tags.join(", ")}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-warning" onClick={() => navigate(`/edit/${snippet._id}`)}>✏️ Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(snippet._id)}>🗑 Delete</button>
                    <button className="btn btn-info" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/public/${snippet._id}`)}>🔗 Copy Link</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SnippetList;
