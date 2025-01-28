import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [cred, setCred] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential); 
      setUserData(decoded);
      console.log("User Data", userData)
      setCred(credentialResponse.credential); 
      setError('');
      await axios.post('http://localhost:3001/api/auth/login', {
        name: decoded.name,
        email: decoded.email,
        profilePic: decoded.picture
      }). then((res) => {
        console.log("User data", res.data);
        navigate('/message')
      }).catch((error) => { console.error('Error saving user data', error); setError('Failed to save user')})
    } catch (error) {
      setError('Failed to decode token');
    }
    setLoading(false);
  };
  const handleLoginFailure = () => {
    setError('Login Failed. Please try again!');
  };

  const handleLogout = () => {
    googleLogout(); 
    setUserData(null); 
    setCred('');
    setError(''); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center mb-4">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-6">Login with your Google account to continue.</p>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            useOneTap
            theme="outline"
          />
        </div>

        {loading && <div className="text-center text-gray-500">Logging in...</div>}
      </div>
    </div>
  );
};

export default Login;
