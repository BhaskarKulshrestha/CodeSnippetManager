// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const Snippet = require("./models/Snippet"); // Ensure this model exists
// const snippetRoutes = require("./routes/snippetRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json()); // Enable JSON parsing

// // 🔹 MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log("MongoDB Connection Error:", err));

// // 🔹 API Routes
// app.use("/api/snippets", snippetRoutes);

// app.post("/api/run-code", async (req, res) => {
//   const { script, language } = req.body;

//   try {
//     const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
//       language: language.toLowerCase(),
//       version: "*", // Latest version
//       files: [{ content: script }]
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Piston API Error:", error);
//     res.status(500).json({ error: "Failed to execute code" });
//   }
// });




// // // 🔹 Serve Frontend (Production Build)
// // app.use(express.static(path.join(__dirname, "../frontend/build")));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// // });





// // 🔹 Serve Frontend (Production Build)
// app.use(express.json());
// const _dirname = path.dirname("");
// const buildpath  = path.join(_dirname,"../frontend/build");
// // app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.use(express.static(buildpath));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
// // });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
// });


// // 🔹 Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const Snippet = require("./models/Snippet"); // Ensure this model exists
// const snippetRoutes = require("./routes/snippetRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json()); // Enable JSON parsing

// // 🔹 MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log("MongoDB Connection Error:", err));

// // 🔹 API Routes
// app.use("/api/snippets", snippetRoutes);

// app.post("/api/run-code", async (req, res) => {
//   const { script, language } = req.body;

//   try {
//     const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
//       language: language.toLowerCase(),
//       version: "*", // Latest version
//       files: [{ content: script }]
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Piston API Error:", error);
//     res.status(500).json({ error: "Failed to execute code" });
//   }
// });




// // // 🔹 Serve Frontend (Production Build)
// // app.use(express.static(path.join(__dirname, "../frontend/build")));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// // });





// // 🔹 Serve Frontend (Production Build)
// app.use(express.json());
// const _dirname = path.dirname("");
// const buildpath  = path.join(_dirname,"../frontend/build");
// // app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.use(express.static(buildpath));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
// // });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
// });


// // 🔹 Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));














// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const Snippet = require("./models/Snippet");
const snippetRoutes = require("./routes/snippetRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Enables parsing of JSON bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Route Handlers
app.use("/api/snippets", snippetRoutes);

app.post("/api/run-code", async (req, res) => {
  const { script, language } = req.body;
  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: language.toLowerCase(),
        version: "*", // use latest
        files: [{ content: script }]
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.error("Piston API Error:", error);
    return res.status(500).json({ error: "Failed to execute code" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
