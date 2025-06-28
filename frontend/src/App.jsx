import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AlimentoList from './components/AlimentoList'
import AlimentoDetail from './components/AlimentoDetail'
import AlimentoForm from './components/AlimentoForm'
import Profile from './components/Profile'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="logo">🍎 DietHub</h1>
            <nav className="nav">
              <Link 
                to="/"
                className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </Link>
              <Link 
                to="/alimentos"
                className={`nav-button ${activeTab === 'alimentos' ? 'active' : ''}`}
                onClick={() => setActiveTab('alimentos')}
              >
                Alimentos
              </Link>
              <button 
                className={`nav-button ${activeTab === 'meals' ? 'active' : ''}`}
                onClick={() => setActiveTab('meals')}
              >
                Refeições
              </button>
              <button 
                className={`nav-button ${activeTab === 'nutrition' ? 'active' : ''}`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrição
              </button>
              <Link 
                to="/profile"
                className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Perfil
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Rota para Dashboard */}
            <Route path="/" element={
              <div className="dashboard">
                <h2>Dashboard</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Calorias Hoje</h3>
                    <p className="stat-value">1,850</p>
                    <p className="stat-target">Meta: 2,000</p>
                  </div>
                  <div className="stat-card">
                    <h3>Proteínas</h3>
                    <p className="stat-value">85g</p>
                    <p className="stat-target">Meta: 120g</p>
                  </div>
                  <div className="stat-card">
                    <h3>Carboidratos</h3>
                    <p className="stat-value">220g</p>
                    <p className="stat-target">Meta: 250g</p>
                  </div>
                  <div className="stat-card">
                    <h3>Gorduras</h3>
                    <p className="stat-value">65g</p>
                    <p className="stat-target">Meta: 70g</p>
                  </div>
                </div>
              </div>
            } />

            {/* Rotas para Alimentos */}
            <Route path="/alimentos" element={<AlimentoList />} />
            <Route path="/alimentos/novo" element={<AlimentoForm />} />
            <Route path="/alimentos/:id" element={<AlimentoDetail />} />
            <Route path="/alimentos/:id/editar" element={<AlimentoForm />} />

            {/* Rota para Perfil */}
            <Route path="/profile" element={<Profile />} />

            {/* Outras rotas (mantidas como antes) */}
            <Route path="/meals" element={
              <div className="meals">
                <h2>Refeições</h2>
                <div className="meals-grid">
                  <div className="meal-card">
                    <h3>🍳 Café da Manhã</h3>
                    <p>Ovos, aveia, banana</p>
                    <span className="calories">450 cal</span>
                  </div>
                  <div className="meal-card">
                    <h3>🥗 Almoço</h3>
                    <p>Frango, arroz, legumes</p>
                    <span className="calories">650 cal</span>
                  </div>
                  <div className="meal-card">
                    <h3>🍎 Lanche</h3>
                    <p>Iogurte, nozes</p>
                    <span className="calories">200 cal</span>
                  </div>
                  <div className="meal-card">
                    <h3>🐟 Jantar</h3>
                    <p>Salmão, quinoa, vegetais</p>
                    <span className="calories">550 cal</span>
                  </div>
                </div>
              </div>
            } />

            <Route path="/nutrition" element={
              <div className="nutrition">
                <h2>Informações Nutricionais</h2>
                <div className="nutrition-chart">
                  <div className="macro-bar">
                    <div className="macro-label">Proteínas</div>
                    <div className="macro-progress">
                      <div className="macro-fill protein" style={{width: '70%'}}></div>
                    </div>
                    <div className="macro-value">85g / 120g</div>
                  </div>
                  <div className="macro-bar">
                    <div className="macro-label">Carboidratos</div>
                    <div className="macro-progress">
                      <div className="macro-fill carbs" style={{width: '88%'}}></div>
                    </div>
                    <div className="macro-value">220g / 250g</div>
                  </div>
                  <div className="macro-bar">
                    <div className="macro-label">Gorduras</div>
                    <div className="macro-progress">
                      <div className="macro-fill fats" style={{width: '93%'}}></div>
                    </div>
                    <div className="macro-value">65g / 70g</div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
