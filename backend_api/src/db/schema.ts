import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const ufs = sqliteTable('ufs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sigla: text('sigla').notNull().unique(),
  nome: text('nome').notNull(),
});

export const cidades = sqliteTable('cidades', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  uf_id: integer('uf_id').references(() => ufs.id).notNull(),
});

export const usuarios = sqliteTable('usuarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  senha: text('senha').notNull(),
  perfil: text('perfil').default('usuario').notNull(), // 'usuario' ou 'prestador'
  categoria: text('categoria'), // Opcional (apenas para prestador)
  regiao: text('regiao'),       // Opcional (apenas para prestador)
});

export const servicos = sqliteTable('servicos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  preco: integer('preco').notNull(), // Armazenado como número decimal/float
  tempoEstimado: text('tempo_estimado').notNull(),
  descricao: text('descricao').notNull(),
  // Vincula o serviço diretamente ao profissional que o criou
  prestadorId: integer('prestador_id').references(() => usuarios.id) 
});