import { Request, Response } from 'express';
import { db } from '../db';
import { servicos } from '../db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'chave_reserva_segura';

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
        tempoEstimado: tempo_estimado, // Mapeado de acordo com seu schema camelCase
        descricao,
        prestadorId: decoded.id
      }).run();

      return res.status(201).json({ message: "Serviço catalogado com sucesso!" });

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO SALVAR SERVIÇO:");
      console.error(error);

      return res.status(500).json({ 
        message: "Erro interno ao salvar o serviço no banco de dados.", 
        error: error.message 
      });
    }
  },
async deleteService(req: Request, res: Response) {
  try {
    const { id } = req.params; 
    
    const result = await db.delete(servicos)
      .where(eq(servicos.id, Number(id)))
      .run();
    
    return res.json({ message: "Serviço excluído com sucesso!" });
  } catch (error) {
    console.error("ERRO NO DELETE:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
},

async listProServices(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET) as { id: number, perfil: string };

    if (decoded.perfil !== 'prestador') {
      return res.status(403).json({ message: "Acesso negado." });
    }

    const meusServicos = await db.select()
      .from(servicos)
      .where(eq(servicos.prestadorId, decoded.id));

    return res.json(meusServicos);
  } catch (error: any) {
    console.error("❌ ERRO:", error);
    return res.status(500).json({ message: "Erro interno." });
  }
}
};