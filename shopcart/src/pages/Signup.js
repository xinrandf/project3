import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.username || !form.email || !form.password) return '请填写所有字段';
    if (form.password.length < 6) return '密码至少6位';
    if (!form.email.includes('@')) return '邮箱格式不正确';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    try {
      await axios.post(`${API_URL}/api/auth/signup`, form, {
        withCredentials: true
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '注册失败');
    }
  };

  return (
    <div className="auth-container">
      <h2>注册</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="用户名"
          value={form.username}
          onChange={handleChange}
        />
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
          placeholder="密码（至少6位）"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">注册</button>
      </form>
      <p>已有账号？<Link to="/login">登录</Link></p>
    </div>
  );
}

export default Signup;