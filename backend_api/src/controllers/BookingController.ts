import { Request, Response } from 'express';
import { db } from '../db';
import { servicos, agendamentos } from '../db/schema';
import { eq, and, or } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '123';

export const BookingController = {
  async createBooking(req: Request, res: Response) {
    try {
      const { servicoId, horario } = req.body;
      
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

      if (!servicoId || !horario) {
        return res.status(400).json({ message: "Dados incompletos para realizar o agendamento." });
      }

      const horarioStr = String(horario).trim();
      const idServicoNum = Number(servicoId);

      const conflitoHorario = await db.select()
        .from(agendamentos)
        .where(
          and(
            eq(agendamentos.servicoId, idServicoNum),
            eq(agendamentos.horario, horarioStr)
          )
        );

      if (conflitoHorario && conflitoHorario.length > 0) {
        return res.status(400).json({ 
          message: "Este horário já foi agendado por outro cliente! Por favor, escolha outro horário." 
        });
      }

      await db.insert(agendamentos).values({
        servicoId: idServicoNum,
        clienteId: decoded.id,
        horario: horarioStr,
        status: 'agendado'
      }).run();

      return res.status(201).json({ message: "Agendamento realizado com sucesso!" });

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO AGENDAR SERVIÇO:", error);
      return res.status(500).json({ 
        message: "Erro interno ao processar o agendamento.", 
        error: error.message 
      });
    }
  },

  async listMyBookings(req: Request, res: Response) {
    try {
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

      const meusAgendamentos = await db.select({
        id: agendamentos.id,
        horario: agendamentos.horario,
        status: agendamentos.status,
        nomeServico: servicos.nome
      })
      .from(agendamentos)
      .innerJoin(servicos, eq(agendamentos.servicoId, servicos.id))
      .where(
        or(
          eq(agendamentos.clienteId, decoded.id),
          eq(servicos.prestadorId, decoded.id)
        )
      );

      return res.json(meusAgendamentos);

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO LISTAR AGENDAMENTOS:", error);
      return res.status(500).json({ message: "Erro interno no servidor ao buscar agendamentos." });
    }
  },

  async cancelBooking(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ message: "ID do agendamento não fornecido." });
      }

      const bookingId = Number(id);
      console.log(`--> 🔴 REMOVENDO AGENDAMENTO DE ID: ${bookingId}`);

      // Executa o delete direto no banco
      await db.delete(agendamentos)
        .where(eq(agendamentos.id, bookingId))
        .run();

      // Retornamos sucesso direto. Se o ID não existisse, o SQLite apenas executa sem afetar linhas.
      return res.json({ message: "Agendamento cancelado com sucesso!" });

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO CANCELAR AGENDAMENTO:", error);
      return res.status(500).json({ 
        message: "Erro interno no servidor ao tentar cancelar agendamento.",
        error: error.message 
      });
    }
  }
};