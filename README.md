# 🌦️ Weather Dashboard

Uma aplicação React para exibir previsões do tempo em tempo real, com gráficos interativos e design responsivo.

---

## 🎬 Demo

![Weather Dashboard Demo](https://user-images.githubusercontent.com/SEU_USUARIO/demo-weather.gif)

Ou acesse: [https://weather-dashboard.seusite.com](https://weather-dashboard.seusite.com)

---

## 📚 Sumário

- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Como executar](#-como-executar)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🚀 Tecnologias

- ⚛️ React 18
- 💨 Tailwind CSS
- 📊 Chart.js + react-chartjs-2
- 🌐 API OpenWeatherMap
- 🔔 React Hot Toast
- 🎨 React Icons
- 🛠️ PostCSS + Autoprefixer

---

## ✨ Funcionalidades

- 🔍 Busca de cidades
- 🌡️ Exibição de dados como temperatura, umidade, sensação térmica e vento
- 📊 Gráficos dinâmicos com dados meteorológicos
- 📱 Interface responsiva
- 🔔 Toasts para feedbacks e mensagens de erro

---

## ⚙️ Como executar

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/weather-dashboard.git

cd weather-dashboard

# Instale as dependências
npm install

# Crie o arquivo .env com base no .env.example
cp .env.example .env

# Inicie a aplicação
npm start

📂 Estrutura de pastas
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── index.jsx
├── .env.example
├── README.md
├── package.json
└── tailwind.config.js
