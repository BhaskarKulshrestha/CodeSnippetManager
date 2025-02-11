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
    axios
      .get("http://localhost:5000/api/snippets")
      .then(response => setSnippets(response.data))
      .catch(error => console.error("Error fetching snippets:", error));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
    <div>
      <Link to="/add">➕ Add Snippet</Link>
      <h2>Saved Snippets</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search snippets..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Tag Filter */}
      <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
        <option value="">All Tags</option>
        {uniqueTags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      {/* Language Filter */}
      <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="">All Languages</option>
        {uniqueLanguages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      {/* Display Snippets */}
      {snippets
        .filter(snippet => snippet.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(snippet => !selectedTag || snippet.tags.includes(selectedTag))
        .filter(snippet => !selectedLanguage || snippet.language === selectedLanguage)
        .map(snippet => (
          <div key={snippet._id} className="snippet-card">
            <h3>{snippet.title}</h3>
            <pre>{snippet.code}</pre>
            <p>Language: {snippet.language}</p>
            <p>Tags: {snippet.tags.join(", ")}</p>
            <button onClick={() => navigate(`/edit/${snippet._id}`)}>✏️ Edit</button>
            <button onClick={() => handleDelete(snippet._id)}>🗑 Delete</button>
            <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/public/${snippet._id}`)}>🔗 Copy Link</button>
          </div>
        ))}
    </div>
  );
}

export default SnippetList;
