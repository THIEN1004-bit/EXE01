import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import Auth from './Auth';
import AdminDash from './AdminDash';
import Profile from './Profile';
import Cart from './Cart';
import AddEvent from '../components/AddEvent';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar role={role} setRole={setRole} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth isLogin={true} setRole={setRole} />} />
            <Route path="/register" element={<Auth isLogin={false} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add" element={<AddEvent />} />
            <Route path="/admin/dashboard" element={<AdminDash />} />
            <Route path="/profile" element={<Profile />} />
            {/* Đã xóa cặp thẻ <> </> thừa ở đây */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;