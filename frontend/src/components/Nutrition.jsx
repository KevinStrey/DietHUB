import { useState, useEffect } from 'react';
import axios from 'axios';
import './Refeicoes.css';

function Nutrition() {
  const [totals, setTotals] = useState({ calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 });
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getLocalDateString());

  // Função para obter a data local no formato YYYY-MM-DD
  function getLocalDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

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
        // Buscar totais do dia do backend
        const formattedDate = formatDate(date);
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

  // Função para garantir o formato YYYY-MM-DD
  function formatDate(dateObjOrString) {
    const d = new Date(dateObjOrString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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

  return (
    <div className="refeicoes-container">
      <div className="refeicoes-header">
        <h2>Informações Nutricionais</h2>
        <input
          type="date"
          value={date}
          onChange={e => setDate(formatDate(e.target.value))}
          className="date-picker"
        />
      </div>
      <div className="nutrition-chart">
        <div className="macro-bar">
          <div className="macro-label">Calorias</div>
          <div className="macro-progress">
            <div className="macro-fill protein" style={{width: percent(totals.calorias, goals.calorias) + '%', background: '#e67e22'}}></div>
          </div>
          <div className="macro-value">{totals.calorias} / {goals.calorias} kcal</div>
        </div>
        <div className="macro-bar">
          <div className="macro-label">Proteínas</div>
          <div className="macro-progress">
            <div className="macro-fill protein" style={{width: percent(totals.proteinas, goals.proteinas) + '%'}}></div>
          </div>
          <div className="macro-value">{totals.proteinas}g / {goals.proteinas}g</div>
        </div>
        <div className="macro-bar">
          <div className="macro-label">Carboidratos</div>
          <div className="macro-progress">
            <div className="macro-fill carbs" style={{width: percent(totals.carboidratos, goals.carboidratos) + '%'}}></div>
          </div>
          <div className="macro-value">{totals.carboidratos}g / {goals.carboidratos}g</div>
        </div>
        <div className="macro-bar">
          <div className="macro-label">Gorduras</div>
          <div className="macro-progress">
            <div className="macro-fill fats" style={{width: percent(totals.gorduras, goals.gorduras) + '%'}}></div>
          </div>
          <div className="macro-value">{totals.gorduras}g / {goals.gorduras}g</div>
        </div>
      </div>
    </div>
  );
}

export default Nutrition; 