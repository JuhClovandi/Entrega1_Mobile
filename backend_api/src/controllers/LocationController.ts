import { Request, Response } from 'express';
import { db } from '../db';
import { ufs, cidades } from '../db/schema';

export const LocationController = {
  // UF
  async listUFs(req: Request, res: Response) {
    const result = await db.select().from(ufs);
    res.json(result);
  },
  async createUF(req: Request, res: Response) {
    await db.insert(ufs).values(req.body);
    res.status(201).json({ message: "UF criada" });
  },

  // Cidades
  async listCidades(req: Request, res: Response) {
    const result = await db.select().from(cidades);
    res.json(result);
  },
  async createCidade(req: Request, res: Response) {
    await db.insert(cidades).values(req.body);
    res.status(201).json({ message: "Cidade criada" });
  }
};