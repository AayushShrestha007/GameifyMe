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

import { CartProvider } from './context/cartContext';
import AddGameOption from './pages/admin/AddGameOption';
import AdminDashboard from './pages/admin/AdminDashboard';
import GameOptionManagement from './pages/admin/GameOptionManagement';
import Register from './pages/common/authentication/Register';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import ChooseStyle from './pages/customer/ChooseStyle';
import ContactSuccess from './pages/customer/ContactSuccess';
import ContactUs from './pages/customer/ContactUs';
import Faqs from './pages/customer/Faqs';
import GameOptionPage from './pages/customer/GameOptionPage';
import Home from './pages/customer/Home';
import OrderHistory from './pages/customer/OrderHistory';
import OrderSuccess from './pages/customer/OrderSuccess';
import OurStory from './pages/customer/OurStory';
import Reviews from './pages/customer/Reviews';
import AdminRoutes from './protected_routes/AdminRoutes';
//toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UpdateProduct from './pages/admin/update_product/UpdateProduct';
// import ForgotPassword from './pages/forgot_password.jsx/ForgotPassword';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* <Navbar /> */}
        <ToastContainer />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/choose-style' element={<ChooseStyle />} />
          <Route path="/game-option/:id" element={<GameOptionPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact-success" element={<ContactSuccess />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Only Admin Accessible Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product-management" element={<GameOptionManagement />} />
            <Route path="/admin/add-game-option" element={<AddGameOption />} />
          </Route>


          {/* <Route path="/admin/update/:id" element={<UpdateProduct />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/forgot_password' element={<ForgotPassword />} /> */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

