const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

/**
 * MOCK MIDDLEWARE: Kiểm tra quyền Admin
 * Trong dự án thực tế, bạn sẽ dùng JWT để lấy role từ token
 */
const isAdmin = (req, res, next) => {
    // Giả sử client gửi role qua header hoặc body
    const userRole = req.headers['x-user-role'];
    if (userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Quyền truy cập bị từ chối! Chỉ Admin mới được thực hiện." });
    }
};

// CREATE: Thêm sự kiện mới (Chỉ Admin)
router.post('/', async (req, res) => { // Bỏ 'authenticate, isAdmin' ở giữa
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ: Lấy danh sách (Ai cũng xem được)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server", error: err.message });
    }
});

// UPDATE: Sửa sự kiện (Chỉ Admin)
router.put('/:id', isAdmin, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedEvent) return res.status(404).json({ message: "Không tìm thấy sự kiện!" });
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi cập nhật", error: err.message });
    }
});

// DELETE: Xóa sự kiện (Chỉ Admin)
router.delete('/:id', isAdmin, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: "Sự kiện không tồn tại!" });
        res.status(200).json({ message: "Xóa thành công!" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa", error: err.message });
    }
});

module.exports = router;