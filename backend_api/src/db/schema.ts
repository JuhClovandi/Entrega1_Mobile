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
  // Perfis: 'consumidor', 'prestador', 'superadmin' etc. Inicialmente será 'usuario'
  perfil: text('perfil').default('usuario').notNull(), 
});