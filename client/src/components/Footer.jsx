export default function Footer() {
  return (
    <footer className="bg-[#1a1c24] text-gray-400 py-16 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Cột 1: Thông tin liên hệ */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Liên hệ</h3>
          <p className="mb-2 hover:text-white cursor-pointer transition">Hotline: 1900.6408</p>
          <p className="mb-2 hover:text-white cursor-pointer transition">Email: support@eventverse.vn</p>
          <p className="text-sm mt-4 leading-relaxed">
            Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Phường Hòa Hưng, TP. Hồ Chí Minh
          </p>
        </div>

        {/* Cột 2: Khách hàng */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Dành cho khách hàng</h3>
          <ul className="space-y-3">
            <li className="hover:text-blue-400 cursor-pointer transition">Quy chế hoạt động</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Chính sách bảo mật</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Cơ chế giải quyết khiếu nại</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Phương thức thanh toán</li>
          </ul>
        </div>

        {/* Cột 3: Follow us */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Follow us</h3>
          <div className="flex gap-4 mb-8">
            {/* Bạn có thể thay bằng icon từ react-icons */}
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">F</div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition cursor-pointer">IG</div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition cursor-pointer">TT</div>
          </div>
          <p className="text-sm">Ngôn ngữ: <span className="text-white font-bold">Tiếng Việt | English</span></p>
        </div>
      </div>
      
      {/* Bản quyền */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
        © 2026 Eventverse by YourTeam. All rights reserved.
      </div>
    </footer>
  );
}