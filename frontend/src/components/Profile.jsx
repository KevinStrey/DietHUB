import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    idade: 28,
    peso: 75,
    altura: 1.75,
    objetivo: 'Manter peso',
    nivelAtividade: 'Moderado',
    genero: 'Masculino'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({...profile});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Aqui você pode fazer uma chamada para a API para buscar os dados do usuário
      // const response = await axios.get('/api/usuarios/perfil');
      // setProfile(response.data);
      // setFormData(response.data);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.idade || formData.idade < 10 || formData.idade > 120) {
      newErrors.idade = 'Idade deve estar entre 10 e 120 anos';
    }
    
    if (!formData.peso || formData.peso < 20 || formData.peso > 300) {
      newErrors.peso = 'Peso deve estar entre 20 e 300 kg';
    }
    
    if (!formData.altura || formData.altura < 0.5 || formData.altura > 2.5) {
      newErrors.altura = 'Altura deve estar entre 0.5 e 2.5 metros';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaving(true);
      // Aqui você pode fazer uma chamada para a API para salvar os dados
      // await axios.put('/api/usuarios/perfil', formData);
      
      setProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      setErrors({ submit: 'Erro ao salvar perfil. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setErrors({});
    setIsEditing(false);
  };

  const calculateIMC = () => {
    const imc = profile.peso / (profile.altura * profile.altura);
    return imc.toFixed(1);
  };

  const getIMCCategory = (imc) => {
    if (imc < 18.5) return { category: 'Abaixo do peso', color: '#ff6b6b' };
    if (imc < 25) return { category: 'Peso normal', color: '#4ecdc4' };
    if (imc < 30) return { category: 'Sobrepeso', color: '#feca57' };
    return { category: 'Obesidade', color: '#ff6b6b' };
  };

  const calculateCaloriasBasais = () => {
    // Fórmula de Harris-Benedict
    let tmb;
    if (profile.genero === 'Masculino') {
      tmb = 88.362 + (13.397 * profile.peso) + (4.799 * profile.altura * 100) - (5.677 * profile.idade);
    } else {
      tmb = 447.593 + (9.247 * profile.peso) + (3.098 * profile.altura * 100) - (4.330 * profile.idade);
    }
    
    // Fator de atividade
    const fatores = {
      'Sedentário': 1.2,
      'Leve': 1.375,
      'Moderado': 1.55,
      'Ativo': 1.725,
      'Muito ativo': 1.9
    };
    
    return Math.round(tmb * fatores[profile.nivelAtividade]);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  const imc = calculateIMC();
  const imcInfo = getIMCCategory(imc);
  const caloriasBasais = calculateCaloriasBasais();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>👤 Perfil do Usuário</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="edit-profile-button"
          >
            ✏️ Editar Perfil
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {profile.nome.charAt(0).toUpperCase()}
              </div>
              <div className="profile-basic-info">
                <h3>{profile.nome}</h3>
                <p>{profile.email}</p>
                <span className="profile-status">Ativo</span>
              </div>
            </div>

            {isEditing ? (
              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className={errors.nome ? 'error' : ''}
                    />
                    {errors.nome && <span className="error-message">{errors.nome}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="idade">Idade (anos) *</label>
                    <input
                      type="number"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleChange}
                      min="10"
                      max="120"
                      className={errors.idade ? 'error' : ''}
                    />
                    {errors.idade && <span className="error-message">{errors.idade}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="genero">Gênero</label>
                    <select
                      id="genero"
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="peso">Peso (kg) *</label>
                    <input
                      type="number"
                      id="peso"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      step="0.1"
                      min="20"
                      max="300"
                      className={errors.peso ? 'error' : ''}
                    />
                    {errors.peso && <span className="error-message">{errors.peso}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="altura">Altura (m) *</label>
                    <input
                      type="number"
                      id="altura"
                      name="altura"
                      value={formData.altura}
                      onChange={handleChange}
                      step="0.01"
                      min="0.5"
                      max="2.5"
                      className={errors.altura ? 'error' : ''}
                    />
                    {errors.altura && <span className="error-message">{errors.altura}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="objetivo">Objetivo</label>
                    <select
                      id="objetivo"
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleChange}
                    >
                      <option value="Perder peso">Perder peso</option>
                      <option value="Manter peso">Manter peso</option>
                      <option value="Ganhar peso">Ganhar peso</option>
                      <option value="Ganhar massa muscular">Ganhar massa muscular</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="nivelAtividade">Nível de Atividade</label>
                    <select
                      id="nivelAtividade"
                      name="nivelAtividade"
                      value={formData.nivelAtividade}
                      onChange={handleChange}
                    >
                      <option value="Sedentário">Sedentário</option>
                      <option value="Leve">Leve</option>
                      <option value="Moderado">Moderado</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Muito ativo">Muito ativo</option>
                    </select>
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
                    onClick={handleCancel}
                    className="cancel-button"
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSave}
                    className="save-button"
                    disabled={saving}
                  >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Idade:</span>
                  <span className="detail-value">{profile.idade} anos</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Gênero:</span>
                  <span className="detail-value">{profile.genero}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Peso:</span>
                  <span className="detail-value">{profile.peso} kg</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Altura:</span>
                  <span className="detail-value">{profile.altura} m</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Objetivo:</span>
                  <span className="detail-value">{profile.objetivo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Nível de Atividade:</span>
                  <span className="detail-value">{profile.nivelAtividade}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h4>IMC</h4>
              <p className="stat-value" style={{color: imcInfo.color}}>{imc}</p>
              <p className="stat-label">{imcInfo.category}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <h4>Calorias Diárias</h4>
              <p className="stat-value">{caloriasBasais}</p>
              <p className="stat-label">kcal/dia</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h4>Objetivo</h4>
              <p className="stat-value">{profile.objetivo}</p>
              <p className="stat-label">Atual</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h4>Nível</h4>
              <p className="stat-value">{profile.nivelAtividade}</p>
              <p className="stat-label">Atividade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 