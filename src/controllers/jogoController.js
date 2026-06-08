const db = require("../db");

const listar = (req, res) => {
  const jogos = db.prepare("SELECT * FROM jogos ORDER BY criado_em DESC").all();
  res.json(jogos);
};

const buscarPorId = (req, res) => {
  const jogo = db
    .prepare("SELECT * FROM jogos WHERE id = ?")
    .get(req.params.id);
  if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado" });
  res.json(jogo);
};

// Alterado: Adicionamos o 'status' na criação
const criar = (req, res) => {
  const { titulo, genero, descricao, avaliacao, status } = req.body;
  const foto = req.file ? req.file.filename : null;
  const result = db
    .prepare(
      "INSERT INTO jogos (titulo, genero, descricao, avaliacao, foto, status) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(titulo, genero, descricao, Number(avaliacao), foto, status || "ativo");
  const jogo = db
    .prepare("SELECT * FROM jogos WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(jogo);
};

const atualizar = (req, res) => {
  // 1. Adicionamos 'status' na desestruturação (aqui ele pega o valor enviado pelo App)
  const { titulo, genero, descricao, avaliacao, status } = req.body;
  const foto = req.file ? req.file.filename : null;

  const atual = db
    .prepare("SELECT * FROM jogos WHERE id = ?")
    .get(req.params.id);

  if (!atual) return res.status(404).json({ erro: "Jogo não encontrado" });

  // 2. Adicionamos 'status = ?' na query SQL
  // 3. Adicionamos o campo status no .run()
  db.prepare(
    "UPDATE jogos SET titulo = ?, genero = ?, descricao = ?, avaliacao = ?, foto = ?, status = ? WHERE id = ?",
  ).run(
    titulo || atual.titulo,
    genero || atual.genero,
    descricao || atual.descricao,
    Number(avaliacao || atual.avaliacao),
    foto ?? atual.foto,
    status || atual.status, // Se o status não for enviado, mantém o que já estava
    req.params.id,
  );

  const jogo = db
    .prepare("SELECT * FROM jogos WHERE id = ?")
    .get(req.params.id);
  res.json(jogo);
};

const deletar = (req, res) => {
  db.prepare("DELETE FROM jogos WHERE id = ?").run(req.params.id);
  res.json({ mensagem: "Jogo deletado com sucesso" });
};

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
