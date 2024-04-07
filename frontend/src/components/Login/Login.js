import React, { useState } from 'react';
import { auth } from '../../firebase.js';
import centerImage from '../../assets/2nd.png';
import centerImage2 from '../../assets/Gen Xgenx.png';
import './Login.css';
import InputControl from "../InputControl/InputControl";


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
    
 <div className="login-page">
 <header className="header_"></header>

 <div className="container">
   <div>
   <img src={centerImage} className="loginimage" alt="Logo" />
   </div>

       <div className="innerBox">
       <h1 className="heading">Login</h1>
       <InputControl
          label="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required

          placeholder="Enter Password"
        />
   <form onSubmit={handleLogin}>
      <button type="submit" className="login-button">Login</button>
      <p className="forgot-password"><u>Forget Password</u></p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
   </form>    
   </div>
 </div>

 <footer className="footer__">
 <p className="footerTextStyle1_">
        GENERATOR X INDUSTRIES 
      </p>
      <p className="footerTextStyle2_">
        Copyright © 2023 All rights reserved by AD Printers
      </p>      
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