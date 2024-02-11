// Dashboard.js
import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import './Dashboard.css';
import img from '../assets/logo.png';
import * as XLSX from 'xlsx';
import ApexChart from './ApexChart';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    current: 0,
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

        // Update emergency status based on switch status
        updateEmergencyStatus(uid, status);
      });
    } catch (error) {
      console.error('Error setting up switch status listener:', error);
    }
  };

  const updateEmergencyStatus = (uid, switchStatus) => {
    try {
      const emergencyRef = database.ref(`/UsersData/${uid}/emergency`);

      // Update emergency status based on switch status
      emergencyRef.set(switchStatus);
    } catch (error) {
      console.error('Error updating emergency status:', error);
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

  return (
    <div className='dashboard-container'>
      <header className='header'></header>
      <img src={img} className='logo' alt='Image Description' />
      <div className='meter-set'>
       
        <div className='gauge'>
            <ApexChart value={sensorData.temperature} label={tempratureLabel}/>
        </div>
        <div className='gauge'>
            <ApexChart value={sensorData.humidity} />
        </div>
        <div className='gauge'>
            <ApexChart value={sensorData.current} />
        </div>
        <button onClick={handleDownload} className='download-button'>
          Report
        </button>
      </div>
      <div>
        <button onClick={handleSwitchToggle}>
          {switchStatus ? 'Switch ON' : 'Switch OFF'}
        </button>
      </div>
      <footer className='footer'>
        <p1 className='footer-content'>
          G E N E R A T O R X I N D U S T R I E S
        </p1>
        <br />
        <p2 className='footer-bottom-text'>
          Copyright © 2023 All rights reserved by Gen X
        </p2>
      </footer>
    </div>
  );
};

export default Dashboard;
