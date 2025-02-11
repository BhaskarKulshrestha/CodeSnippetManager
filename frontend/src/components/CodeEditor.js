import React from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({ value, language, onChange }) => {
  return (
    <div className="code-editor-container">
      <MonacoEditor
        height="300px"
        language={language || "javascript"}  // Set default language to JavaScript
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
