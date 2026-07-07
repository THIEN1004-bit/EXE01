import { Link } from 'react-router-dom';

export default function AdminDash() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-8 border-r border-gray-100">
        <h1 className="text-xl font-bold text-blue-600 mb-10">Eventverse Admin</h1>
        <ul className="space-y-4">
          <li className="font-semibold text-blue-600 cursor-pointer">Tổng quan</li>
          <li className="text-gray-500 hover:text-blue-600 cursor-pointer transition">Quản lý User</li>
          <li className="text-gray-500 hover:text-blue-600 cursor-pointer transition">Doanh thu</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Bảng điều khiển</h2>
          <Link 
            to="/add" 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            + Tạo sự kiện mới
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Tổng sự kiện</p>
            <h3 className="text-4xl font-bold text-blue-600">45</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Người dùng mới</p>
            <h3 className="text-4xl font-bold text-blue-600">12</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Vé đã bán</p>
            <h3 className="text-4xl font-bold text-blue-600">890</h3>
          </div>
        </div>
      </main>
    </div>
  );
}