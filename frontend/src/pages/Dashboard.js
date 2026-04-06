import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(response.data);
  };

  const createTask = async () => {
    const token = localStorage.getItem("token");

    await api.post(
      "/api/tasks",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    fetchTasks();
  };


  // Fazer lougt e remover Token 
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    await api.delete(`/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tarefas</h2>

      <button onClick={handleLogout}>Sair</button>

      <br /><br />

      <input
        placeholder="Nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Adicionar</button>

      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}
          <button onClick={() => deleteTask(task.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;