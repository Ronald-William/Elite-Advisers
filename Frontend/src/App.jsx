import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing.jsx'
import About from './Pages/About.jsx'
import Taxation from './Pages/Taxation.jsx';
import ContactUs from './Pages/contactUs.jsx';
import Accounting from './Pages/Accounting.jsx';
import Auditing from './Pages/Auditing.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Home from './Pages/Home.jsx';
import EditProfile from './Pages/EditProfile.jsx';
import CreateQuery from './Pages/CreateQuery.jsx';
import Library from './Pages/Library.jsx';

// ⭐ Import Admin Pages
import AdminLogin from './Pages/AdminLogin.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';

function App() {
  return (
    <div className="App">
      <Routes>

        {/* Default → redirect to landing */}
        <Route path='/' element={<Navigate to="/landing" />} />

        <Route path='/landing' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path="/taxation" element={<Taxation />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/accounting" element={<Accounting />} />
        <Route path="/auditing" element={<Auditing />} />
        {/* User Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<EditProfile />} />
        <Route path='/query' element={<CreateQuery />} />
        <Route path='/library' element={<Library />} />

        {/* ⭐ Admin Routes */}
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />

      </Routes>
    </div>
  );
}

export default App;
