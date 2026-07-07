import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const handleCheckout = async () => {
    try {
      // Giả sử giỏ hàng chỉ có 1 vé tại 1 thời điểm
      await axios.post('http://localhost:9999/api/tickets', {
        eventId: cart[0].eventId,
        quantity: 1,
        userId: localStorage.getItem('userId')
      });
      
      toast.success("Thanh toán thành công!");
      localStorage.removeItem('cart');
      setCart([]);
    } catch (err) { // Ở đây, dấu ngoặc nhọn thừa đã được xóa
      console.error("Lỗi thanh toán:", err);
      toast.error("Cập nhật thất bại, vui lòng thử lại");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Giỏ hàng của bạn</h2>
      {cart.length === 0 ? <p>Giỏ hàng trống!</p> : (
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-lg font-semibold">Sự kiện: {cart[0].name}</p>
          <button 
            onClick={handleCheckout} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-700 transition"
          >
            Xác nhận thanh toán
          </button>
        </div>
      )}
    </div>
  );
}