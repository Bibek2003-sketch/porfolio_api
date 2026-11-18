const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors()); // allow browser requests
app.use(express.json()); // read JSON request bodies
app.use(express.static(path.join(__dirname, "public"))); // serve the website

// In-memory "database"
let projects = [
  {
    id: 1,
    title: "Auction Website",
    description: "Online bidding platform",
    tech: "MERN",
    link: "#",
  },
  {
    id: 2,
    title: "Churn Dashboard",
    description: "Customer churn prediction",
    tech: "Python, ML",
    link: "#",
  },
];
let nextId = 3;

// READ all
app.get("/api/projects", (req, res) => res.json(projects));

// READ one
app.get("/api/projects/:id", (req, res) => {
  const p = projects.find((x) => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({ message: "Project not found" });
  res.json(p);
});

// CREATE
app.post("/api/projects", (req, res) => {
  const { title, description, tech, link } = req.body;
  if (!title || !description)
    return res
      .status(400)
      .json({ message: "title and description are required" });
  const project = {
    id: nextId++,
    title,
    description,
    tech: tech || "",
    link: link || "#",
  };
  projects.push(project);
  res.status(201).json(project);
});

// UPDATE
app.put("/api/projects/:id", (req, res) => {
  const p = projects.find((x) => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({ message: "Project not found" });
  Object.assign(p, req.body, { id: p.id }); // keep id unchanged
  res.json(p);
});

// DELETE
app.delete("/api/projects/:id", (req, res) => {
  const index = projects.findIndex((x) => x.id === Number(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Project not found" });
  const [removed] = projects.splice(index, 1);
  res.json({ message: "Deleted", removed });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
