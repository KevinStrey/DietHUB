import { useState, useEffect } from 'react';
import axios from 'axios';
import './Refeicoes.css';

function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRefeicao, setSelectedRefeicao] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Dados de exemplo para demonstração
  const refeicoesExemplo = [
    {
      id: 1,
      nome: 'Café da Manhã',
      horario: '08:00',
      alimentos: [
        { id: 1, nome: 'Ovos', quantidade: 2, calorias: 140, proteinas: 12, carboidratos: 1, gorduras: 10 },
        { id: 2, nome: 'Aveia', quantidade: 50, calorias: 180, proteinas: 6, carboidratos: 30, gorduras: 3 },
        { id: 3, nome: 'Banana', quantidade: 1, calorias: 105, proteinas: 1, carboidratos: 27, gorduras: 0 }
      ],
      totalCalorias: 425,
      totalProteinas: 19,
      totalCarboidratos: 58,
      totalGorduras: 13
    },
    {
      id: 2,
      nome: 'Almoço',
      horario: '12:30',
      alimentos: [
        { id: 4, nome: 'Frango', quantidade: 150, calorias: 250, proteinas: 45, carboidratos: 0, gorduras: 5 },
        { id: 5, nome: 'Arroz', quantidade: 100, calorias: 130, proteinas: 3, carboidratos: 28, gorduras: 0 },
        { id: 6, nome: 'Brócolis', quantidade: 80, calorias: 35, proteinas: 3, carboidratos: 7, gorduras: 0 }
      ],
      totalCalorias: 415,
      totalProteinas: 51,
      totalCarboidratos: 35,
      totalGorduras: 5
    },
    {
      id: 3,
      nome: 'Lanche',
      horario: '16:00',
      alimentos: [
        { id: 7, nome: 'Iogurte', quantidade: 200, calorias: 120, proteinas: 8, carboidratos: 15, gorduras: 4 },
        { id: 8, nome: 'Nozes', quantidade: 30, calorias: 180, proteinas: 6, carboidratos: 4, gorduras: 18 }
      ],
      totalCalorias: 300,
      totalProteinas: 14,
      totalCarboidratos: 19,
      totalGorduras: 22
    },
    {
      id: 4,
      nome: 'Jantar',
      horario: '19:30',
      alimentos: [
        { id: 9, nome: 'Salmão', quantidade: 120, calorias: 280, proteinas: 35, carboidratos: 0, gorduras: 15 },
        { id: 10, nome: 'Quinoa', quantidade: 80, calorias: 120, proteinas: 4, carboidratos: 22, gorduras: 2 },
        { id: 11, nome: 'Vegetais', quantidade: 100, calorias: 50, proteinas: 3, carboidratos: 10, gorduras: 0 }
      ],
      totalCalorias: 450,
      totalProteinas: 42,
      totalCarboidratos: 32,
      totalGorduras: 17
    }
  ];

  useEffect(() => {
    fetchRefeicoes();
    fetchAlimentos();
  }, [selectedDate]);

  const fetchRefeicoes = async () => {
    try {
      setLoading(true);
      // Aqui você pode fazer uma chamada para a API
      // const response = await axios.get(`/api/refeicoes?data=${selectedDate}`);
      // setRefeicoes(response.data);
      
      // Usando dados de exemplo por enquanto
      setRefeicoes(refeicoesExemplo);
    } catch (error) {
      console.error('Erro ao buscar refeições:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlimentos = async () => {
    try {
      const response = await axios.get('/api/alimentos');
      setAlimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
      // Dados de exemplo caso a API não esteja disponível
      setAlimentos([
        { id: 1, nome: 'Ovos', calorias: 70, proteinas: 6, carboidratos: 0.5, gorduras: 5 },
        { id: 2, nome: 'Aveia', calorias: 68, proteinas: 2.4, carboidratos: 12, gorduras: 1.4 },
        { id: 3, nome: 'Banana', calorias: 105, proteinas: 1.3, carboidratos: 27, gorduras: 0.4 },
        { id: 4, nome: 'Frango', calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6 },
        { id: 5, nome: 'Arroz', calorias: 130, proteinas: 2.7, carboidratos: 28, gorduras: 0.3 },
        { id: 6, nome: 'Brócolis', calorias: 34, proteinas: 2.8, carboidratos: 7, gorduras: 0.4 },
        { id: 7, nome: 'Iogurte', calorias: 59, proteinas: 10, carboidratos: 3.6, gorduras: 0.4 },
        { id: 8, nome: 'Nozes', calorias: 607, proteinas: 20, carboidratos: 13, gorduras: 54 },
        { id: 9, nome: 'Salmão', calorias: 208, proteinas: 25, carboidratos: 0, gorduras: 12 },
        { id: 10, nome: 'Quinoa', calorias: 120, proteinas: 4.4, carboidratos: 22, gorduras: 1.9 },
        { id: 11, nome: 'Vegetais', calorias: 50, proteinas: 3, carboidratos: 10, gorduras: 0.5 }
      ]);
    }
  };

  const handleAddRefeicao = (refeicao) => {
    setRefeicoes(prev => [...prev, { ...refeicao, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleEditRefeicao = (refeicao) => {
    setSelectedRefeicao(refeicao);
    setShowAddModal(true);
  };

  const handleDeleteRefeicao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta refeição?')) {
      setRefeicoes(prev => prev.filter(refeicao => refeicao.id !== id));
    }
  };

  const calculateDailyTotals = () => {
    return refeicoes.reduce((totals, refeicao) => ({
      calorias: totals.calorias + refeicao.totalCalorias,
      proteinas: totals.proteinas + refeicao.totalProteinas,
      carboidratos: totals.carboidratos + refeicao.totalCarboidratos,
      gorduras: totals.gorduras + refeicao.totalGorduras
    }), { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  };

  const dailyTotals = calculateDailyTotals();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando refeições...</p>
      </div>
    );
  }

  return (
    <div className="refeicoes-container">
      <div className="refeicoes-header">
        <h2>🍽️ Refeições</h2>
        <div className="header-controls">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
          <button 
            onClick={() => setShowAddModal(true)}
            className="add-refeicao-button"
          >
            ➕ Adicionar Refeição
          </button>
        </div>
      </div>

      {/* Resumo Diário */}
      <div className="daily-summary">
        <h3>Resumo do Dia - {new Date(selectedDate).toLocaleDateString('pt-BR')}</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-icon">🔥</span>
            <div className="stat-info">
              <span className="stat-value">{dailyTotals.calorias}</span>
              <span className="stat-label">Calorias</span>
            </div>
          </div>
          <div className="summary-stat">
            <span className="stat-icon">💪</span>
            <div className="stat-info">
              <span className="stat-value">{dailyTotals.proteinas}g</span>
              <span className="stat-label">Proteínas</span>
            </div>
          </div>
          <div className="summary-stat">
            <span className="stat-icon">🌾</span>
            <div className="stat-info">
              <span className="stat-value">{dailyTotals.carboidratos}g</span>
              <span className="stat-label">Carboidratos</span>
            </div>
          </div>
          <div className="summary-stat">
            <span className="stat-icon">🥑</span>
            <div className="stat-info">
              <span className="stat-value">{dailyTotals.gorduras}g</span>
              <span className="stat-label">Gorduras</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Refeições */}
      <div className="refeicoes-grid">
        {refeicoes.length === 0 ? (
          <div className="no-refeicoes">
            <p>Nenhuma refeição registrada para este dia.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="add-first-refeicao"
            >
              ➕ Adicionar Primeira Refeição
            </button>
          </div>
        ) : (
          refeicoes.map((refeicao) => (
            <div key={refeicao.id} className="refeicao-card">
              <div className="refeicao-header">
                <div className="refeicao-info">
                  <h3>{refeicao.nome}</h3>
                  <span className="refeicao-time">{refeicao.horario}</span>
                </div>
                <div className="refeicao-actions">
                  <button 
                    onClick={() => handleEditRefeicao(refeicao)}
                    className="action-button edit"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDeleteRefeicao(refeicao.id)}
                    className="action-button delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="alimentos-list">
                {refeicao.alimentos.map((alimento) => (
                  <div key={alimento.id} className="alimento-item">
                    <div className="alimento-info">
                      <span className="alimento-nome">{alimento.nome}</span>
                      <span className="alimento-quantidade">{alimento.quantidade}g</span>
                    </div>
                    <div className="alimento-nutrition">
                      <span className="nutrition-value">{alimento.calorias} kcal</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="refeicao-totals">
                <div className="total-item">
                  <span className="total-label">Total:</span>
                  <span className="total-calories">{refeicao.totalCalorias} kcal</span>
                </div>
                <div className="macros-summary">
                  <span className="macro">P: {refeicao.totalProteinas}g</span>
                  <span className="macro">C: {refeicao.totalCarboidratos}g</span>
                  <span className="macro">G: {refeicao.totalGorduras}g</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para Adicionar/Editar Refeição */}
      {showAddModal && (
        <RefeicaoModal
          refeicao={selectedRefeicao}
          alimentos={alimentos}
          onSave={handleAddRefeicao}
          onCancel={() => {
            setShowAddModal(false);
            setSelectedRefeicao(null);
          }}
        />
      )}
    </div>
  );
}

// Componente Modal para Adicionar/Editar Refeição
function RefeicaoModal({ refeicao, alimentos, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: refeicao?.nome || '',
    horario: refeicao?.horario || '12:00',
    alimentos: refeicao?.alimentos || []
  });

  const [selectedAlimento, setSelectedAlimento] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleAddAlimento = () => {
    if (!selectedAlimento || !quantidade) return;

    const alimento = alimentos.find(a => a.id == selectedAlimento);
    if (!alimento) return;

    const quantidadeNum = parseFloat(quantidade);
    const fator = quantidadeNum / 100; // Assumindo que os valores são por 100g

    const novoAlimento = {
      id: Date.now(),
      nome: alimento.nome,
      quantidade: quantidadeNum,
      calorias: Math.round(alimento.calorias * fator),
      proteinas: Math.round(alimento.proteinas * fator * 10) / 10,
      carboidratos: Math.round(alimento.carboidratos * fator * 10) / 10,
      gorduras: Math.round(alimento.gorduras * fator * 10) / 10
    };

    setFormData(prev => ({
      ...prev,
      alimentos: [...prev.alimentos, novoAlimento]
    }));

    setSelectedAlimento('');
    setQuantidade('');
  };

  const handleRemoveAlimento = (id) => {
    setFormData(prev => ({
      ...prev,
      alimentos: prev.alimentos.filter(a => a.id !== id)
    }));
  };

  const calculateTotals = () => {
    return formData.alimentos.reduce((totals, alimento) => ({
      calorias: totals.calorias + alimento.calorias,
      proteinas: totals.proteinas + alimento.proteinas,
      carboidratos: totals.carboidratos + alimento.carboidratos,
      gorduras: totals.gorduras + alimento.gorduras
    }), { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  };

  const totals = calculateTotals();

  const handleSave = () => {
    if (!formData.nome.trim() || formData.alimentos.length === 0) {
      alert('Preencha o nome da refeição e adicione pelo menos um alimento.');
      return;
    }

    onSave({
      ...formData,
      totalCalorias: totals.calorias,
      totalProteinas: totals.proteinas,
      totalCarboidratos: totals.carboidratos,
      totalGorduras: totals.gorduras
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal refeicao-modal">
        <div className="modal-header">
          <h3>{refeicao ? 'Editar Refeição' : 'Nova Refeição'}</h3>
          <button onClick={onCancel} className="close-button">×</button>
        </div>

        <div className="modal-content">
          <div className="form-row">
            <div className="form-group">
              <label>Nome da Refeição</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Café da Manhã"
              />
            </div>
            <div className="form-group">
              <label>Horário</label>
              <input
                type="time"
                value={formData.horario}
                onChange={(e) => setFormData(prev => ({ ...prev, horario: e.target.value }))}
              />
            </div>
          </div>

          <div className="add-alimento-section">
            <h4>Adicionar Alimento</h4>
            <div className="add-alimento-form">
              <select
                value={selectedAlimento}
                onChange={(e) => setSelectedAlimento(e.target.value)}
              >
                <option value="">Selecione um alimento</option>
                {alimentos.map(alimento => (
                  <option key={alimento.id} value={alimento.id}>
                    {alimento.nome} ({alimento.calorias} kcal/100g)
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Quantidade (g)"
                min="1"
              />
              <button onClick={handleAddAlimento} className="add-button">
                ➕
              </button>
            </div>
          </div>

          <div className="alimentos-list">
            <h4>Alimentos Adicionados</h4>
            {formData.alimentos.length === 0 ? (
              <p className="no-alimentos">Nenhum alimento adicionado</p>
            ) : (
              formData.alimentos.map(alimento => (
                <div key={alimento.id} className="alimento-item">
                  <div className="alimento-info">
                    <span className="alimento-nome">{alimento.nome}</span>
                    <span className="alimento-quantidade">{alimento.quantidade}g</span>
                  </div>
                  <div className="alimento-nutrition">
                    <span>{alimento.calorias} kcal</span>
                    <button 
                      onClick={() => handleRemoveAlimento(alimento.id)}
                      className="remove-button"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {formData.alimentos.length > 0 && (
            <div className="totals-preview">
              <h4>Resumo da Refeição</h4>
              <div className="totals-grid">
                <div className="total-item">
                  <span className="total-label">Calorias:</span>
                  <span className="total-value">{totals.calorias} kcal</span>
                </div>
                <div className="total-item">
                  <span className="total-label">Proteínas:</span>
                  <span className="total-value">{totals.proteinas}g</span>
                </div>
                <div className="total-item">
                  <span className="total-label">Carboidratos:</span>
                  <span className="total-value">{totals.carboidratos}g</span>
                </div>
                <div className="total-item">
                  <span className="total-label">Gorduras:</span>
                  <span className="total-value">{totals.gorduras}g</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-button">
            Cancelar
          </button>
          <button onClick={handleSave} className="save-button">
            {refeicao ? 'Atualizar' : 'Adicionar'} Refeição
          </button>
        </div>
      </div>
    </div>
  );
}

export default Refeicoes; 