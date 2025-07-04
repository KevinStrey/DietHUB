import { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!email || !senha) {
        setError('Preencha todos os campos.');
        setLoading(false);
        return;
      }
      // Buscar todos os usuários e filtrar pelo email (case-insensitive, sem espaços)
      const resp = await axios.get('/api/usuarios');
      const usuarios = resp.data;
      const usuario = usuarios.find(
        u =>
          (u.email && u.email.trim().toLowerCase() === email.trim().toLowerCase()) ||
          (u.nome && u.nome.trim().toLowerCase() === email.trim().toLowerCase())
      );
      if (!usuario) {
        setError('Usuário não encontrado.');
        setLoading(false);
        return;
      }
      if (usuario.senha !== senha) {
        setError('Senha incorreta.');
        setLoading(false);
        return;
      }
      console.log(usuario);
      // Autenticação bem-sucedida
      onLogin && onLogin(usuario);
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu email ou usuário"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login; 