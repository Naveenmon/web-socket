import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PaymentLanding from './pages/LandingPage';
import AudioBookDashboard from './pages/Dashboard';
import TransactionHistory from './Components/TransactionHistory';
import Message from './Components/Message';
import Login from './pages/Login';
import SideMenu from './Components/SideMenu';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';  // Assuming this component is implemented

const root = ReactDOM.createRoot(document.getElementById('root'));
const Client_ID = "996154890262-40uvga3154rat51jr30igg3ssbo8s57i.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId={Client_ID}>
    <BrowserRouter>
      <Routes>
        {/* Public Route for Login */}
        <Route path='/login' element={<Login />} />
        
        {/* Protected Routes with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          {/* Landing Page (before login) */}
          <Route path='/' element={<PaymentLanding />} />

          {/* Shared Layout for Dashboard-related Pages */}
          <Route path='/overview' element={<div className="flex h-screen">
            <SideMenu />
            <div className="flex-1">
              <Header />
              <div className="p-4">
                {/* Content will be rendered here, nested routes will be handled below */}
                <Routes>
                  {/* Nested Routes under /overview */}
                  <Route path='dashboard' element={<AudioBookDashboard />} />
                  <Route path='transactions' element={<TransactionHistory />} />
                  <Route path='messages' element={<Message />} />
                </Routes>
              </div>
            </div>
          </div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
