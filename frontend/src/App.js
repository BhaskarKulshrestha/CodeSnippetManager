import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SnippetList from "./components/SnippetList";
import AddSnippet from "./components/AddSnippet";
import EditSnippet from "./components/EditSnippet";
import PublicSnippet from "./components/PublicSnippet";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Code Snippet Manager</h1>
        <Routes>
          <Route path="/" element={<SnippetList />} />
          <Route path="/add" element={<AddSnippet />} />
          <Route path="/edit/:id" element={<EditSnippet />} />
          <Route path="/public/:id" element={<PublicSnippet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
