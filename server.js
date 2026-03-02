import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

// Serve static files from the dist (build) folder
app.use(express.static(path.join(__dirname, "dist")));

// Handle React routes — return index.html for any unknown path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
