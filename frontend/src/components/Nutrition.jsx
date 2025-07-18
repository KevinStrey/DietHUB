import { useState, useEffect } from 'react';
import axios from 'axios';
import './Refeicoes.css';
import { getLocalDateString, formatDateBr } from '../../utils/date';

function Nutrition() {
  const [totals, setTotals] = useState({ calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getLocalDateString());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscar usuário logado do localStorage
        const usuarioStr = localStorage.getItem('user');
        const usuarioObj = usuarioStr ? JSON.parse(usuarioStr) : null;
        if (!usuarioObj || !usuarioObj.id) throw new Error('Usuário não encontrado');
        // Buscar perfil do usuário para meta de calorias
        const usuarioResp = await axios.get(`/api/usuarios/${usuarioObj.id}`);
        setUsuario(usuarioResp.data);
        // Buscar totais do dia do backend para a data selecionada
        const formattedDate = date;
        const totalsResp = await axios.get(`/api/historico/usuario/${usuarioObj.id}/data/${formattedDate}`);
        const hist = totalsResp.data || {};
        setTotals({
          calorias: hist.totalCalorias || 0,
          proteinas: hist.totalProteinas || 0,
          carboidratos: hist.totalCarboidratos || 0,
          gorduras: hist.totalGorduras || 0
        });
      } catch (e) {
        setUsuario({ caloriasDiarias: 2000 });
        setTotals({ calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

  // Metas baseadas em % das calorias
  const getMacroGoals = (usuario) => {
    if (!usuario) return { calorias: 2000, proteinas: 150, carboidratos: 300, gorduras: 75 };
    const calorias = usuario.caloriasDiarias || usuario.calorias_diarias || 2000;
    // Proteínas: 30% das calorias, 1g = 4kcal
    const proteinas = Math.round((calorias * 0.3) / 4);
    // Carboidratos: 50% das calorias, 1g = 4kcal
    const carboidratos = Math.round((calorias * 0.5) / 4);
    // Gorduras: 20% das calorias, 1g = 9kcal
    const gorduras = Math.round((calorias * 0.2) / 9);
    return { calorias, proteinas, carboidratos, gorduras };
  };

  const goals = getMacroGoals(usuario);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando informações nutricionais...</p>
      </div>
    );
  }

  const percent = (value, goal) => Math.min(100, Math.round((value / goal) * 100));

  // Atualizar os dados do nutrition-chart dinamicamente
  const atualizarNutritionChart = () => {
    fetchData();
  };

  return (
    <div className="refeicoes-container">
      <div className="refeicoes-header">
        <h2>Informações Nutricionais</h2>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="date-picker"
        />
      </div>
      <div className="nutrition-chart">
        <h3 className="nutrition-summary-title">Resumo do Dia - {formatDateBr(date)}</h3>
        <div className="macro-bar">
          <div className="macro-label">Calorias</div>
          <div className="macro-progress">
            <div className="macro-fill protein" style={{width: percent(totals.calorias, goals.calorias) + '%', background: '#e67e22'}}></div>
          </div>
          <div className="macro-value">{totals.calorias.toFixed(2)} / {goals.calorias.toFixed(2)} kcal</div>
        </div>
        <div className="macro-bar">
          <div className="macro-label">Proteínas</div>
          <div className="macro-progress">
            <div className="macro-fill protein" style={{width: percent(totals.proteinas, goals.proteinas) + '%'}}></div>
          </div>
          <div className="macro-value">{totals.proteinas.toFixed(2)}g / {goals.proteinas.toFixed(2)}g</div>
        </div>
        <div className="macro-bar">
          <div className="macro-label">Carboidratos</div>
          <div className="macro-progress">
            <div className="macro-fill carbs" style={{width: percent(totals.carboidratos, goals.carboidratos) + '%'}}></div>
          </div>
          <div className="macro-value">{totals.carboidratos.toFixed(2)}g / {goals.carboidratos.toFixed(2)}g</div>
        </div>
        <div className="macro-bar">
          <div className="macro-label">Gorduras</div>
          <div className="macro-progress">
            <div className="macro-fill fats" style={{width: percent(totals.gorduras, goals.gorduras) + '%'}}></div>
          </div>
          <div className="macro-value">{totals.gorduras.toFixed(2)}g / {goals.gorduras.toFixed(2)}g</div>
        </div>
      </div>
    </div>
  );
}

export default Nutrition; 