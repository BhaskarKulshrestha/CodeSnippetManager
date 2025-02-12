const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Welcome to Code Snippet Manager API"));
app.use(express.json()); // Ensure JSON parsing is enabled

app.post("/api/snippets", async (req, res) => {
  try {
    const { title, language, tags, code } = req.body;
    if (!title || !language || !code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSnippet = new Snippet({ title, language, tags, code });
    await newSnippet.save();

    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


const snippetRoutes = require("./routes/snippetRoutes");
app.use("/api/snippets", snippetRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
