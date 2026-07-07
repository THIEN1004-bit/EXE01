const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { userId, eventId, quantity } = req.body;
        
        // 1. Kiểm tra sự kiện và cập nhật số vé
        const event = await Event.findById(eventId).session(session);
        if (event.ticketsSold + quantity > event.maxTickets) {
            throw new Error("Sự kiện đã hết vé!");
        }
        
        event.ticketsSold += quantity;
        await event.save({ session });

        // 2. Lưu vé mới
        const newTicket = new Ticket({ userId, eventId, quantity, totalPrice: event.price * quantity });
        await newTicket.save({ session });

        await session.commitTransaction();
        res.status(201).json({ message: "Mua vé thành công!" });
    } catch (err) {
        await session.abortTransaction();
        res.status(400).json({ message: err.message });
    } finally {
        session.endSession();
    }
});

module.exports = router;