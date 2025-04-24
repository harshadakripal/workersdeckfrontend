import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import './ResetPassword.css'; // ✅ Create this file for styling

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMessage('❌ Reset link invalid');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('❌ Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(`❌ ${data.message || 'Reset password failed'}`);
      } else {
        setSuccessMessage('✅ Password reset successful');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setErrorMessage('❌ Reset password failed. Please try again.');
    }
  };

  return (
    <>
      <HeroSection />
      <div className="reset-form-container">
        <form className="reset-form" onSubmit={handleSubmit}>
          <h2>Reset Your Password</h2>

          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          {successMessage && <p className="success-msg">{successMessage}</p>}

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;