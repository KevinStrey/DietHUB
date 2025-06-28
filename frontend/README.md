# DietHub Frontend

Interface gráfica React.js para o sistema DietHub com funcionalidades CRUD completas.

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
│   │   └── AlimentoForm.css      # Estilos do formulário
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

#### 1. **Lista de Alimentos** (`/alimentos`)
- ✅ Exibe todos os alimentos cadastrados
- ✅ Busca em tempo real por nome
- ✅ Cards com informações nutricionais
- ✅ Botões de ação (Ver, Editar, Excluir)

#### 2. **Detalhes do Alimento** (`/alimentos/:id`)
- ✅ Visualização completa das informações
- ✅ Cards visuais para macronutrientes
- ✅ Resumo nutricional detalhado
- ✅ Botões de ação (Editar, Excluir)

#### 3. **Adicionar Alimento** (`/alimentos/novo`)
- ✅ Formulário completo com validação
- ✅ Campos para nome, calorias, proteínas, carboidratos, gorduras
- ✅ Validação em tempo real
- ✅ Feedback visual de erros

#### 4. **Editar Alimento** (`/alimentos/:id/editar`)
- ✅ Formulário pré-preenchido com dados existentes
- ✅ Mesma validação do formulário de adição
- ✅ Atualização em tempo real

#### 5. **Excluir Alimento**
- ✅ Modal de confirmação
- ✅ Exclusão segura com confirmação
- ✅ Atualização automática da lista

#### 6. **Busca de Alimentos**
- ✅ Campo de busca em tempo real
- ✅ Filtragem por nome do alimento
- ✅ Interface responsiva

### 🏠 Outras Funcionalidades
- **Dashboard**: Visão geral das estatísticas nutricionais
- **Refeições**: Gerenciamento de refeições diárias
- **Nutrição**: Análise detalhada de macronutrientes
- **Perfil**: Informações do usuário

## 🎨 Design

Interface moderna com:
- Design responsivo para mobile e desktop
- Gradientes e efeitos de vidro (glassmorphism)
- Animações suaves e transições
- Paleta de cores consistente
- Loading states e feedback visual
- Modais e confirmações elegantes

## 🔌 API Endpoints Utilizados

- `GET /api/alimentos` - Listar todos os alimentos
- `GET /api/alimentos/{id}` - Buscar alimento por ID
- `POST /api/alimentos` - Criar novo alimento
- `PUT /api/alimentos/{id}` - Atualizar alimento
- `DELETE /api/alimentos/{id}` - Excluir alimento

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

## 🚀 Próximos Passos

- [ ] Implementar autenticação de usuários
- [ ] Adicionar gráficos e visualizações
- [ ] Implementar gestão de refeições
- [ ] Adicionar histórico nutricional
- [ ] Implementar metas e objetivos
