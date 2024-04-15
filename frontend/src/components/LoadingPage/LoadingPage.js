import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';
import img from '../../assets/GenX.png';
import Footer from '../Footer/Footer';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div>
    <div className="loading-page">
      <header className="header_"></header>

      <div className="content">
        <img src={img} className="image" alt="Logo" />
      </div>
    </div>
    <div>
    <div>
        <Footer />
      </div>
    </div>
    </div>
  );
}

export default LoadingPage;
