import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AlimentoList.css';

function AlimentoList() {
  const [alimentos, setAlimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alimentoToDelete, setAlimentoToDelete] = useState(null);

  useEffect(() => {
    fetchAlimentos();
  }, []);

  const fetchAlimentos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/alimentos');
      setAlimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/alimentos/${id}`);
      setAlimentos(alimentos.filter(alimento => alimento.id !== id));
      setShowDeleteModal(false);
      setAlimentoToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar alimento:', error);
    }
  };

  const confirmDelete = (alimento) => {
    setAlimentoToDelete(alimento);
    setShowDeleteModal(true);
  };

  const filteredAlimentos = alimentos.filter(alimento =>
    alimento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando alimentos...</p>
      </div>
    );
  }

  return (
    <div className="alimento-list-container">
      <div className="alimento-list-header">
        <h2>Lista de Alimentos</h2>
        <Link to="/alimentos/novo" className="add-button">
          ➕ Adicionar Alimento
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar alimentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="alimentos-grid">
        {filteredAlimentos.length === 0 ? (
          <div className="no-results">
            <p>Nenhum alimento encontrado.</p>
          </div>
        ) : (
          filteredAlimentos.map((alimento) => (
            <div key={alimento.id} className="alimento-card">
              <div className="alimento-info">
                <h3>{alimento.nome}</h3>
                <div className="alimento-stats">
                  <span className="stat">
                    <strong>Calorias:</strong> {alimento.calorias} kcal
                  </span>
                  <span className="stat">
                    <strong>Proteínas:</strong> {alimento.proteinas}g
                  </span>
                  <span className="stat">
                    <strong>Carboidratos:</strong> {alimento.carboidratos}g
                  </span>
                  <span className="stat">
                    <strong>Gorduras:</strong> {alimento.gorduras}g
                  </span>
                </div>
              </div>
              <div className="alimento-actions">
                <Link 
                  to={`/alimentos/${alimento.id}`} 
                  className="action-button view"
                >
                  👁️ Ver
                </Link>
                <Link 
                  to={`/alimentos/${alimento.id}/editar`} 
                  className="action-button edit"
                >
                  ✏️ Editar
                </Link>
                <button 
                  onClick={() => confirmDelete(alimento)}
                  className="action-button delete"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir o alimento "{alimentoToDelete?.nome}"?
            </p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="modal-button cancel"
              >
                Cancelar
              </button>
              <button 
                onClick={() => handleDelete(alimentoToDelete.id)}
                className="modal-button confirm"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlimentoList; 