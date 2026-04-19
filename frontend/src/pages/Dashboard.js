import { useEffect, useState } from "react";
import api from "../services/api";
import { 
  Container, TextField, Button, Typography, Box, 
  Card, CardContent, IconButton, Divider 
} from "@mui/material";

// Ícones
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Cores do Projeto
  const colors = {
    primary: "#005f6b",
    secondary: "#e67e6e",
    success: "#7fcdbb",
    bg: "#fdfbf7",
    card: "#ffffff",
    text: "#2d3748",
    subtext: "#94a3b8"
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/api/tasks", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTasks(response.data);
    } catch (err) { console.error("Erro ao carregar tarefas", err); }
  };

  const createTask = async () => {
    if (!title) return;
    const token = localStorage.getItem("token");
    await api.post("/api/tasks", { title }, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    setTitle("");
    fetchTasks();
  };

  const toggleTaskStatus = async (task) => {
    const token = localStorage.getItem("token");
    const newStatus = task.status === "concluida" ? "pendente" : "concluida";
    
    await api.put(`/api/tasks/${task.id}`, 
      { ...task, status: newStatus }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await api.delete(`/api/tasks/${id}`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => { fetchTasks(); }, []);

  const pendentes = tasks.filter(t => t.status !== "concluida");
  const concluidas = tasks.filter(t => t.status === "concluida");

  return (
    <Box sx={{ background: colors.bg, minHeight: "100vh", py: 5 }}>
      <Container maxWidth="sm">
        
        {/* Cabeçalho */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: colors.text }}>
            Minhas Tarefas
          </Typography>
          <Button onClick={logout} color="error" startIcon={<LogoutIcon />}>Sair</Button>
        </Box>

        {/* Criar Tarefa */}
        <Box sx={{ 
          display: "flex", gap: 1, mb: 4, p: 1, 
          background: colors.card, borderRadius: "12px", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)" 
        }}>
          <TextField 
            fullWidth 
            placeholder="O que precisa ser feito?" 
            variant="standard" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            InputProps={{ disableUnderline: true, sx: { px: 2, py: 1 } }}
          />
          <Button 
            variant="contained" 
            onClick={createTask} 
            sx={{ background: colors.primary, borderRadius: "8px" }}
          >
            ADICIONAR
          </Button>
        </Box>

        {/* Lista de Pendentes */}
        <Typography variant="subtitle2" sx={{ mb: 2, color: colors.text, opacity: 0.7, fontWeight: 'bold' }}>
          PENDENTES ({pendentes.length})
        </Typography>
        {pendentes.map(task => (
          <Card key={task.id} sx={{ mb: 2, borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "12px !important" }}>
              <Typography sx={{ color: colors.text }}>{task.title}</Typography>
              <Box>
                <IconButton onClick={() => toggleTaskStatus(task)} sx={{ color: colors.success }}>
                  <CheckCircleIcon />
                </IconButton>
                <IconButton onClick={() => deleteTask(task.id)} sx={{ color: colors.secondary }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

        {concluidas.length > 0 && <Divider sx={{ my: 4 }} />}

        {/* Lista de Concluídas */}
        <Typography variant="subtitle2" sx={{ mb: 2, color: colors.text, opacity: 0.7, fontWeight: 'bold' }}>
          CONCLUÍDAS ({concluidas.length})
        </Typography>
        {concluidas.map(task => (
          <Card key={task.id} sx={{ mb: 2, borderRadius: "12px", background: "#f8fafc" }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "12px !important" }}>
              <Typography sx={{ color: colors.subtext, textDecoration: "line-through" }}>
                {task.title}
              </Typography>
              <Box>
                <IconButton onClick={() => toggleTaskStatus(task)} sx={{ color: colors.secondary }}>
                  <UndoIcon />
                </IconButton>
                <IconButton onClick={() => deleteTask(task.id)} sx={{ color: colors.secondary }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

      </Container>
    </Box>
  );
}

export default Dashboard;