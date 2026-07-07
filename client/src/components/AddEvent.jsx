import { useState } from 'react';
import axios from 'axios';

export default function AddEvent() {
    const [formData, setFormData] = useState({ name: '', description: '', price: '', location: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Lấy chuỗi "fake-jwt-token"

        try {
            await axios.post('http://localhost:9999/api/events', formData, {
                headers: { Authorization: `Bearer ${token}` } // Bắt buộc phải có dòng này
            });
            alert('Thêm sự kiện thành công!');
        } catch (err) {
            console.error("Lỗi:", err);
            alert('Bạn không có quyền hoặc token không hợp lệ!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Tạo sự kiện mới</h2>
            <input
                required
                className="w-full p-2 mb-3 border rounded"
                placeholder="Tên sự kiện"
                onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                required
                className="w-full p-2 mb-3 border rounded"
                placeholder="Mô tả"
                onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            <input
                required
                className="w-full p-2 mb-3 border rounded"
                type="number"
                placeholder="Giá vé"
                onChange={e => setFormData({ ...formData, price: e.target.value })}
            />
            <input
                required
                className="w-full p-2 mb-3 border rounded"
                placeholder="Địa điểm"
                onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Đăng sự kiện
            </button>
        </form>
    );
}