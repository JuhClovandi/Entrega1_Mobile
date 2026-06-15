import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const usuarios = sqliteTable('usuarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  senha: text('senha').notNull(),
  perfil: text('perfil').default('usuario').notNull(),
  categoria: text('categoria'),
  regiao: text('regiao'),
  fotoPerfil: text('foto_perfil'),
  biografia: text('biografia'),
});

export const servicos = sqliteTable('servicos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  preco: integer('preco').notNull(),
  tempoEstimado: text('tempo_estimado').notNull(),
  descricao: text('descricao').notNull(),
  prestadorId: integer('prestador_id').references(() => usuarios.id) 
});

export const agendamentos = sqliteTable('agendamentos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  servicoId: integer('servico_id').references(() => servicos.id).notNull(),
  clienteId: integer('cliente_id').references(() => usuarios.id).notNull(),
  horario: text('horario').notNull(),
  status: text('status').default('agendado').notNull()
});