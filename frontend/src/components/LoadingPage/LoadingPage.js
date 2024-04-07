import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';
import img from '../../assets/GenX.png';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="loading-page">
      <header className="header"></header>

      <div className="content">
        <img src={img} className="image" alt="Logo" />
      </div>

      <footer className="footer_">
      <p className="footerTextStyle1">
        GENERATOR X INDUSTRIES 
      </p>
      <p className="footerTextStyle2">
        Copyright © 2023 All rights reserved by AD Printers
      </p>      
      </footer>
    </div>
  );
}

export default LoadingPage;
