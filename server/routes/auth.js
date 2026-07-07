const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Mặc định tạo user (role: 'user'), admin thường tạo tay trong DB
    const newUser = new User({ username, password, role: 'user' });
    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(400).json({ error: "Lỗi đăng ký" });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user) return res.status(401).json({ error: "Sai tài khoản/mật khẩu" });

  // Trong route /login
  res.json({ token: "some-real-token-or-fake-one", role: user.role });
});

module.exports = router;