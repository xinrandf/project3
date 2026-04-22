import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="logo">XD</div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
        <a href="#contact">Contact</a>
        {user ? (
          <>
            <span>你好, {user.username}</span>
            <button onClick={handleLogout}>登出</button>
          </>
        ) : (
          <>
            <Link to="/login">登录</Link>
            <Link to="/signup">注册</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;