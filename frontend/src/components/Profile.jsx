import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile({ user, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(user);
  const [success, setSuccess] = useState(false);

  // Atualiza formData se user mudar (ex: logout/login)
  React.useEffect(() => {
    setFormData(user);
  }, [user]);

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
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      setSaving(true);
      setSuccess(false);
      console.log(formData);
      await axios.put(`/api/usuarios/${user.id}`, formData);
      setIsEditing(false);
      setSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar perfil. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setErrors({});
    setIsEditing(false);
    setSuccess(false);
  };

  if (!formData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>👤 Perfil do Usuário</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-profile-button"
            >
              ✏️ Editar Perfil
            </button>
          )}
          <button 
            onClick={onLogout}
            className="logout-profile-button"
            style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {formData.nome.charAt(0).toUpperCase()}
              </div>
              <div className="profile-basic-info">
                <h3>{formData.nome}</h3>
                <p>{formData.email}</p>
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
                    <label htmlFor="objetivo">Objetivo</label>
                    <input
                      type="text"
                      id="objetivo"
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="caloriasDiarias">Calorias Diárias</label>
                    <input
                      type="number"
                      id="caloriasDiarias"
                      name="caloriasDiarias"
                      value={formData.caloriasDiarias || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {errors.submit && (
                  <div className="error-message submit-error">
                    {errors.submit}
                  </div>
                )}
                {success && (
                  <div className="success-message">
                    Perfil atualizado com sucesso!
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
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{formData.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Objetivo:</span>
                  <span className="detail-value">{formData.objetivo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Calorias Diárias:</span>
                  <span className="detail-value">{formData.caloriasDiarias}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 