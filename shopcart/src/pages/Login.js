import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('请填写所有字段');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form, {
        withCredentials: true
      });
      login(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '登录失败');
    }
  };

  return (
    <div className="auth-container">
      <h2>登录</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="邮箱"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="密码"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">登录</button>
      </form>
      <p>没有账号？<Link to="/signup">注册</Link></p>
    </div>
  );
}

export default Login;