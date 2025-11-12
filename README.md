# WeatherApp

Aplicação simples de previsão do tempo, criada para demonstrar integração com APIs de clima, busca por cidade e apresentação de resultado de forma amigável.

---

## 🚀 Tecnologias Utilizadas

- React (ou a biblioteca/framework que você usou)  
- TypeScript (se aplicável)  
- CSS / SCSS / Tailwind (ou o que você tiver usado)  
- API de clima externa (ex: OpenWeatherMap)  

---

## ⚙️ Funcionalidades

- 🔍 Busca de clima por nome da cidade  
- 🌍 Possibilidade de obter clima da localização atual (se implementado)  
- 📊 Exibição de dados como: temperatura, umidade, vento, etc.  
- 🧩 Interface responsiva para mobile e desktop  

---

## 🗂️ Estrutura do Projeto

WeatherApp/
│
├── public/ # Arquivos estáticos
├── src/ # Código fonte
│ ├── components/ # Componentes reutilizáveis
│ ├── pages/ # Páginas (se for Next.js)
│ ├── services/ # Integração com APIs
│ └── styles/ # Estilos
├── .env # Variáveis de ambiente (API key etc)
└── package.json

---

![Imagem do WhatsApp de 2025-11-12 à(s) 12 30 03_67e24f1b](https://github.com/user-attachments/assets/9de352e4-8682-4d8e-9a0e-aea45c847011)


--- 

## 🔧 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js instalado  
- API key da plataforma de clima (ex: OpenWeatherMap)  

### 1️⃣ Clonar o repositório  
```bash
git clone https://github.com/pedrocaniato/WeatherApp.git
cd WeatherApp
```

### 2️⃣ Instalar dependências
```bash
npm install
# ou
yarn install
```
### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env na raiz com algo como:

```bash
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 4️⃣ Rodar o aplicativo

```bash
npm run start
# ou
yarn start
```

Acesse em http://localhost:3000 (ou outra porta configurada).

🧪 Teste Rápido

Digite o nome de uma cidade no campo de busca e pressione Enter.

Verifique se os dados do clima aparecem corretamente (temperatura, umidade, vento etc).

Se a localização automática estiver habilitada, permita permissão e veja se o clima local aparece.

## 🧭 Próximos Passos

- 🔐 **Adicionar autenticação ou histórico de buscas**
- 📅 **Exibir previsão para os próximos dias**
- 🌐 **Suporte a múltiplos idiomas/localizações**  
- 🧪 **Escrever testes unitários e de integração**  
- 🚀 **Preparar versão de produção, com build otimizado


Pedro Caniato
📧 pedrolucascaniato@gmail.com

🔗 github.com/pedrocaniato




