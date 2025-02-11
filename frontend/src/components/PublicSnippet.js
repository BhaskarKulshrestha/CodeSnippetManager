import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PublicSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/snippets/${id}`)
      .then(response => setSnippet(response.data))
      .catch(error => {
        console.error("Error fetching snippet:", error);
        setError("Snippet not found.");
      });
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!snippet) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{snippet.title}</h2>
      <pre>{snippet.code}</pre>
      <p>Language: {snippet.language}</p>
      <p>Tags: {snippet.tags.join(", ")}</p>
    </div>
  );
}

export default PublicSnippet;
