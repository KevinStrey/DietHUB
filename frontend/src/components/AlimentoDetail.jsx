import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AlimentoDetail.css';

function AlimentoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alimento, setAlimento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlimento();
  }, [id]);

  const fetchAlimento = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/alimentos/${id}`);
      setAlimento(response.data);
    } catch (error) {
      console.error('Erro ao buscar alimento:', error);
      setError('Alimento não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir o alimento "${alimento.nome}"?`)) {
      try {
        await axios.delete(`/api/alimentos/${id}`);
        navigate('/alimentos');
      } catch (error) {
        console.error('Erro ao deletar alimento:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando detalhes do alimento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Erro</h2>
        <p>{error}</p>
        <Link to="/alimentos" className="back-button">
          ← Voltar para Lista
        </Link>
      </div>
    );
  }

  if (!alimento) {
    return (
      <div className="error-container">
        <h2>❌ Alimento não encontrado</h2>
        <Link to="/alimentos" className="back-button">
          ← Voltar para Lista
        </Link>
      </div>
    );
  }

  return (
    <div className="alimento-detail-container">
      <div className="alimento-detail-header">
        <Link to="/alimentos" className="back-button">
          ← Voltar para Lista
        </Link>
        <div className="header-actions">
          <Link 
            to={`/alimentos/${id}/editar`} 
            className="edit-button"
          >
            ✏️ Editar
          </Link>
          <button 
            onClick={handleDelete}
            className="delete-button"
          >
            🗑️ Excluir
          </button>
        </div>
      </div>

      <div className="alimento-detail-card">
        <div className="alimento-header">
          <h1>{alimento.nome}</h1>
          <div className="calories-badge">
            {alimento.calorias} kcal
          </div>
        </div>

        <div className="nutrition-grid">
          <div className="nutrition-card protein">
            <div className="nutrition-icon">💪</div>
            <div className="nutrition-info">
              <h3>Proteínas</h3>
              <p className="nutrition-value">{alimento.proteinas}g</p>
            </div>
          </div>

          <div className="nutrition-card carbs">
            <div className="nutrition-icon">🌾</div>
            <div className="nutrition-info">
              <h3>Carboidratos</h3>
              <p className="nutrition-value">{alimento.carboidratos}g</p>
            </div>
          </div>

          <div className="nutrition-card fats">
            <div className="nutrition-icon">🥑</div>
            <div className="nutrition-info">
              <h3>Gorduras</h3>
              <p className="nutrition-value">{alimento.gorduras}g</p>
            </div>
          </div>
        </div>

        <div className="nutrition-summary">
          <h3>Resumo Nutricional</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Calorias:</span>
              <span className="stat-value">{alimento.calorias} kcal</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Proteínas:</span>
              <span className="stat-value">{alimento.proteinas}g</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Carboidratos:</span>
              <span className="stat-value">{alimento.carboidratos}g</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Gorduras:</span>
              <span className="stat-value">{alimento.gorduras}g</span>
            </div>
          </div>
        </div>

        <div className="alimento-actions">
          <Link 
            to={`/alimentos/${id}/editar`} 
            className="action-button primary"
          >
            ✏️ Editar Alimento
          </Link>
          <Link 
            to="/alimentos" 
            className="action-button secondary"
          >
            📋 Ver Todos os Alimentos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlimentoDetail; 