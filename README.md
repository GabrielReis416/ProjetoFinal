# 📌 Projeto Final - Desenvolve

Aluno : Gabriel Vitor de Oliveira Reis
PDITA : 416
Cidade : Itabira

---

# 🚀 Descrição do Projeto

Este projeto consiste em uma aplicação **Full Stack** desenvolvida com:

* **Backend:** Node.js + Express
* **Frontend:** React
* **Banco de Dados:** PostgreSQL

O sistema permite:

✔ Cadastro de usuários
✔ Login com autenticação JWT
✔ Gerenciamento de tarefas (CRUD)
✔ Rotas protegidas

---

# 🧱 Tecnologias Utilizadas

## 🔧 Backend

* Node.js
* Express
* PostgreSQL
* bcrypt
* jsonwebtoken
* cors

## ⚛️ Frontend

* React
* Axios
* React Router DOM

---

# 📁 Estrutura do Projeto

```
ProjetoFinal/
 ├── backend/
 │   ├── src/
 │   │   ├── config/
 │   │   ├── controllers/
 │   │   ├── middleware/
 │   │   ├── routes/
 │   │   └── server.js
 │   └── package.json
 │
 ├── frontend/
 │   ├── src/
 │   │   ├── pages/
 │   │   ├── services/
 │   │   └── App.js
 │   └── package.json
 │
 └── README.md
```

---

# ⚙️ Instalação e Execução

## 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js
* PostgreSQL
* Git

---

## 🔽 Clonar o projeto

```
git clone https://github.com/seu-usuario/ProjetoFinal.git
cd ProjetoFinal
```

---

# 🔧 CONFIGURAÇÃO DO BACKEND

## 📁 Acessar pasta

```
cd backend
```

---

## 📦 Instalar dependências

```
npm install
```

---

## 🗄️ Configurar banco de dados

Crie o banco no PostgreSQL:

```
CREATE DATABASE projeto_final;
```

---

## 📄 Criar tabela de usuários

```
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password TEXT
);
```

---

## 📄 Criar tabela de tarefas

```
CREATE TABLE tasks (
 id SERIAL PRIMARY KEY,
 title VARCHAR(200),
 description TEXT,
 status VARCHAR(20) DEFAULT 'pendente',
 user_id INTEGER REFERENCES users(id)
);
```

---

## 🔐 Configurar conexão com banco

No arquivo:

```
backend/src/config/db.js
```

Configure:

```javascript
const pool = new Pool({
 user: "postgres",
 host: "localhost",
 database: "projeto_final",
 password: "SUA_SENHA",
 port: 5432
})
```

---

## ▶️ Rodar backend

```
node src/server.js
```

Servidor rodando em:

```
http://localhost:3001
```

---

# ⚛️ CONFIGURAÇÃO DO FRONTEND

## 📁 Acessar pasta

```
cd frontend
```

---

## 📦 Instalar dependências

```
npm install
```

---

## ▶️ Rodar aplicação

```
npm start
```

Aplicação disponível em:

```
http://localhost:3000
```

---

# 🔗 Integração Frontend ↔ Backend

No arquivo:

```
src/services/api.js
```

Configure a URL:

```javascript
baseURL: "http://localhost:3001"
```

---

# 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)**.

Após login:

✔ O token é salvo no `localStorage`
✔ Enviado no header das requisições

```
Authorization: Bearer TOKEN
```

---

# 📋 Funcionalidades

## 👤 Usuário

* Cadastro
* Login

## 📌 Tarefas

* Criar tarefa
* Listar tarefas
* Deletar tarefa
* Atualizar tarefa (opcional)

---

# 🧪 Testes

Você pode testar a API utilizando:

* Postman

---

# 🚀 Rotas da API

## 🔐 Autenticação

```
POST /api/auth/register
POST /api/auth/login
```

---

## 📋 Tarefas

```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

# ⚠️ Observações

* O backend roda na porta **3001**
* O frontend roda na porta **3000**
* É necessário que o PostgreSQL esteja ativo

---

# 🎯 Status do Projeto

✔ Sprint 1 - Estrutura inicial
✔ Sprint 2 - Backend completo
✔ Sprint 3 - Frontend integrado

---

# 👨‍💻 Autor

Projeto desenvolvido para o curso **Desenvolve**
Matrícula: **P416**

---
