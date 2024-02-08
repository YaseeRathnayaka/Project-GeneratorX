import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import './Dashboard.css';
import img from '../assets/logo.png';
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    current: 0,
    timestamp: 0,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchData(user.uid);
      } else {
        console.log('No user authenticated.');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkTemperature(sensorData.temperature);
  }, [sensorData.temperature]);

  const fetchData = async (uid) => {
    try {
      const dataRef = database.ref(`/UsersData/${uid}/readings`);
      const snapshot = await dataRef.once('value');
      const latestEntry = Object.values(snapshot.val()).pop();
      setSensorData(latestEntry);
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
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

  const exportToExcel = (data) => {
    const workbook = XLSX.utils.book_new();
    const sheetData = Object.values(data);

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, ws, 'SensorReadings');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'sensor_readings.xlsx');
  };

  const checkTemperature = (temperature) => {
    console.log('Temperature:', temperature);
    if (temperature > 29.5) {
      console.log('High Temperature Alert: Temperature exceeds 29.5°C');
      window.alert('High Temperature Alert: Temperature exceeds 29.5°C');
    }
  };

  return (
    
    <div className='dashboard-container'>
      <header className='header'></header>
      <img src={img} className="logo" alt="Image Description" />
      <div><button onClick={handleDownload} className='Download-button'>Download Sensor Readings</button>
      </div>
      <div className='meters'>
        <div className='box'>
          <h2>Box 1</h2>
          <p>{sensorData.temperature} °C</p>
        </div>
        <div className='box'>
          <h2>Box 2</h2>
          <p>{sensorData.humidity} %</p>
        </div>
        <div className='box'>
          <h2>Box 3</h2>
          <p>{sensorData.current} A</p>
        </div>
      </div>
      
      <footer className='footer'>
        <p1 className='footer-content'>G    E    N    E    R    A    T    O    R     X     I    N    D    U    S    T    R    I    E    S</p1><br />
        <p2 className='footer-bottom-text'>Copyright © 2023 All rights reserved by Gen X</p2>
      </footer>
    </div>
    
  );
};

export default Dashboard;
