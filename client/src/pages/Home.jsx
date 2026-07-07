import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:9999/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error("Lỗi khi tải sự kiện:", err);
        toast.error("Không thể tải danh sách sự kiện");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hàm chuyển hướng tới giỏ hàng
  const addToCart = (event) => {
    localStorage.setItem('cart', JSON.stringify([{
      eventId: event._id,
      name: event.name,
      price: event.price
    }]));
    toast.success("Đã thêm vào giỏ!");
    navigate('/cart');
  };

  const filteredEvents = events.filter(e => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* --- CỘT TRÁI --- */}
      <aside className="w-[15%] p-4 hidden lg:block">
        <div className="bg-gradient-to-b from-blue-600 to-blue-400 h-[80vh] rounded-3xl shadow-lg sticky top-6 flex items-center justify-center text-white font-bold opacity-90">
          ADS LEFT
        </div>
      </aside>

      {/* --- CỘT GIỮA --- */}
      <main className="flex-1 p-6">
        <div className="flex items-center gap-4 mb-8">
          <input 
            className="flex-1 p-4 rounded-2xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Tìm kiếm sự kiện..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sự kiện nổi bật</h2>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Đang tải vũ trụ sự kiện...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Không tìm thấy sự kiện nào.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div key={event._id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="h-40 bg-gray-200 rounded-2xl mb-4 overflow-hidden">
                  <img src={`https://picsum.photos/400/200?random=${event._id}`} alt="event" className="w-full h-full object-cover" />
                </div>
                <h2 className="font-bold text-lg mb-1 truncate">{event.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{event.location}</p>
                <button 
                  onClick={() => addToCart(event)}
                  className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition"
                >
                  Mua vé ngay
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- CỘT PHẢI --- */}
      <aside className="w-[15%] p-4 hidden lg:block">
        <div className="bg-gradient-to-b from-pink-500 to-orange-400 h-[80vh] rounded-3xl shadow-lg sticky top-6 flex items-center justify-center text-white font-bold opacity-90">
          ADS RIGHT
        </div>
      </aside>
    </div>
  );
}