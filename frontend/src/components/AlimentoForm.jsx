import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AlimentoForm.css';

function AlimentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    nome: '',
    calorias: '',
    proteinas: '',
    carboidratos: '',
    gorduras: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchAlimento();
    }
  }, [id]);

  const fetchAlimento = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/alimentos/${id}`);
      const alimento = response.data;
      setFormData({
        nome: alimento.nome || '',
        calorias: alimento.calorias || '',
        proteinas: alimento.proteinas || '',
        carboidratos: alimento.carboidratos || '',
        gorduras: alimento.gorduras || ''
      });
    } catch (error) {
      console.error('Erro ao buscar alimento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.calorias || formData.calorias <= 0) {
      newErrors.calorias = 'Calorias devem ser maiores que 0';
    }
    
    if (!formData.proteinas || formData.proteinas < 0) {
      newErrors.proteinas = 'Proteínas devem ser 0 ou maior';
    }
    
    if (!formData.carboidratos || formData.carboidratos < 0) {
      newErrors.carboidratos = 'Carboidratos devem ser 0 ou maior';
    }
    
    if (!formData.gorduras || formData.gorduras < 0) {
      newErrors.gorduras = 'Gorduras devem ser 0 ou maior';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaving(true);
      
      const alimentoData = {
        ...formData,
        calorias: parseFloat(formData.calorias),
        proteinas: parseFloat(formData.proteinas),
        carboidratos: parseFloat(formData.carboidratos),
        gorduras: parseFloat(formData.gorduras)
      };
      
      if (isEditing) {
        await axios.put(`/api/alimentos/${id}`, alimentoData);
      } else {
        await axios.post('/api/alimentos', alimentoData);
      }
      
      navigate('/alimentos');
    } catch (error) {
      console.error('Erro ao salvar alimento:', error);
      setErrors({ submit: 'Erro ao salvar alimento. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando alimento...</p>
      </div>
    );
  }

  return (
    <div className="alimento-form-container">
      <div className="form-header">
        <Link to="/alimentos" className="back-button">
          ← Voltar para Lista
        </Link>
        <h2>{isEditing ? '✏️ Editar Alimento' : '➕ Adicionar Novo Alimento'}</h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="alimento-form">
          <div className="form-group">
            <label htmlFor="nome">Nome do Alimento *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Maçã, Frango, Arroz..."
              className={errors.nome ? 'error' : ''}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="calorias">Calorias (kcal) *</label>
            <input
              type="number"
              id="calorias"
              name="calorias"
              value={formData.calorias}
              onChange={handleChange}
              placeholder="Ex: 52"
              step="0.1"
              min="0"
              className={errors.calorias ? 'error' : ''}
            />
            {errors.calorias && <span className="error-message">{errors.calorias}</span>}
          </div>

          <div className="nutrition-inputs">
            <div className="form-group">
              <label htmlFor="proteinas">Proteínas (g)</label>
              <input
                type="number"
                id="proteinas"
                name="proteinas"
                value={formData.proteinas}
                onChange={handleChange}
                placeholder="Ex: 0.3"
                step="0.1"
                min="0"
                className={errors.proteinas ? 'error' : ''}
              />
              {errors.proteinas && <span className="error-message">{errors.proteinas}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="carboidratos">Carboidratos (g)</label>
              <input
                type="number"
                id="carboidratos"
                name="carboidratos"
                value={formData.carboidratos}
                onChange={handleChange}
                placeholder="Ex: 14"
                step="0.1"
                min="0"
                className={errors.carboidratos ? 'error' : ''}
              />
              {errors.carboidratos && <span className="error-message">{errors.carboidratos}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gorduras">Gorduras (g)</label>
              <input
                type="number"
                id="gorduras"
                name="gorduras"
                value={formData.gorduras}
                onChange={handleChange}
                placeholder="Ex: 0.2"
                step="0.1"
                min="0"
                className={errors.gorduras ? 'error' : ''}
              />
              {errors.gorduras && <span className="error-message">{errors.gorduras}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/alimentos')}
              className="cancel-button"
              disabled={saving}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={saving}
            >
              {saving ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Adicionar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlimentoForm; 