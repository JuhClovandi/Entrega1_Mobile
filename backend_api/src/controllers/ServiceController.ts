import { Request, Response } from 'express';
import { db } from '../db';
import { servicos } from '../db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

// 🔑 AGORA IGUAL AO SEU AUTHMIDDLEWARE: Se não houver JWT_SECRET no .env, usa "123"
const SECRET = process.env.JWT_SECRET || '123';

export const ServiceController = {
  // Criar Serviço (Apenas Prestador)
  async createService(req: Request, res: Response) {
    try {
      const { nome, preco, tempo_estimado, descricao } = req.body;
      
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido. Faça login novamente." });
      }

      const token = authHeader.split(' ')[1];
      
      // 🔒 Validação usando a chave correta ("123")
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

  // Deletar Serviço (Apenas Prestador)
  async deleteService(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      
      await db.delete(servicos)
        .where(eq(servicos.id, Number(id)))
        .run();
      
      return res.json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      console.error("ERRO NO DELETE:", error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  // Listar Serviços (Aberto para Clientes e Prestadores)
  async listAllServices(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });

      const token = authHeader.split(' ')[1];
      
      // 🔒 Validação usando a chave correta ("123")
      let decoded: { id: number, perfil: string };
      try {
        decoded = jwt.verify(token, SECRET) as { id: number, perfil: string };
      } catch (jwtError) {
        return res.status(401).json({ message: "Sessão expirada ou Token inválido. Faça login novamente." });
      }

      // Se for PRESTADOR, traz apenas os serviços criados por ele
      if (decoded.perfil === 'prestador') {
        const meusServicos = await db.select()
          .from(servicos)
          .where(eq(servicos.prestadorId, decoded.id));
        return res.json(meusServicos);
      }

      // Se for CLIENTE, traz TODOS os serviços cadastrados no sistema para ele contratar
      const todosOsServicos = await db.select().from(servicos);
      return res.json(todosOsServicos);

    } catch (error: any) {
      console.error("❌ ERRO AO LISTAR SERVIÇOS:", error);
      return res.status(500).json({ message: "Erro interno ao buscar serviços." });
    }
  }
};