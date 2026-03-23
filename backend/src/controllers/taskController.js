const db = require("../config/db")

// Criar tarefa
exports.createTask = async (req, res) => {
 const { title, description } = req.body

 const result = await db.query(
  "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
  [title, description, req.userId]
 )

 res.json(result.rows[0])
}

// Listar tarefas do usuário
exports.getTasks = async (req, res) => {
 const result = await db.query(
  "SELECT * FROM tasks WHERE user_id = $1",
  [req.userId]
 )

 res.json(result.rows)
}

// Atualizar tarefa
exports.updateTask = async (req, res) => {
 const { id } = req.params
 const { title, description, status } = req.body

 const result = await db.query(
  "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
  [title, description, status, id, req.userId]
 )

 res.json(result.rows[0])
}

// Deletar tarefa
exports.deleteTask = async (req, res) => {
 const { id } = req.params

 await db.query(
  "DELETE FROM tasks WHERE id=$1 AND user_id=$2",
  [id, req.userId]
 )

 res.json({ message: "Tarefa removida" })
}