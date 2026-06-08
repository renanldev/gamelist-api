# GameList API

API RESTful desenvolvida para gerenciar uma biblioteca pessoal de jogos, com suporte a persistência de dados e upload de imagens.

## 💻Tecnologias
- **Node.js** com **Express**
- **SQLite** (via `better-sqlite3`)
- **Multer** (para upload de arquivos)

## 🚀clipboard: Funcionalidades
- CRUD completo (Create, Read, Update, Delete) de jogos.
- Implementação de *Soft Delete* (status ativo/apagado).
- Armazenamento local de imagens de capa.

## 🔧Como rodar
1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Inicie o servidor: `node server.js` (ou `nodemon server.js`)

## 🔗Endpoints
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/jogos` | Lista todos os jogos |
| `POST` | `/jogos` | Adiciona um novo jogo |
| `PUT` | `/jogos/:id` | Edita dados ou altera status |
| `DELETE` | `/jogos/:id` | Remove o registro permanentemente |
