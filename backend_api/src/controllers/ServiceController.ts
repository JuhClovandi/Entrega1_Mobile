import { Request, Response } from 'express';
import { db } from '../db';
import { servicos, agendamentos } from '../db/schema'; // ✅ Incluído agendamentos no import para cascata
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '123';

export const ServiceController = {
  // 1. Criar / Catalogar Serviço
  async createService(req: Request, res: Response) {
    try {
      const { nome, preco, tempo_estimado, descricao } = req.body;
      
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido. Faça login novamente." });
      }

      const token = authHeader.split(' ')[1];
      
      let decoded: { id: number, perfil: string };
      try {
        decoded = jwt.verify(token, SECRET) as { id: number, perfil: string };
      } catch (jwtError) {
        return res.status(401).json({ message: "Sessão expirada ou Token inválido. Faça login novamente." });
      }

      if (decoded.perfil !== 'prestador') {
        return res.status(403).json({ message: "Acesso negado: Apenas profissionais podem catalogar serviços." });
      }

      await db.insert(servicos).values({
        nome,
        preco,
        tempoEstimado: tempo_estimado,
        descricao,
        prestadorId: decoded.id
      }).run();

      return res.status(201).json({ message: "Serviço catalogado com sucesso!" });

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO SALVAR SERVIÇO:", error);
      return res.status(500).json({ 
        message: "Erro interno ao salvar o serviço no banco de dados.", 
        error: error.message 
      });
    }
  },

  // 2. Excluir Serviço - Totalmente Protegido contra Erros de Chave Estrangeira
  async deleteService(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      if (!id) return res.status(400).json({ message: "ID do serviço não fornecido." });

      const serviceId = Number(id);
      console.log(`--> 🔴 INICIANDO REMOÇÃO EM CASCATA PARA O SERVIÇO ID: ${serviceId}`);

      // PASSO 1: Deleta todos os agendamentos vinculados a este serviço primeiro
      await db.delete(agendamentos)
        .where(eq(agendamentos.servicoId, serviceId))
        .run();
      console.log("--> 🟢 Agendamentos vinculados ao serviço limpos com sucesso.");

      // PASSO 2: Deleta o serviço definitivo da tabela
      const result = await db.delete(servicos)
        .where(eq(servicos.id, serviceId))
        .run();
      console.log(`--> 🔴 Remoção do serviço concluída. Linhas afetadas: ${result.changes}`);

      if (result.changes === 0) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }
      
      return res.json({ message: "Serviço excluído com sucesso!" });
    } catch (error: any) {
      console.error("❌ ERRO NO DELETE DE SERVIÇO:", error);
      return res.status(500).json({ 
        message: "Erro interno no servidor ao tentar excluir o serviço.",
        error: error.message 
      });
    }
  },

  // 3. Listar Serviços (Filtro por Prestador ou Geral)
  async listAllServices(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });

      const token = authHeader.split(' ')[1];
      
      let decoded: { id: number, perfil: string };
      try {
        decoded = jwt.verify(token, SECRET) as { id: number, perfil: string };
      } catch (jwtError) {
        return res.status(401).json({ message: "Sessão expirada ou Token inválido. Faça login novamente." });
      }

      if (decoded.perfil === 'prestador') {
        const meusServicos = await db.select()
          .from(servicos)
          .where(eq(servicos.prestadorId, decoded.id));
        return res.json(meusServicos);
      }

      const todosOsServicos = await db.select().from(servicos);
      return res.json(todosOsServicos);

    } catch (error: any) {
      console.error("❌ ERRO AO LISTAR SERVIÇOS:", error);
      return res.status(500).json({ message: "Erro interno ao buscar serviços." });
    }
  }
};