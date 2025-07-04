import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AlimentoList from './components/AlimentoList'
import AlimentoDetail from './components/AlimentoDetail'
import AlimentoForm from './components/AlimentoForm'
import Profile from './components/Profile'
import Refeicoes from './components/Refeicoes'
import Nutrition from './components/Nutrition'
import Login from './components/Login'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Função para login
  const setUser = (usuario) => {
    setUserState(usuario);
    if (usuario) {
      localStorage.setItem('user', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('user');
    }
  };

  if (!user) {
    return <Login onLogin={setUser} />
  }

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
              <Link
                to="/refeicoes"
                className={`nav-button ${activeTab === 'refeicoes' ? 'active' : ''}`}
                onClick={() => setActiveTab('refeicoes')}
              >
                Refeições
              </Link>
              <Link
                to="/nutrition"
                className={`nav-button ${activeTab === 'nutrition' ? 'active' : ''}`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrição
              </Link>
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

            {/* Rota para Refeições */}
            <Route path="/refeicoes" element={<Refeicoes />} />

            {/* Rota para Perfil */}
            <Route path="/profile" element={<Profile user={user} onLogout={() => setUser(null)} />} />

            {/* Rota para Nutrição */}
            <Route path="/nutrition" element={<Nutrition />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
