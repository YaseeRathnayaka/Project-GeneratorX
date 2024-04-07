// src/components/AdminPage3.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../HomePage.css';
import gen_X from '../../assets/Gen Xgenx.png';
import { auth } from '../../firebase';
import icon from '../../assets/icons8-user-100 1.png';
import './AdminPage03.css';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';

const AdminPage3 = () => {
  const [formData, setFormData] = useState({});
  const [formVisibility, setFormVisibility] = useState(false);
  const [formArray, setFormArray] = useState([]);

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = '/login';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormArray((prevArray) => [...prevArray, formData]);
    setFormData({});
    setFormVisibility(false);
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="pageStyle">
      <header className="header"> </header>
      <div id="A_P_3_images" className="A_P_3_images">
        <img src={gen_X} alt="gen_x Image" className="gen_X" />
        <div id="A_P_3_logout" className="A_P_3_logout">
          <img src={icon} alt="Icon" className="A_P_3_icon1" />
          <button onClick={handleLogout} className="A_P_3_icon2">
            Log Off
          </button>
        </div>
      </div>

      {formVisibility ? (
        <div style={{ marginTop: '100px' }}>
          <form
            className="formVisibility_form"
            id="FormInput"
            onSubmit={handleFormSubmit}
          >
            <p>User Details Sheet</p>
            <label htmlFor="User_Name">User Name</label>
            <input
              type="text"
              id="User_Name"
              name="User_Name"
              placeholder="User Name"
              value={formData.User_Name || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="User_ID">User ID</label>
            <input
              type="text"
              id="User_ID"
              name="User_ID"
              placeholder="User ID"
              value={formData.User_ID || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              value={formData.Password || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="NIC">NIC</label>
            <input
              type="text"
              id="NIC"
              name="NIC"
              placeholder="NIC"
              value={formData.NIC || ''}
              onChange={handleInputChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <div className="imageContainerStyle">
          <button className="buttonIconStyle1" onClick={toggleFormVisibility}>
            Add User <FaPlusCircle className="faPlusCircle" />
          </button>
          <input
            type="text"
            className="buttonIconStyle2"
            placeholder="Search Users"
            onChange={handleInputChange}
          />
          <FaSearch className="buttonIconStylei" />
          {formArray.length > -1 && (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_header">User Name</th>
                    <th className="table_header">User ID</th>
                    <th className="table_header">Password</th>
                    <th className="table_header">NIC</th>
                    <th className="table_header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formArray.map((data, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.25)' }}
                    >
                      <td className="table_data">{data.User_Name}</td>
                      <td className="table_data">{data.User_ID}</td>
                      <td className="table_data">{data.Password}</td>
                      <td className="table_data">{data.NIC}</td>
                      <td className="table_data">{data.Actions}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table_footer">
                  <tr style={{ textAlign: 'center' }}>&lt; 1,2,3,4 &gt;</tr>
                </tfoot>
              </table>
              <div>
                <p className="p_footer">
                  <a href="/AdminPage1" style={{ textDecoration: 'none', color:'black' }}>
                    &lt; Back
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

<div className='footer-div'>
      <footer className='footer'>
        <p1 className='footer-content'>
          G E N E R A T O R X I N D U S T R I E S
        </p1>
        <br/>
        <p2 className='footer-bottom-text'>
          Copyright © 2023 All rights reserved by Gen X
        </p2>
      </footer>
      </div>
    </div>
  );
};

export default AdminPage3;
