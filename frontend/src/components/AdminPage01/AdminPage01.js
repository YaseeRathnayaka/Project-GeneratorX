import React from 'react';
import { Link } from 'react-router-dom';
import gen_X from '../../assets/Gen Xgenx.png';
import icon from '../../assets/icons8-user-100 1.png';
import { auth } from '../../firebase.js';
import admin from '../../assets/Admin.png';
import './AdminPage01.css';

const LogoutLink = () => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className="page">
      <header className="header_"></header>

      <div className="A_P_3_images">
        <img src={gen_X} alt="gen_x Image" className="A_P_3_images" />
        <div className="A_P_3_logout">
          <img src={icon} alt="Icon" className="A_P_3_icon1" />
          <button onClick={handleLogout} className="A_P_3_icon2">
            Log Off
          </button>
        </div>
      </div>

      <div className="image-container_">
        <div className="Column2WrapperRow">
          <div className='column-2-wrapper' id="column2-wrapper-1">
            <img src={admin} className="admin-icon" alt="Admin Image" />
            <p className="admin-paragraph">
              Click here for all operators related <br />operations
            </p>
            <Link to="/userTable">
              <button className="button-icon">Operator Management</button>
            </Link>
          </div>
          <div className='column-2-wrapper' id="column2-wrapper-2">
          <img src={admin} className="admin-icon" alt="Admin Image" />
            <p className="admin-paragraph">Click here for the generator dashboard of the selected generator. <br /></p>
            <Link to="/dashboard">
              <button className="button-icon">Generator Dashboard</button>
            </Link>
          </div>
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

export default LogoutLink;