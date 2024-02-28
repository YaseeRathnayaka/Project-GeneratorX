import React from 'react';
import { Link } from 'react-router-dom';
import gen_X from '../../assets/Gen Xgenx.png';
import icon from '../../assets/icons8-user-100 1.png';
import '../../HomePage.css';
import { auth } from '../../firebase.js';
import admin from '../../assets/Admin.png';
import './OperatorPage01.css';

const LogoutLink = () => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className="page">
      <header className="header"></header>

      <div className="A_P_3_images">
        <img src={gen_X} alt="gen_x Image" className="A_P_3_images" />
        <div className="A_P_3_logout">
          <img src={icon} alt="Icon" className="A_P_3_icon1" />
          <button onClick={handleLogout} className="A_P_3_icon2">
            Log Off
          </button>
        </div>
      </div>

      <div className="image-container">
        <div className="Column2WrapperRow">
          <div className='column-2-wrapper' id="column2-wrapper-1">
            <img src={admin} className="admin-icon" alt="Admin Image" />
            <p className="admin-paragraph">
            Click here for all generator details and previous generator reports. <br />
            </p>
            <Link to="/OperatorPage03">
              <button className="button-icon">Generator List</button>
            </Link>
          </div>
          <div className='column-2-wrapper' id="column2-wrapper-2">
            <img src={admin} className="admin-icon" alt="Admin Image" />
            <p className="admin-paragraph">Click here for the generator dashboard of the selected generator. <br /></p>
            <Link to="/OperatorPage02">
              <button className="button-icon">Generator Dashboard</button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p className="spaced-text footer-text-1">GENERATOR X INDUSTRIES</p>
        <p className="footer-text-2">Copyright © 2023 All rights reserved by AD Printers</p>
      </footer>
    </div>
  );
};

export default LogoutLink;
