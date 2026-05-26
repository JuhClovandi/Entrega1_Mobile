import { Request, Response } from 'express';
import { db } from '../db';
import { usuarios, servicos } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'chave_reserva_segura';

if (!process.env.JWT_SECRET) {
  console.warn("AVISO: A variável JWT_SECRET não foi detectada no ambiente. Usando chave_reserva_segura.");
}

export const UserController = {
  // 1. Cadastro de Usuário Comum
  async registerUser(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    
    try {
      if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const emailFormatado = String(email).trim().toLowerCase();
      const hashedSenha = await bcrypt.hash(senha, 10);

      await db.insert(usuarios).values({ 
        nome, 
        email: emailFormatado, 
        senha: hashedSenha, 
        perfil: 'usuario' 
      }).run();

      const newUser = db.select().from(usuarios).where(eq(usuarios.email, emailFormatado)).get();

      if (!newUser) {
        return res.status(500).json({ message: "Erro ao recuperar usuário cadastrado." });
      }

      const token = jwt.sign(
        { id: newUser.id, perfil: newUser.perfil }, 
        SECRET, 
        { expiresIn: '1h' }
      );

      return res.status(201).json({ 
        message: "Usuário criado com sucesso!",
        token,
        perfil: newUser.perfil,
        nome: newUser.nome,
        email: newUser.email,
        categoria: ''
      });

    } catch (error: any) {
      console.error("Erro no registerUser:", error);
      if (error.message?.includes("UNIQUE") || error.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "Este e-mail já está cadastrado." });
      }
      return res.status(500).json({ message: "Erro interno ao salvar no banco.", error: error.message });
    }
  },

  async registerPro(req: Request, res: Response) {
    const { nome, email, senha, categoria, regiao } = req.body;
    
    try {
      if (!nome || !email || !senha || !categoria) {
        return res.status(400).json({ message: "Nome, e-mail, senha e categoria são obrigatórios." });
      }

      const emailFormatado = String(email).trim().toLowerCase();
      const hashedSenha = await bcrypt.hash(senha, 10);

      await db.insert(usuarios).values({ 
        nome, 
        email: emailFormatado, 
        senha: hashedSenha, 
        perfil: 'prestador',
        categoria,
        regiao
      }).run();

      const newPro = db.select().from(usuarios).where(eq(usuarios.email, emailFormatado)).get();

      if (!newPro) {
        return res.status(500).json({ message: "Erro ao recuperar profissional cadastrado." });
      }

      const token = jwt.sign(
        { id: newPro.id, perfil: newPro.perfil }, 
        SECRET, 
        { expiresIn: '1h' }
      );

      return res.status(201).json({ 
        message: "Profissional criado com sucesso!",
        token,
        perfil: newPro.perfil,
        nome: newPro.nome,
        email: newPro.email,
        categoria: newPro.categoria || ''
      });

    } catch (error: any) {
      console.error("Erro no registerPro:", error);
      if (error.message?.includes("UNIQUE") || error.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "Este e-mail já está cadastrado." });
      }
      return res.status(500).json({ message: "Erro interno ao salvar no banco.", error: error.message });
    }
  },

  // 3. Login Centralizado
  async login(req: Request, res: Response) {
    try {
      console.log("--> REQUISIÇÃO DE LOGIN RECEBIDA!");
      const { email, senha } = req.body;
      
      if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      }

      const emailBusca = String(email).trim().toLowerCase();
      const user = db.select().from(usuarios).where(eq(usuarios.email, emailBusca)).get();

      if (user && await bcrypt.compare(senha, user.senha)) {
        const token = jwt.sign(
          { id: user.id, perfil: user.perfil }, 
          SECRET, 
          { expiresIn: '1h' }
        );
        
        console.log("✅ Login realizado com sucesso para:", emailBusca);

        return res.json({ 
          token, 
          perfil: user.perfil,
          nome: user.nome,
          email: user.email,
          categoria: user.categoria || ''
        });
      }
      
      console.log("⚠️ Credenciais inválidas para:", emailBusca);
      return res.status(401).json({ message: "E-mail ou senha incorretos." });

    } catch (error: any) {
      console.error("❌ ERRO CRÍTICO NO MÉTODO DE LOGIN:", error);
      return res.status(500).json({ message: "Erro interno no servidor ao tentar fazer login." });
    }
  },

  // 4. Excluir Conta
  async deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "ID não fornecido" });

    // 1. Deleta serviços vinculados primeiro
    await db.delete(servicos).where(eq(servicos.prestadorId, Number(id))).run();
    
    // 2. Deleta o usuário
    const result = await db.delete(usuarios).where(eq(usuarios.id, Number(id))).run();

    if (result.changes === 0) return res.status(404).json({ message: "Usuário não encontrado" });

    return res.json({ message: "Conta excluída com sucesso" });
  } catch (error) {
    console.error("ERRO NO DELETE:", error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
},

  async updateUser(req: Request, res: Response) {
    const { email, nome, categoria } = req.body;

    try {
      const result = db.update(usuarios)
        .set({ nome, categoria })
        .where(eq(usuarios.email, String(email).trim().toLowerCase()))
        .run();

      if (result.changes === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      return res.json({ message: "Perfil updated com sucesso!" });
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao atualizar dados no servidor." });
    }
  }
};