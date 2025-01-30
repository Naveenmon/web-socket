import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PaymentLanding from './pages/LandingPage';
import DashboardLayout from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './Components/PrivateRoute';  // Assuming this component is implemented

const root = ReactDOM.createRoot(document.getElementById('root'));
const Client_ID = "996154890262-40uvga3154rat51jr30igg3ssbo8s57i.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId={Client_ID}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<PaymentLanding />} />
          <Route path='dashboard' element={<DashboardLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
