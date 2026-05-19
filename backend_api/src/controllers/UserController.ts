import { Request, Response } from 'express';
import { db } from '../db';
import { usuarios } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

// Validação de segurança para garantir que a variável do .env foi carregada
if (!SECRET) {
  console.warn("AVISO: A variável JWT_SECRET não foi detectada no ambiente. Garanta que iniciou com --env-file.");
}

export const UserController = {
  // 1. Cadastro de Usuário Comum
  async registerUser(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    
    try {
      const hashedSenha = await bcrypt.hash(senha, 10);

      db.insert(usuarios).values({ 
        nome, 
        email, 
        senha: hashedSenha, 
        perfil: 'usuario' 
      }).run();

      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error: any) {
      console.error("Erro no registerUser:", error);
      
      // Se o erro for de e-mail duplicado (Constraint do SQLite), avisamos o usuário
      if (error.message?.includes("UNIQUE") || error.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "Este e-mail já está cadastrado." });
      }

      // Se for qualquer outro erro (ex: tabela inexistente), devolvemos o erro real
      return res.status(500).json({ 
        message: "Erro interno ao salvar no banco.", 
        error: error.message 
      });
    }
  },

  // 2. Cadastro de Profissional / Prestador
  async registerPro(req: Request, res: Response) {
    const { nome, email, senha, categoria, regiao } = req.body;
    
    try {
      const hashedSenha = await bcrypt.hash(senha, 10);

      db.insert(usuarios).values({ 
        nome, 
        email, 
        senha: hashedSenha, 
        perfil: 'prestador',
        categoria,
        regiao
      }).run();

      return res.status(201).json({ message: "Profissional criado com sucesso!" });
    } catch (error: any) {
      console.error("Erro no registerPro:", error);

      if (error.message?.includes("UNIQUE") || error.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "Este e-mail já está cadastrado." });
      }

      return res.status(500).json({ 
        message: "Erro interno ao salvar no banco.", 
        error: error.message 
      });
    }
  },

  // 3. Login Centralizado
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      
      const user = db.select().from(usuarios).where(eq(usuarios.email, email)).get();

      if (user && await bcrypt.compare(senha, user.senha)) {
        const token = jwt.sign(
          { id: user.id, perfil: user.perfil }, 
          SECRET || '', 
          { expiresIn: '1h' }
        );
        
        return res.json({ token, perfil: user.perfil });
      }
      
      return res.status(401).json({ message: "Credenciais inválidas" });
    } catch (error: any) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno no servidor", error: error.message });
    }
  }
};