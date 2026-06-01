import { Request, Response } from 'express';
import { db } from '../db';
import { servicos, agendamentos } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '123';

export const BookingController = {
  // Criar Agendamento com validação correta de choque de horário
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

      // 🔍 Busca se JÁ EXISTE um agendamento igual para este serviço nesse horário
      const conflitoHorario = await db.select()
        .from(agendamentos)
        .where(
          and(
            eq(agendamentos.servicoId, idServicoNum),
            eq(agendamentos.horario, horarioStr)
          )
        );

      // 🚀 CORREÇÃO CRÍTICA: Só barra se o array REALMENTE contiver um registro idêntico
      if (conflitoHorario && conflitoHorario.length > 0) {
        return res.status(400).json({ 
          message: "Este horário já foi agendado por outro cliente! Por favor, escolha outro horário." 
        });
      }

      // 📝 Se o array veio vazio, o horário está LIVRE! Gravando no banco sem o método .run()
      await db.insert(agendamentos).values({
        servicoId: idServicoNum,
        clienteId: decoded.id,
        horario: horarioStr,
        status: 'agendado'
      });

      return res.status(201).json({ message: "Agendamento realizado com sucesso!" });

    } catch (error: any) {
      console.error("❌ ERRO NO BACKEND AO AGENDAR SERVIÇO:", error);
      return res.status(500).json({ 
        message: "Erro interno ao processar o agendamento.", 
        error: error.message 
      });
    }
  }
};