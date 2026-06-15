import { Request, Response } from 'express';
import { db } from '../db';
import { usuarios, servicos, agendamentos } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'chave_reserva_segura';

if (!process.env.JWT_SECRET) {
  console.warn("AVISO: A variável JWT_SECRET não foi detectada no ambiente. Usando chave_reserva_segura.");
}

export const UserController = {
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
          id: user.id,
          perfil: user.perfil,
          nome: user.nome,
          email: user.email,
          categoria: user.categoria || '',
          biografia: user.biografia || '', // 🟢 AGORA O LOGIN RETORNA A BIOGRAFIA DO BANCO
          fotoPerfil: user.fotoPerfil || null // 🟢 RETORNA A FOTO DO BANCO
        });
      }
      
      console.log("⚠️ Credenciais inválidas para:", emailBusca);
      return res.status(401).json({ message: "E-mail ou senha incorretos." });

    } catch (error: any) {
      console.error("❌ ERRO CRÍTICO NO MÉTODO DE LOGIN:", error);
      return res.status(500).json({ message: "Erro interno no servidor ao tentar fazer login." });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ message: "ID não fornecido" });

      const userId = Number(id);
      console.log(`--> 🔴 INICIANDO CASCADE MANUAL PARA O USUÁRIO ID: ${userId}`);

      await db.delete(agendamentos).where(eq(agendamentos.clienteId, userId)).run();
      console.log("--> 🟢 Agendamentos como cliente removidos.");

      const servicosDoPrestador = db.select({ id: servicos.id })
        .from(servicos)
        .where(eq(servicos.prestadorId, userId))
        .all();

      const idsServicos = servicosDoPrestador.map(s => s.id);

      if (idsServicos.length > 0) {
        for (const servicoId of idsServicos) {
          await db.delete(agendamentos).where(eq(agendamentos.servicoId, servicoId)).run();
        }
        console.log("--> 🟢 Agendamentos vinculados aos serviços do prestador removidos.");
      }

      await db.delete(servicos).where(eq(servicos.prestadorId, userId)).run();
      console.log("--> 🟢 Serviços do prestador limpos.");

      const result = await db.delete(usuarios).where(eq(usuarios.id, userId)).run();
      console.log(`--> 🟢 Remoção concluída com sucesso. Linhas alteradas: ${result.changes}`);

      if (result.changes === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.json({ message: "Conta excluída com sucesso" });

    } catch (error: any) {
      console.error("❌ ERRO INTERNO DO SQLITE NO PROCESSO DE EXCLUSÃO:", error);
      return res.status(500).json({ 
        message: "Erro no servidor", 
        error: error.message 
      });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido." });

      const token = authHeader.split(' ')[1];
      let decoded: { id: number, perfil: string };
      try {
        decoded = jwt.verify(token, SECRET) as { id: number, perfil: string };
      } catch {
        return res.status(401).json({ message: "Token inválido." });
      }

      // ✅ Adicionado biografia na desestruturação
      const { nome, categoria, fotoPerfil, biografia } = req.body;

      if (!nome?.trim()) {
        return res.status(400).json({ message: "O nome não pode ficar vazio." });
      }

      const camposAtualizados: Record<string, any> = { nome: nome.trim() };
      if (categoria !== undefined) camposAtualizados.categoria = categoria;
      if (fotoPerfil !== undefined) camposAtualizados.fotoPerfil = fotoPerfil;
      if (biografia !== undefined) camposAtualizados.biografia = biografia;

      const result = db.update(usuarios)
        .set(camposAtualizados)
        .where(eq(usuarios.id, decoded.id))
        .run();

      if (result.changes === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const userAtualizado = db.select().from(usuarios).where(eq(usuarios.id, decoded.id)).get();

      return res.json({ 
        message: "Perfil atualizado com sucesso!",
        nome: userAtualizado?.nome,
        categoria: userAtualizado?.categoria || '',
        fotoPerfil: userAtualizado?.fotoPerfil || null,
        biografia: userAtualizado?.biografia || '' // ✅ Retorna a biografia atualizada
      });

    } catch (error: any) {
      console.error("❌ ERRO AO ATUALIZAR PERFIL:", error);
      return res.status(500).json({ message: "Erro ao atualizar dados no servidor.", error: error.message });
    }
  }
};