const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // 检查用户是否已存在
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: '邮箱已注册' });

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户
    const user = await User.create({ username, email, password: hashedPassword });

    // 生成 JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 存入 Cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 1天
    });

    res.status(201).json({ message: '注册成功', user: { id: user._id, username: user.username } });

  } catch (err) {
    res.status(500).json({ message: '服务器错误', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // 找用户
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: '用户不存在' });

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: '密码错误' });

    // 生成 JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 存入 Cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: '登录成功', user: { id: user._id, username: user.username } });

  } catch (err) {
    res.status(500).json({ message: '服务器错误', error: err.message });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: '已登出' });
});

// GET /api/auth/me （验证当前登录状态）
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: '未登录' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, userId: decoded.id });
  } catch {
    res.status(401).json({ message: 'Token 无效' });
  }
});

module.exports = router;