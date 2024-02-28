import React, { useState } from 'react';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import '../../HomePage.css';
import './AdminPage02.css';
import gen_X from '../../assets/Gen Xgenx.png';
import icon from '../../assets/icons8-user-100 1.png';

const AdminPage2 = () => {
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
      <header className="header"></header>
      <div className="A_P_3_images">
        <img src={gen_X} alt="gen_x Image" className='gen_X' />
        <div className="A_P_3_logout">
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
            onSubmit={handleFormSubmit}>
            <label htmlFor="ID">Generator ID</label>
            <input
              type="text"
              id="ID"
              name="ID"
              placeholder="Generator ID"
              value={formData.ID || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="Location">Location</label>
            <input
              type="text"
              id="Location"
              name="Location"
              placeholder="Location"
              value={formData.Location || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              id="Description"
              name="Description"
              placeholder="Description"
              value={formData.Description || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="Make">Make</label>
            <input
              type="text"
              id="Make"
              name="Make"
              placeholder="Make"
              value={formData.Make || ''}
              onChange={handleInputChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <div className="imageContainerStyle">
          <button className="buttonIconStyle1" onClick={toggleFormVisibility}>
            Add a Generator <FaPlusCircle className="faPlusCircle" />
          </button>
          <input
            type="text"
            className="buttonIconStyle2"
            placeholder="Search Generator"
            onChange={handleInputChange}
          />
          <FaSearch className="buttonIconStylei" />
          {formArray.length > -1 && (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table_header">Generator ID</th>
                    <th className="table_header">Location</th>
                    <th className="table_header">Description</th>
                    <th className="table_header">Make</th>
                    <th className="table_header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formArray.map((data, index) => (
                    <tr key={index} style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.25)' }}>
                      <td className="table_data">{data.ID}</td>
                      <td className="table_data">{data.Location}</td>
                      <td className="table_data">{data.Description}</td>
                      <td className="table_data">{data.Make}</td>
                      <td className="table_data">{data.Actions}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table_footer">
                <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  &lt; 1,2,3,4 &gt;
                </tr>
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

      <footer className="footer">
        <p className="spacedTextStyle footerTextStyle1">GENERATOR X INDUSTRIES</p>
        <p className="footerTextStyle2">Copyright © 2023 All rights reserved by AD Printers</p>
      </footer>
    </div>
  );
};

export default AdminPage2;
