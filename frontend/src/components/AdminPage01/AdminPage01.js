// AdminPage01.js

import React from 'react';
import { Link } from 'react-router-dom';
import gen_X from '../../assets/Gen Xgenx.png';
import icon from '../../assets/icons8-user-100 1.png';
import '../../HomePage.css';
import styles from './AdminPage01.css'; // Import the generated CSS module
import { auth } from '../../firebase.js';
import admin from '../../assets/Admin.png';

const LogoutLink = () => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className={styles.pageStyle}>
      <header className={styles.header}></header>

      <div className={styles.A_P_3_images}>
        <img src={gen_X} alt="gen_x Image" className={styles.A_P_3_images} />
        <div className={styles.A_P_3_logout}>
          <img src={icon} alt="Icon" className={styles.A_P_3_icon1} />
          <button onClick={handleLogout} className={styles.A_P_3_icon2}>
            Log Off
          </button>
        </div>
      </div>

      <div className={styles.imageContainerStyle}>
        <div className={styles.Column2WrapperRow}>
          <div className={styles.Column2Wrapper} style={styles.column2WrapperStyle}>
            <img src={admin} className={styles.adminIcon} alt="Admin Image" />
            <p className={styles.addminP}>
              Click here for all operators related <br />operations
            </p>
            <Link to="/AdminPage3">
              <button className={styles.buttonIcon}>Operator Management</button>
            </Link>
          </div>
          <div className={styles.Column2Wrapper} style={styles.column2WrapperStyle}>
            <img src={admin} className={styles.adminIcon} alt="Admin Image" />
            <p className={styles.addminP}>Click here for all generator related <br />operations</p>
            <Link to="/AdminPage2">
              <button className={styles.buttonIcon}>Generator Management</button>
            </Link>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <p style={{ ...styles.spacedTextStyle, ...styles.footerTextStyle1 }}>GENERATOR X INDUSTRIES</p>
        <p style={styles.footerTextStyle2}>Copyright © 2023 All rights reserved by AD Printers</p>
      </footer>
    </div>
  );
};

export default LogoutLink;
