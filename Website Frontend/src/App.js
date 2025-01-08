import './App.css';


import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
// import Navbar from './components/Navbar';
// import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
// import Homepage from './pages/homepage/Homepage';
import Login from './pages/common/authentication/Login';

import AdminDashboard from './pages/admin/AdminDashboard';
import Register from './pages/common/authentication/Register';
import Home from './pages/customer/Home';
import AdminRoutes from './protected_routes/AdminRoutes';

//toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UpdateProduct from './pages/admin/update_product/UpdateProduct';
// import ForgotPassword from './pages/forgot_password.jsx/ForgotPassword';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <ToastContainer />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />


        {/* Only Admin Accessible Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>


        {/* <Route path="/admin/update/:id" element={<UpdateProduct />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/forgot_password' element={<ForgotPassword />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

