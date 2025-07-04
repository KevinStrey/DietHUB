import { useState, useEffect } from 'react';
import axios from 'axios';
import './Refeicoes.css';

function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRefeicao, setSelectedRefeicao] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [historicoDia, setHistoricoDia] = useState(null);

  useEffect(() => {
    fetchRefeicoes();
    fetchAlimentos();
    fetchHistoricoDia();
  }, [selectedDate]);

  const fetchRefeicoes = async () => {
    try {
      setLoading(true);
      // Buscar refeições do backend para o usuário logado e data selecionada
      const usuarioStr = localStorage.getItem('user');
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      if (!usuario || !usuario.id) {
        setRefeicoes([]);
        return;
      }
      // Buscar refeições do usuário
      const response = await axios.get(`/api/refeicoes/usuario/${usuario.id}`);
      // Filtrar por data selecionada e mapear para o formato esperado
      const refeicoesFiltradas = (response.data || []).filter(r => r.data === selectedDate);
      const refeicoesMapeadas = refeicoesFiltradas.map(refeicaoBackend => ({
        id: refeicaoBackend.id,
        nome: refeicaoBackend.nome,
        horario: '', // Se quiser extrair do campo data/hora, ajuste aqui
        alimentos: (refeicaoBackend.itens || []).map(item => ({
          id: item.alimento.id,
          nome: item.alimento.nome,
          quantidade: item.quantidadeEmGramas,
          calorias: item.alimento.calorias,
          proteinas: item.alimento.proteinas,
          carboidratos: item.alimento.carboidratos,
          gorduras: item.alimento.gorduras
        })),
        totalCalorias: 0, // Pode calcular se quiser
        totalProteinas: 0,
        totalCarboidratos: 0,
        totalGorduras: 0
      }));
      setRefeicoes(refeicoesMapeadas);
    } catch (error) {
      console.error('Erro ao buscar refeições:', error);
      setRefeicoes([]);
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

  const fetchHistoricoDia = async () => {
    try {
      const usuarioStr = localStorage.getItem('user');
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      if (!usuario || !usuario.id) {
        setHistoricoDia(null);
        return;
      }
      const response = await axios.get(`/api/historico/usuario/${usuario.id}/data/${selectedDate}`);
      setHistoricoDia(response.data || null);
    } catch (error) {
      setHistoricoDia(null);
    }
  };

  const handleAddRefeicao = async (refeicao) => {
    try {
      // Buscar id do usuário logado
      const usuarioStr = localStorage.getItem('user');
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      if (!usuario || !usuario.id) {
        alert('Usuário não encontrado. Faça login novamente.');
        return;
      }
      // Montar payload para o backend
      const payload = {
        nome: refeicao.nome,
        data: selectedDate,
        usuario: { id: usuario.id },
        itens: refeicao.alimentos.map(a => ({
          alimento: { id: a.alimentoId || a.id },
          quantidadeEmGramas: a.quantidade
        }))
      };
      console.log('Payload sendo enviado:', payload); // Debug
      const response = await axios.post('/api/refeicoes', payload);
      // Mapear resposta do backend para o formato esperado pelo frontend
      const refeicaoBackend = response.data;
      const refeicaoFrontend = {
        id: refeicaoBackend.id,
        nome: refeicaoBackend.nome,
        horario: refeicao.horario || '', // O frontend pode não usar, mas mantém compatível
        alimentos: (refeicaoBackend.itens || []).map(item => ({
          id: item.alimento.id,
          nome: item.alimento.nome,
          quantidade: item.quantidadeEmGramas,
          calorias: item.alimento.calorias,
          proteinas: item.alimento.proteinas,
          carboidratos: item.alimento.carboidratos,
          gorduras: item.alimento.gorduras
        })),
        totalCalorias: refeicao.totalCalorias,
        totalProteinas: refeicao.totalProteinas,
        totalCarboidratos: refeicao.totalCarboidratos,
        totalGorduras: refeicao.totalGorduras
      };
      setRefeicoes(prev => [...prev, refeicaoFrontend]);
      setShowAddModal(false);
      atualizarResumoDia();
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data || error.message);
      alert('Erro ao salvar refeição: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEditRefeicao = (refeicao) => {
    setSelectedRefeicao(refeicao);
    setShowAddModal(true);
  };

  const handleDeleteRefeicao = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta refeição?')) {
      try {
        await axios.delete(`/api/refeicoes/${id}`);
        setRefeicoes(prev => prev.filter(refeicao => refeicao.id !== id));
        atualizarResumoDia();
      } catch (error) {
        alert('Erro ao excluir refeição.');
        console.error(error);
      }
    }
  };

  const handleUpdateRefeicao = async (refeicao) => {
    try {
      const usuarioStr = localStorage.getItem('user');
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      if (!usuario || !usuario.id) {
        alert('Usuário não encontrado. Faça login novamente.');
        return;
      }
      const payload = {
        nome: refeicao.nome,
        data: selectedDate,
        usuario: { id: usuario.id },
        itens: refeicao.alimentos.map(a => ({
          alimento: { id: a.alimentoId || a.id },
          quantidadeEmGramas: a.quantidade
        }))
      };
      console.log('Payload sendo enviado (update):', payload); // Debug
      const response = await axios.put(`/api/refeicoes/${refeicao.id}`, payload);
      // Mapear resposta do backend para o formato esperado pelo frontend
      const refeicaoBackend = response.data;
      const refeicaoFrontend = {
        id: refeicaoBackend.id,
        nome: refeicaoBackend.nome,
        horario: refeicao.horario || '',
        alimentos: (refeicaoBackend.itens || []).map(item => ({
          id: item.alimento.id,
          nome: item.alimento.nome,
          quantidade: item.quantidadeEmGramas,
          calorias: item.alimento.calorias,
          proteinas: item.alimento.proteinas,
          carboidratos: item.alimento.carboidratos,
          gorduras: item.alimento.gorduras
        })),
        totalCalorias: refeicao.totalCalorias,
        totalProteinas: refeicao.totalProteinas,
        totalCarboidratos: refeicao.totalCarboidratos,
        totalGorduras: refeicao.totalGorduras
      };
      setRefeicoes(prev => prev.map(r => r.id === refeicaoFrontend.id ? refeicaoFrontend : r));
      setShowAddModal(false);
      atualizarResumoDia();
    } catch (error) {
      console.error('Erro detalhado (update):', error.response?.data || error.message);
      alert('Erro ao atualizar refeição: ' + (error.response?.data?.message || error.message));
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

  const dailyTotals = historicoDia ? {
    calorias: Math.round(historicoDia.totalCalorias || 0),
    proteinas: Math.round(historicoDia.totalProteinas || 0),
    carboidratos: Math.round(historicoDia.totalCarboidratos || 0),
    gorduras: Math.round(historicoDia.totalGorduras || 0)
  } : { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 };

  // Atualizar o resumo do dia após adicionar, editar ou excluir refeição
  const atualizarResumoDia = () => {
    fetchHistoricoDia();
  };

  // Adicionar função utilitária para calcular totais de uma refeição
  const calcularTotaisRefeicao = (alimentos) => {
    return alimentos.reduce((totals, alimento) => {
      const fator = (alimento.quantidade || 0) / 100;
      return {
        calorias: totals.calorias + (alimento.calorias || 0) * fator,
        proteinas: totals.proteinas + (alimento.proteinas || 0) * fator,
        carboidratos: totals.carboidratos + (alimento.carboidratos || 0) * fator,
        gorduras: totals.gorduras + (alimento.gorduras || 0) * fator
      };
    }, { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  };

  // Função para obter a data local no formato YYYY-MM-DD
  function getLocalDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Função para formatar data YYYY-MM-DD para DD/MM/YYYY
  function formatDateBr(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

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
        <h3>Resumo do Dia - {formatDateBr(selectedDate)}</h3>
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
          refeicoes.map((refeicao) => {
            const totais = calcularTotaisRefeicao(refeicao.alimentos);
            return (
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
                  {refeicao.alimentos.map((alimento, index) => (
                    <div key={`${alimento.id}-${index}`} className="alimento-item">
                      <div className="alimento-info">
                        <span className="alimento-nome">{alimento.nome}</span>
                        <span className="alimento-quantidade">{alimento.quantidade}g</span>
                      </div>
                      <div className="alimento-nutrition">
                        <span className="nutrition-value">{alimento.calorias.toFixed(2)} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="refeicao-totals">
                  <div className="total-item">
                    <span className="total-label">Total:</span>
                    <span className="total-calories">{totais.calorias.toFixed(2)} kcal</span>
                  </div>
                  <div className="macros-summary">
                    <span className="macro">P: {totais.proteinas.toFixed(2)}g</span>
                    <span className="macro">C: {totais.carboidratos.toFixed(2)}g</span>
                    <span className="macro">G: {totais.gorduras.toFixed(2)}g</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal para Adicionar/Editar Refeição */}
      {showAddModal && (
        <RefeicaoModal
          refeicao={selectedRefeicao}
          alimentos={alimentos}
          onSave={selectedRefeicao ? handleUpdateRefeicao : handleAddRefeicao}
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
    alimentos: refeicao?.alimentos ? [...refeicao.alimentos] : []
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
      id: alimento.id,
      alimentoId: alimento.id,
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
      id: refeicao?.id,
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
                readOnly={!!refeicao}
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
                    {alimento.nome} ({alimento.calorias.toFixed(2)} kcal/100g)
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
              formData.alimentos.map((alimento, index) => (
                <div key={`${alimento.id}-${index}`} className="alimento-item">
                  <div className="alimento-info">
                    <span className="alimento-nome">{alimento.nome}</span>
                    <span className="alimento-quantidade">{alimento.quantidade}g</span>
                  </div>
                  <div className="alimento-nutrition">
                    <span className="nutrition-value">{alimento.calorias.toFixed(2)} kcal</span>
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
                  <span className="total-value">{totals.calorias.toFixed(2)} kcal</span>
                </div>
                <div className="total-item">
                  <span className="total-label">Proteínas:</span>
                  <span className="total-value">{totals.proteinas.toFixed(2)}g</span>
                </div>
                <div className="total-item">
                  <span className="total-label">Carboidratos:</span>
                  <span className="total-value">{totals.carboidratos.toFixed(2)}g</span>
                </div>
                <div className="total-item">
                  <span className="total-label">Gorduras:</span>
                  <span className="total-value">{totals.gorduras.toFixed(2)}g</span>
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