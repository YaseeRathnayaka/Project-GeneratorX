import React from 'react';
import '../../HomePage.css'; 
import { auth } from '../../firebase';
import gen_X from '../../assets/Gen Xgenx.png';
import icon from '../../assets/icons8-user-100 1.png';
import './OperatorPage03.css'; 

const OperatorPage3 = () => {
  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="pageStyle"> 
      <header className="header"> </header>
      <div id='A_P_3_images' className="A_P_3_images">
        <img src={gen_X} alt="gen_x Image" className="gen_X" />
        <div id='A_P_3_logout' className="A_P_3_logout">
          <img src={icon} alt="Icon" className="A_P_3_icon1" />
          <button onClick={handleLogout} className="A_P_3_icon2">
            Log Off
          </button>
        </div>
      </div>
      <div className="imageContainerStyle">
        Generator List
      </div>

      <footer className="footer">
        <p className="spacedTextStyle footerTextStyle1">GENERATOR X INDUSTRIES</p>
        <p className="footerTextStyle2">Copyright © 2023 All rights reserved by AD Printers</p>
      </footer>
    </div>
  );
};

export default OperatorPage3;
