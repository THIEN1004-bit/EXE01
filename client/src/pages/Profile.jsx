import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Profile() {
  const [profile, setProfile] = useState({ fullName: '', bio: '', phoneNumber: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:9999/api/profile');
        setProfile(res.data);
      } catch (err) {
        // Cách sửa 1: Dùng biến 'err' để log lỗi ra console giúp bạn debug
        console.error("Lỗi khi tải hồ sơ:", err);
        toast.error("Không tải được hồ sơ");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:9999/api/profile', profile);
      toast.success("Cập nhật thành công!");
    } catch (err) {
      // Cách sửa 2: Dùng biến 'err' để in thông báo lỗi chi tiết hơn
      console.error("Lỗi cập nhật:", err);
      toast.error("Cập nhật thất bại, vui lòng thử lại");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Hồ sơ cá nhân</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input 
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Họ tên"
          value={profile.fullName}
          onChange={e => setProfile({...profile, fullName: e.target.value})}
        />
        <textarea 
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Giới thiệu bản thân"
          value={profile.bio}
          onChange={e => setProfile({...profile, bio: e.target.value})}
        />
        <input 
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Số điện thoại"
          value={profile.phoneNumber}
          onChange={e => setProfile({...profile, phoneNumber: e.target.value})}
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}