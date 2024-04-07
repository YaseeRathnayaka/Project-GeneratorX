// Dashboard.js
import React, { useState, useEffect } from 'react';
import { database, auth } from '../../firebase';
import './Dashboard.css';
import img from '../../../src/assets/Gen Xgenx.png';
import * as XLSX from 'xlsx';
import ApexChart from './ApexChart';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    voltage: 0,
    current: 0,
    coolentLevel: 0,
    fuelLevel:0,
    timestamp: 0,
  });
  const [tempratureLabel,setTempratureLabel] = useState('Temprature')
  const [switchStatus, setSwitchStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User UID (Authentication):', user.uid);
        listenForDataChanges(user.uid);
        setupSwitchStatusListener(user.uid);
      } else {
        console.log('No user authenticated.');
      }
    });

    return () => unsubscribe();
  }, []);

  const listenForDataChanges = uid => {
    try {
      const dataRef = database.ref(`/UsersData/${uid}/readings`);

      dataRef.on('value', snapshot => {
        const latestEntry = Object.values(snapshot.val()).pop();
        console.log('Received Data:', latestEntry); // Log received data
        setSensorData(latestEntry);
      });
    } catch (error) {
      console.error('Error setting up real-time data listener:', error);
    }
  };

  const setupSwitchStatusListener = uid => {
    try {
      const switchRef = database.ref(`/UsersData/${uid}/switchStatus`);

      switchRef.on('value', snapshot => {
        const status = snapshot.val();
        setSwitchStatus(status);

        
      });
    } catch (error) {
      console.error('Error setting up switch status listener:', error);
    }
  };


  const handleDownload = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const dataRef = database.ref(`/UsersData/${user.uid}/readings`);
        const snapshot = await dataRef.limitToLast(1000).once('value');
        const data = snapshot.val();
        exportToExcel(data);
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  const exportToExcel = data => {
    if (!data || Object.keys(data).length === 0) {
      console.error('No data to export.');
      return;
    }

    const workbook = XLSX.utils.book_new();

    // Convert data object to an array of arrays
    const sheetData = Object.values(data).map(entry => Object.values(entry));

    if (sheetData.length === 0 || sheetData[0].length === 0) {
      console.error('Invalid data format.');
      return;
    }

    // Log the sheetData for debugging
    console.log('Sheet Data:', sheetData);

    // Ensure sheetData has consistent column lengths
    const columnLengths = sheetData.map(row => row.length);
    if (!columnLengths.every(length => length === columnLengths[0])) {
      console.error('Inconsistent column lengths in data.');
      return;
    }

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, ws, 'SensorReadings');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'sensor_readings.xlsx');
  };

  const handleSwitchToggle = () => {
    // Toggle the switch status and update in Firebase
    const newSwitchStatus = !switchStatus;
    console.log('New Switch Status:', newSwitchStatus);
    setSwitchStatus(newSwitchStatus);
    updateSwitchStatus(auth.currentUser.uid, newSwitchStatus);
  };
  

  const updateSwitchStatus = (uid, switchStatus) => {
    try {
      const switchRef = database.ref(`/UsersData/${uid}/switchStatus`);
      switchRef.set(switchStatus);
    } catch (error) {
      console.error('Error updating switch status:', error);
    }
  };
  const navigate = useNavigate();
  const NavigateToService = ()=>{
    navigate('/service');
  }

  return (
    <div className='dashboard-container'>
      <div className='header-div'>
      <header className='header'></header>
      </div>
      <img src={img} className='logo' alt='Image Description' />
      <div className='meter-set'>
        
       
        <div className='gauge'>
            <ApexChart value={sensorData.temperature} label={"Temprature C"}/>
        </div>
        <div className='gauge'>
            <ApexChart value={sensorData.voltage} label={"Voltage V"} />
        </div>
        <div className='gauge'>
            <ApexChart value={sensorData.current} label={"Current A"}/>
        </div>
        <div className='gauge'>
            <ApexChart value={sensorData.fuelLevel} label={"Fuel-Level"}/>
        </div>
        <div className='gauge'>
            <ApexChart value={sensorData.coolentLevel} label={"Coolant-Level"}/>
        </div>
      </div>
      <div>
      <button onClick={handleDownload} className='download-button'>
          Click here to download the Report
        </button>
        <button onClick={handleSwitchToggle} className='switchoffbutton'>
          {switchStatus ? 'Switch ON' : 'Switch OFF'}
        </button>
        <button onClick={NavigateToService} className='servicepagebutton'>
          Click here for service page</button>
      </div>

      
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

export default Dashboard;
