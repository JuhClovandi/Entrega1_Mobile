// import request from 'supertest';
// // Imagine que 'app' é a instância do seu express exportada do server.ts
// // Para testar, precisamos exportar o 'app' de lá (vou te mostrar como abaixo)
// import { app } from '../server'; 

// describe('Fluxo de Autenticação', () => {
//   let token = '';

//   // Teste 1: Cadastro
//   it('Deve cadastrar um novo usuário', async () => {
//     const response = await request(app)
//       .post('/api/register')
//       .send({
//         nome: "Mentor Teste",
//         email: "mentor@teste.com",
//         senha: "123",
//         perfil: "usuario"
//       });
    
//     expect(response.status).toBe(201);
//   });

//   // Teste 2: Login e captura de Token
//   it('Deve fazer login e retornar um token JWT', async () => {
//     const response = await request(app)
//       .post('/api/login')
//       .send({
//         email: "mentor@teste.com",
//         senha: "123"
//       });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('token');
//     token = response.body.token; // Guardamos para o próximo teste
//   });

//   // Teste 3: Proteção de Rota
//   it('Não deve permitir acesso às UFs sem token', async () => {
//     const response = await request(app).get('/api/ufs');
//     expect(response.status).toBe(401);
//   });
// });

import request from 'supertest';
import { app } from '../server';

describe('Fluxo Completo de Autenticação e CRUD', () => {
  let token = '';
  let ufId: number;

  // =====================================
  // BLOCO 1: Testes de Autenticação (3/3) ✅ IMPLEMENTADOS
  // =====================================
  
  describe('Autenticação', () => {
    // Teste 1: Cadastro ✅
    it('Deve cadastrar um novo usuário', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          nome: "Mentor Teste",
          email: "mentor@teste.com",
          senha: "123",
          perfil: "usuario"
        });
      
      expect(response.status).toBe(201);
    });

    // Teste 2: Login e captura de Token ✅
    it('Deve fazer login e retornar um token JWT', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: "mentor@teste.com",
          senha: "123"
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token; // Guardamos para os próximos testes
    });

    // Teste 3: Proteção de Rota (sem token) ✅
    it('Não deve permitir acesso às UFs sem token', async () => {
      const response = await request(app).get('/api/ufs');
      expect(response.status).toBe(401);
    });
  });

  // =====================================
  // BLOCO 2: Testes de Acesso Protegido (1/2) ❌ FALTANDO
  // =====================================

  describe('Acesso Protegido', () => {
    // Teste 4: Acesso com Token ❌ FALTANDO
    it('Deve retornar lista vazia de UFs com token válido', async () => {
      const response = await request(app)
        .get('/api/ufs')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    // Teste com Token Inválido ❌ RECOMENDADO
    it('Deve rejeitar requisição com token inválido', async () => {
      const response = await request(app)
        .get('/api/ufs')
        .set('Authorization', 'Bearer token_invalido_123');
      
      expect(response.status).toBe(401);
    });
  });

  // =====================================
  // BLOCO 3: Testes de Criação de Dados (0/2) ❌ FALTANDO
  // =====================================

  describe('Criação de Dados (CRUD)', () => {
    // Teste 5: Criar UF ❌ FALTANDO CRÍTICO
    it('Deve criar uma UF com token válido', async () => {
      const response = await request(app)
        .post('/api/ufs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          sigla: "SP",
          nome: "São Paulo"
        });
      
      expect(response.status).toBe(201);
      ufId = response.body.id || 1; // Salva o ID para criar cidade depois
    });

    // Teste 6: Criar Cidade ❌ FALTANDO
    it('Deve criar uma Cidade com token válido', async () => {
      const response = await request(app)
        .post('/api/cidades')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: "Campinas",
          uf_id: ufId || 1
        });
      
      expect(response.status).toBe(201);
    });

    // Teste: Listar Cidades ❌ RECOMENDADO
    it('Deve retornar lista de cidades criadas', async () => {
      const response = await request(app)
        .get('/api/cidades')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // =====================================
  // BLOCO 4: Testes de Validação e Erros (0/5) ❌ FALTANDO
  // =====================================

  describe('Validação de Dados', () => {
    // Teste 7: Email Duplicado ❌ FALTANDO
    it('Deve rejeitar cadastro com email duplicado', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          nome: "Outro Usuário",
          email: "mentor@teste.com", // Email que já existe
          senha: "123",
          perfil: "usuario"
        });
      
      expect(response.status).toBeGreaterThanOrEqual(400);
      // Pode ser 400, 409 (Conflict), ou outro status de erro
    });

    // Teste 8: Credenciais Inválidas ❌ FALTANDO
    it('Deve rejeitar login com senha incorreta', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: "mentor@teste.com",
          senha: "senha_errada"
        });
      
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    // Teste 9: Email Inválido ❌ FALTANDO
    it('Deve rejeitar login com email que não existe', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: "nao_existe@teste.com",
          senha: "123"
        });
      
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    // Teste 10: Campos Obrigatórios ❌ FALTANDO
    it('Deve rejeitar cadastro sem campo obrigatório', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          email: "user@teste.com",
          // Faltam: nome, senha, perfil
        });
      
      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    // Teste 11: Sigla Duplicada em UF ❌ FALTANDO
    it('Deve rejeitar criação de UF com sigla duplicada', async () => {
      // Tentar criar outra UF com sigla "SP"
      const response = await request(app)
        .post('/api/ufs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          sigla: "SP", // Já existe
          nome: "São Paulo Duplicada"
        });
      
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
