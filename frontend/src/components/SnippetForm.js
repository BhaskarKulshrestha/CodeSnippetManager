import React, { useState } from "react";
import axios from "axios";

const SnippetForm = ({ fetchSnippets }) => {
    const [snippet, setSnippet] = useState({ title: "", code: "", language: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("`${process.env.REACT_APP_API_URL}/api/snippets/add`", snippet);
        fetchSnippets();
        setSnippet({ title: "", code: "", language: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={snippet.title} onChange={(e) => setSnippet({ ...snippet, title: e.target.value })} required />
            <textarea placeholder="Code" value={snippet.code} onChange={(e) => setSnippet({ ...snippet, code: e.target.value })} required />
            <input type="text" placeholder="Language" value={snippet.language} onChange={(e) => setSnippet({ ...snippet, language: e.target.value })} required />
            <button type="submit">Save Snippet</button>
        </form>
    );
};

export default SnippetForm;
