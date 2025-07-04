# DietHub Frontend

Interface gráfica React.js para o sistema DietHub, focada em controle nutricional, refeições e alimentos.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend Spring Boot rodando na porta 8080

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

### Acesso
O frontend estará disponível em: http://localhost:3000

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── AlimentoList.jsx      # Lista de alimentos com busca
│   │   ├── AlimentoList.css      # Estilos da lista
│   │   ├── AlimentoDetail.jsx    # Detalhes de um alimento
│   │   ├── AlimentoDetail.css    # Estilos dos detalhes
│   │   ├── AlimentoForm.jsx      # Formulário para adicionar/editar
│   │   ├── Refeicoes.jsx         # Gerenciamento de refeições
│   │   ├── Refeicoes.css         # Estilos das refeições
│   │   ├── Nutrition.jsx         # Resumo nutricional diário
│   │   ├── Profile.jsx           # Perfil do usuário
│   ├── App.jsx                   # Componente principal com roteamento
│   ├── App.css                   # Estilos da aplicação
│   ├── main.jsx                  # Ponto de entrada
│   └── index.css                 # Estilos globais
├── public/                       # Arquivos estáticos
└── package.json                  # Dependências e scripts
```

## 🔧 Configuração

O projeto está configurado para se comunicar com o backend Spring Boot na porta 8080 através do proxy do Vite.

## 📱 Funcionalidades Implementadas

### 🍎 Gestão de Alimentos (CRUD Completo)
- Listagem de alimentos cadastrados
- Busca em tempo real por nome
- Visualização detalhada de cada alimento
- Adição, edição e exclusão de alimentos com validação de dados

### 🍽️ Gestão de Refeições
- Cadastro de refeições diárias para o usuário logado
- Adição de múltiplos alimentos em cada refeição, com quantidade em gramas
- Edição e exclusão de refeições
- Atualização automática do histórico nutricional ao modificar refeições
- Visualização das refeições do dia selecionado

### 🥗 Nutrição (Resumo Diário)
- Exibição dos totais diários de calorias, proteínas, carboidratos e gorduras
- Resumo visual dos macronutrientes consumidos no dia
- Navegação por datas para consultar o histórico nutricional

### 👤 Perfil do Usuário
- Visualização dos dados do usuário logado
- Exibição de metas nutricionais diárias
- Opção de logout

## 🎨 Design

Interface moderna com:
- Design responsivo para mobile e desktop
- Gradientes e efeitos de vidro (glassmorphism)
- Animações suaves e transições
- Paleta de cores consistente
- Loading states e feedback visual
- Modais e confirmações elegantes
- Botões com efeito de sombra

## 🔌 API Endpoints Utilizados

- `GET /api/alimentos` - Listar todos os alimentos
- `GET /api/alimentos/{id}` - Buscar alimento por ID
- `POST /api/alimentos` - Criar novo alimento
- `PUT /api/alimentos/{id}` - Atualizar alimento
- `DELETE /api/alimentos/{id}` - Excluir alimento
- `GET /api/refeicoes/usuario/{usuarioId}` - Listar refeições do usuário
- `POST /api/refeicoes` - Criar refeição
- `PUT /api/refeicoes/{id}` - Atualizar refeição
- `DELETE /api/refeicoes/{id}` - Excluir refeição
- `GET /api/historico/usuario/{usuarioId}/data/{data}` - Buscar resumo nutricional diário

## 🛠️ Tecnologias Utilizadas

- **React.js** - Framework principal
- **Vite** - Build tool e dev server
- **React Router** - Navegação e roteamento
- **Axios** - Cliente HTTP para API
- **CSS3** - Estilização moderna
- **JavaScript ES6+** - Funcionalidades avançadas

## 📱 Responsividade

A interface é totalmente responsiva e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🗄️ Configuração do Banco de Dados

O backend espera um banco de dados PostgreSQL com as seguintes configurações (veja em `hub/src/main/resources/application.properties`):

- **Host:** localhost
- **Porta:** 5432
- **Nome do banco:** diethub
- **Usuário:** postgres
- **Senha:** aluno

Exemplo de configuração:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/diethub
spring.datasource.username=postgres
spring.datasource.password=aluno
```

O Hibernate está configurado para atualizar o schema automaticamente:
```
spring.jpa.hibernate.ddl-auto=update
```

## 🌱 Seed Inicial do Banco de Dados

Para facilitar os testes, há um script SQL de seed localizado em:

- `frontend/alimentos_refeicoes_seed.sql`

Esse script:
- Cria dois usuários (admin e user)
- Popula a tabela de alimentos com 20 exemplos
- Cria refeições e itens de refeição para vários dias

**Como usar:**
1. Certifique-se de que o banco de dados `diethub` existe e está vazio.
2. Execute o script no seu PostgreSQL:
   - Via linha de comando:
     ```
     psql -U postgres -d diethub -f frontend/alimentos_refeicoes_seed.sql
     ```
   - Ou usando uma ferramenta gráfica (DBeaver, PgAdmin, etc).

Pronto! O banco estará populado para uso imediato no app DietHub.
