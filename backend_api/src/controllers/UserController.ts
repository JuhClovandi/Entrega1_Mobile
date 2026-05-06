import { Request, Response } from 'express';
import { db } from '../db';
import { usuarios } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = "seu_segredo_aqui";

export const UserController = {
  async register(req: Request, res: Response) {
    const { nome, email, senha, perfil } = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);
    
    try {
      await db.insert(usuarios).values({ nome, email, senha: hashedSenha, perfil });
      res.status(201).json({ message: "Usuário criado" });
    } catch (error) {
      res.status(400).json({ error: "Email já cadastrado" });
    }
  },

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    const user = await db.query.usuarios.findFirst({ where: eq(usuarios.email, email) });

    if (user && await bcrypt.compare(senha, user.senha)) {
      const token = jwt.sign({ id: user.id, perfil: user.perfil }, SECRET, { expiresIn: '1h' });
      return res.json({ token, perfil: user.perfil });
    }
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};