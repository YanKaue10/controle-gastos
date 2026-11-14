# Controle de Gastos

Sistema simples de controle de despesas pessoais, feito com **Angular 21**, **TypeScript** e **Tailwind CSS**.
Os dados ficam salvos no **localStorage** do navegador, então continuam lá mesmo depois de fechar a página.

## Funcionalidades

- Cadastrar despesas com descrição, valor e categoria
- Listar as despesas cadastradas
- Filtrar as despesas por categoria
- Calcular o total gasto (geral e da categoria filtrada)
- Definir um orçamento do mês e ver quanto dele já foi usado
- Excluir despesas
- Layout responsivo (celular, tablet e computador)

## Componentes

Cada componente fica em sua própria pasta, dentro de `src/app/_components/`.

| Componente | Pasta | Onde é usado |
|---|---|---|
| Abas | `abas/` | Separa a tela em "Nova despesa", "Minhas despesas" e "Ajuda" |
| Menu Suspenso | `menu-suspenso/` | Filtro de categoria na lista de despesas |
| Paginação | `paginacao/` | Mostra a lista de 5 em 5 despesas |
| Barra de Progresso | `barra-progresso/` | Mostra quanto do orçamento já foi gasto |
| Acordeão | `acordeao/` | Perguntas frequentes na aba "Ajuda" |
| Notificação Toast | `notificacao-toast/` | Avisos de sucesso, erro e informação |

## Estrutura do projeto

```
src/app/
├── app.ts / app.html      → componente principal
├── app.config.ts          → configuração da aplicação
├── models/                → formato da despesa e lista de categorias
├── services/              → despesas (localStorage) e notificações
├── pipes/                 → formatação de moeda (R$) e data
└── _components/           → os 6 componentes visuais
```

A pasta `versao-angularjs/` guarda a primeira versão do sistema, feita em AngularJS.

## Como rodar o projeto

Requisitos: [Node.js](https://nodejs.org/) instalado.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor:

   ```bash
   npm start
   ```

3. Abra o navegador em `http://localhost:4200/`.

A página atualiza sozinha sempre que um arquivo é alterado.

## Gerar a versão final

```bash
npm run build
```

Os arquivos prontos ficam na pasta `dist/`.
