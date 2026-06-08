const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, '..', 'gamelist.db'))

// Cria a tabela caso não exista
db.exec(`
  CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero TEXT NOT NULL,
    descricao TEXT,
    avaliacao INTEGER DEFAULT 0,
    foto TEXT,
    status TEXT DEFAULT 'ativo',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Tenta adicionar a coluna status caso o banco já exista e ela falte (Migração automática)
try {
  db.prepare('SELECT status FROM jogos LIMIT 1').get();
} catch (e) {
  db.exec('ALTER TABLE jogos ADD COLUMN status TEXT DEFAULT "ativo"');
}

module.exports = db