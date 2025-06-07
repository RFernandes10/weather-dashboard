// cz-config.js
module.exports = {
  types: [
    { value: "feat", name: "feat:     Nova funcionalidade" },
    { value: "fix", name: "fix:      Correção de bug" },
    { value: "docs", name: "docs:     Apenas mudanças na documentação" },
    {
      value: "style",
      name: "style:    Formatação de código (sem alteração de lógica)",
    },
    {
      value: "refactor",
      name: "refactor:Refatoração de código (sem nova funcionalidade)",
    },
    { value: "test", name: "test:     Adição ou modificação de testes" },
    {
      value: "chore",
      name: "chore:    Atualização de tarefas, configs ou dependências",
    },
  ],
  scopes: [
    { name: "dashboard" },
    { name: "api" },
    { name: "chart" },
    { name: "ui" },
    { name: "toast" },
    { name: "tailwind" },
    { name: "icons" },
    { name: "config" },
    { name: "docs" },
  ],
  messages: {
    type: "Qual o tipo de alteração que você está fazendo?",
    scope: "Escolha o escopo da mudança (opcional):",
    customScope: "Defina um escopo personalizado:",
    subject: "Escreva uma descrição breve e imperativa:\n",
    body: "Descreva o que motivou essa mudança (opcional):\n",
    footer: "Referencie issues ou tickets relacionados (opcional):\n",
    confirmCommit: "Confirmar esse commit?",
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  skipQuestions: ["breaking"],
  subjectLimit: 72,
};
