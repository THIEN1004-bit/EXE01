import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ role, setRole }) {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-blue-600">Eventverse</Link>
        
        <div className="flex gap-6 items-center font-bold text-gray-700">
          {/* Nút Tạo sự kiện chỉ Admin mới thấy */}
          {role === 'admin' && (
            <Link to="/add" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition">
              + Tạo sự kiện
            </Link>
          )}
          {role === 'admin' && <Link to="/admin/dashboard">Dashboard</Link>}
          <Link to="/cart" className={location.pathname === '/cart' ? 'text-blue-600' : ''}>Giỏ hàng</Link>
          {role && <Link to="/profile">Hồ sơ</Link>}
          
          {!role ? (
            <>
              <Link to="/login" className="text-gray-600">Đăng nhập</Link>
              <Link to="/register" className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-black transition">Đăng ký</Link>
            </>
          ) : (
            <button onClick={() => { localStorage.clear(); setRole(null); window.location.href = '/'; }} className="text-red-500 hover:text-red-700">
              Đăng xuất
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}