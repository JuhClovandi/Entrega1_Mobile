# ServLink 🚀

> **🎓 Projeto Acadêmico**
> 
> Este é um projeto acadêmico desenvolvido por:
> **Alice Xavier, Gustavo Xavier, Júlia Clovandi, Luis Felipe e Yuri Clovandi**.

O **ServLink** é um aplicativo mobile focado em conectar clientes que precisam de serviços variados (limpeza, manutenção, tecnologia, aulas, saúde, beleza, etc.) a profissionais qualificados da sua região. 

Este projeto é desenvolvido utilizando o ecossistema moderno de desenvolvimento mobile multiplataforma: **React Native, Expo e TypeScript**.

---

## 📱 Telas e Funcionalidades Implementadas

O aplicativo atende 100% aos requisitos de prototipagem definidos, possuindo as seguintes telas e fluxos:

- **SplashScreen**: Inicialização nativa e animada com a marca ServLink.
- **Welcome**: Tela de boas-vindas com chamada para ação primária e secundária.
- **Seleção de Perfil (UserType)**: Fluxo que divide a experiência entre "Cliente" e "Profissional".
- **Login**: Tela de autenticação com validação de formato e controle de visibilidade da senha.
- **Cadastro (Register)**: Formulário dinâmico. Profissionais possuem campos adicionais como "Categoria" (com menu dropdown estilizado). Validação de campos e senhas.
- **Recuperação de Senha (ForgotPassword)**: Fluxo seguro dividido em 2 etapas (Envio de e-mail e Redefinição da senha).
- **Home**: A tela principal da aplicação. Traz um layout robusto com:
  - Barra de pesquisa.
  - Grid interativo de categorias de serviços.
  - Carrossel horizontal com profissionais em destaque.
  - Lista vertical de profissionais ordenados por proximidade.
  - Barra de navegação (Bottom Tab Bar) inferior.

---

## 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**: Framework para construção de interfaces nativas.
- **[Expo](https://expo.dev/)**: Plataforma que facilita o desenvolvimento, build e deploy de apps React Native.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática, garantindo segurança e menos bugs no código.
- **[React Navigation](https://reactnavigation.org/)**: Biblioteca padrão para navegação e roteamento dentro do app.

---

## 📂 Estrutura do Projeto

```text
serv-link/
├── App.tsx                    # Ponto de entrada do App, controla Navegação e SplashScreen
├── app.json                   # Configurações do Expo (ícones, splash, pacotes)
├── src/                       # Código-fonte da aplicação
│   ├── components/            # Componentes reutilizáveis
│   │   └── ServLinkLogo.tsx   # Componente global do logo e ícone do app
│   ├── ForgotPasswordScreen.tsx 
│   ├── HomeScreen.tsx         
│   ├── LoginScreen.tsx        
│   ├── RegisterScreen.tsx     
│   ├── UserTypeScreen.tsx     
│   └── WelcomeScreen.tsx      
├── assets/                    # Imagens estáticas, fontes, ícones base
└── tsconfig.json              # Configurações do compilador TypeScript
```

---

## 🏃 Como rodar o projeto localmente

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** instalado na sua máquina (preferencialmente versão 20 LTS ou superior) e o **Git**.

Você também precisará instalar o aplicativo **Expo Go** no seu celular, disponível na [App Store](https://apps.apple.com/br/app/expo-go/id982107779) (iOS) ou [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android).

### 2. Instalação

Clone o repositório e acesse a pasta do projeto:
```bash
cd serv-link-master
```

Instale as dependências usando NPM ou Yarn:
```bash
npm install
```

### 3. Executando o Servidor de Desenvolvimento

Para iniciar o Metro Bundler do Expo, execute:
```bash
npm start
```

Isso abrirá um menu no seu terminal exibindo um **QR Code**. 

- **No Celular**: Abra a câmera do seu iOS (ou app Expo Go no Android), leia o QR Code e o aplicativo será construído na mesma hora na sua tela.
- **No Emulador**: Se você tiver o Xcode (Mac) ou Android Studio instalados, basta pressionar `i` (iOS) ou `a` (Android) no terminal.

> **Problemas de Rede?**
> Caso o Expo Go não consiga se conectar devido a firewalls ou restrições de roteador (erro de network), você pode iniciar o projeto em modo túnel:
> ```bash
> npm start -- --tunnel
> ```

---

## 🎨 Protótipo e Design System

A interface do projeto foi desenvolvida para refletir o protótipo UX/UI desenhado previamente. Ele utiliza uma paleta de cores limpa, botões com sombras (elevation) sutis, cantos arredondados modernos (border-radius consistentes) e ícones nativos/emojis otimizados, garantindo o melhor "Look and Feel" aos usuários de ambas as pontas (clientes e profissionais).
