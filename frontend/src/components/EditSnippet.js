import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";

const EditSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState({
    title: "",
    code: "",
    language: "",
    tags: [],
  });

  const [newTag, setNewTag] = useState(""); // Store new tag input
  const [output, setOutput] = useState(""); // Stores execution output

  // Fetch snippet details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/snippets/${id}`)
      .then((res) => setSnippet(res.data))
      .catch((err) => console.error("Error fetching snippet:", err));
  }, [id]);

  // Function to update snippet
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/snippets/update/${id}`,
        snippet
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };

  // Function to add a new tag
  const addTag = () => {
    if (newTag.trim() !== "" && !snippet.tags.includes(newTag)) {
      setSnippet({ ...snippet, tags: [...snippet.tags, newTag.trim()] });
      setNewTag(""); // Clear input field
    }
  };

  // Function to remove a tag
  const removeTag = (tagToRemove) => {
    setSnippet({
      ...snippet,
      tags: snippet.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleRunCode = async () => {
    setOutput("Running code...");

    try {
      const response = await axios.post("http://localhost:5000/api/run-code", {
        script: snippet.code,
        language: snippet.language.toLowerCase(),
      });

      console.log("Piston API Response:", response.data);
      setOutput(response.data.run.stdout || "No output received.");
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error executing code. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Snippet</h2>

      {/* Title Input */}
      <input
        type="text"
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        placeholder="Snippet Title"
        className="form-control mb-3"
      />

      {/* Language Input */}
      <input
        type="text"
        className="form-control mb-3"
        value={snippet.language || ""}
        onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
        placeholder="Enter Language (e.g., python3, javascript, cpp)"
      />

      {/* Code Editor */}
      <CodeEditor
        value={snippet.code}
        language={snippet.language}
        onChange={(code) => setSnippet({ ...snippet, code })}
      />

      {/* Tag Input */}
      <div className="tag-input-container mt-3">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter a tag"
          className="form-control"
        />
        <button className="btn btn-success mt-2" onClick={addTag}>
          Add Tag
        </button>
      </div>

      {/* Display Tags */}
      <div className="tag-list mt-3">
        {snippet.tags.map((tag, index) => (
          <span
            key={index}
            className="badge badge-primary m-1"
            style={{ color: "black", backgroundColor: "lightgray" }} // Ensuring text is black
          >
            {tag}{" "}
            <button
              className="btn btn-sm btn-danger ml-2"
              onClick={() => removeTag(tag)}
            >
              x
            </button>
          </span>
        ))}
      </div>

      {/* Update Button */}
      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Save Changes
      </button>

      {/* Run Code Button */}
      <button
        className="btn btn-success mt-3 ml-3 mr-3 float-right"
        onClick={handleRunCode}
        style={{ marginLeft: "10px" }}>
        Run Code
      </button>

      <button
          className="btn btn-warning mt-3 ml-3 float-right"
          onClick={() => (window.location.href = "/")}
        >
          🏠Home
        </button>

      {/* Output Section */}
      {output && (
        <div className="output-container mt-3">
          <h3>Output:</h3>
          <pre className="border p-2">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default EditSnippet;
