import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PublicSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/snippets/${id}`)
      .then(response => setSnippet(response.data))
      .catch(error => console.error("Error fetching snippet:", error));
  }, [id]);

  if (!snippet) return <h2 className="text-center mt-4">Loading...</h2>;

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2>{snippet.title}</h2>
        <pre>{snippet.code}</pre>
        <p><strong>Language:</strong> {snippet.language}</p>
        <p><strong>Tags:</strong> {snippet.tags.join(", ")}</p>
      </div>
    </div>
  );
}

export default PublicSnippet;
