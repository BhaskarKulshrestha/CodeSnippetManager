const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet");

// ✅ Add a New Snippet with Tags & Public Sharing
router.post("/add", async (req, res) => {
  try {
    const { title, code, language, tags, public } = req.body;
    const newSnippet = new Snippet({ title, code, language, tags, public });
    await newSnippet.save();
    res.status(201).json({ message: "Snippet added successfully", snippet: newSnippet });
  } catch (error) {
    res.status(500).json({ error: "Failed to add snippet" });
  }
});

// ✅ Edit an Existing Snippet
router.put("/update/:id", async (req, res) => {
    try {
      const { title, code, language, tags } = req.body;
  
      const updatedSnippet = await Snippet.findByIdAndUpdate(
        req.params.id,
        { title, code, language, tags },
        { new: true }
      );
  
      if (!updatedSnippet) {
        return res.status(404).json({ message: "Snippet not found" });
      }
  
      res.json(updatedSnippet);
    } catch (error) {
      console.error("Error updating snippet:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// ✅ Delete a Snippet
router.delete("/delete/:id", async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete snippet" });
  }
});

// ✅ Search Snippets by Title, Language, or Tags
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Snippet.find({
      $or: [
        { title: new RegExp(query, "i") },
        { language: new RegExp(query, "i") },
        { tags: { $in: [query] } }
      ]
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to search snippets" });
  }
});

// ✅ Get Public Snippet by ID
router.get("/public/:id", async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet || !snippet.public) {
      return res.status(404).json({ error: "Snippet not found or not public" });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch public snippet" });
  }
});


router.get("/:id", async (req, res) => {
    try {
      const snippet = await Snippet.findById(req.params.id);
      if (!snippet) return res.status(404).json({ message: "Snippet not found" });
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving snippet" });
    }
  });
  

// ✅ Get Snippets by Language or Tags
router.get("/", async (req, res) => {
  try {
    const { language, tags } = req.query;
    let filter = {};
    if (language) filter.language = language;
    if (tags) filter.tags = { $in: tags.split(",") };

    const snippets = await Snippet.find(filter);
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch snippets" });
  }
});

module.exports = router;
