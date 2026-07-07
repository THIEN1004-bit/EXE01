import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth({ isLogin, setRole }) {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return alert("Mật khẩu không khớp!");
    }

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const res = await axios.post(`http://localhost:9999/api/auth${endpoint}`, formData);
      
      if (isLogin) {
        localStorage.setItem('role', res.data.role);
        setRole(res.data.role);
        navigate('/');
      } else {
        alert("Đăng ký thành công!");
        navigate('/login');
      }
    } catch (err) { 
      alert(err.response?.data?.message || "Có lỗi xảy ra!"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
        
        <input className="w-full p-4 mb-4 rounded-2xl border" placeholder="Tên đăng nhập" 
               onChange={e => setFormData({...formData, username: e.target.value})} />
        
        <input className="w-full p-4 mb-4 rounded-2xl border" type="password" placeholder="Mật khẩu" 
               onChange={e => setFormData({...formData, password: e.target.value})} />

        {!isLogin && (
          <input className="w-full p-4 mb-6 rounded-2xl border" type="password" placeholder="Xác nhận mật khẩu" 
                 onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
        )}

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition">
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </button>
      </form>
    </div>
  );
}