const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  tags: [{ type: String }], // Array of tags
  public: { type: Boolean, default: false }, // Public flag
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Snippet", SnippetSchema);
