const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const FILE = "todos.json";

function loadTodos() {
  return JSON.parse(fs.readFileSync(FILE));
}

function saveTodos(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/todos", (req, res) => {
  res.json(loadTodos());
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ msg: "Title required" });

  const todos = loadTodos();
  const newTodo = { id: Date.now(), title, completed: false };

  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ msg: "Not found" });

  if (title) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  saveTodos(todos);
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  let todos = loadTodos().filter((t) => t.id !== id);

  saveTodos(todos);
  res.json({ msg: "Deleted" });
});

app.listen(3000, () => console.log("Server running at port 3000"));
