require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9999;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Route kiểm tra
app.get('/', (req, res) => {
    res.json({ message: 'Eventverse API đang chạy ổn định tại port ' + PORT });
});

// Import các Routes đã tạo
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/auth'); // Giả định bạn đã tạo file auth.js
const ticketRoutes = require('./routes/ticketRoutes'); // Route mua vé

// Sử dụng các Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});