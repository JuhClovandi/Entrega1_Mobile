import { Request, Response } from 'express';
import { db } from '../db';
import { servicos } from '../db/schema';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '';

export const ServiceController = {
  async createService(req: Request, res: Response) {
    try {
      const { nome, preco, tempo_estimado, descricao } = req.body;
      
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido. Faça login novamente." });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, SECRET) as { id: number, perfil: string };

      if (decoded.perfil !== 'prestador') {
        return res.status(403).json({ message: "Acesso negado: Apenas profissionais podem catalogar serviços." });
      }

      await db.insert(servicos).values({
        nome,
        preco,
        tempoEstimado: tempo_estimado,
        descricao,
        prestadorId: decoded.id
      });

      return res.status(201).json({ message: "Serviço catalogado com sucesso!" });

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO SALVAR SERVIÇO:");
      console.error(error);

      return res.status(500).json({ 
        message: "Erro interno ao salvar o serviço no banco de dados.", 
        error: error.message 
      });
    }
  }
};