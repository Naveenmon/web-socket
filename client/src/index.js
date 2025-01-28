import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, PrivateRoute } from 'react-router-dom'
import Message from './pages/Message';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
const Client_ID = "996154890262-40uvga3154rat51jr30igg3ssbo8s57i.apps.googleusercontent.com"

root.render(
  <GoogleOAuthProvider clientId={Client_ID}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/message' element={<Message />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

