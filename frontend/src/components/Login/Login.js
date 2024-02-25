import React, { useState } from 'react';
import { auth } from '../../firebase.js';
import centerImage from '../../assets/2nd.png';
import centerImage2 from '../../assets/Gen Xgenx.png';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="page">
      <header className="header"></header>

      <div className="image-container">
        <div className="image-container-2">
          <div className="column-2-wrapper-1">
            <img src={centerImage} alt="Centered Image" className="center-image" />
          </div>
          <div className="column-2-wrapper-2">
            <div className="column-2">
              <center>
                <div style={{ marginTop: '20px' }}>
                  <img src={centerImage2} alt="Centered2 Image" style={{ width: '151px', height: 'auto' }} />
                </div>
                <form onSubmit={handleLogin}>
                  <p className="input-label">User Name</p>
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-line" /><br /><br />
                  <p className="input-label">Password</p>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-line" /><br /><br />
                  <button type="submit" className="login-button">Login</button>
                  <p className="forgot-password"><u>Forget Password</u></p>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
              </center>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p className="footer-text-1 spaced-text">GENERATOR X INDUSTRIES</p>
        <p className="footer-text-2">Copyright © 2023 All rights reserved by AD Printers</p>
      </footer>
    </div>
  );
};

const LogoutLink = () => {
  const handleLogout = async () => {
    await auth.signOut();
  };
};

export { LoginForm, LogoutLink };
