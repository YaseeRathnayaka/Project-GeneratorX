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
        // User is signed in, fetch data with user.uid
        console.log('User UID (Authentication):', user.uid);
        listenForDataChanges(user.uid);
      } else {
        // No user is signed in, handle accordingly
        console.log('No user authenticated.');
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const listenForDataChanges = (uid) => {
    try {
      const dataRef = database.ref(`/UsersData/${uid}/readings`);

      dataRef.on('value', (snapshot) => {
        const latestEntry = Object.values(snapshot.val()).pop();
        setSensorData(latestEntry);
      });
    } catch (error) {
      console.error('Error setting up real-time data listener:', error);
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
    if (!data || Object.keys(data).length === 0) {
      console.error('No data to export.');
      return;
    }

    const workbook = XLSX.utils.book_new();

    // Convert data object to an array of arrays
    const sheetData = Object.values(data).map(entry =>
      Object.values(entry)
    );

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

  return (
    <div className='dashboard-container'>
      <header className='header'></header>
      <img src={img} className="logo" alt="Image Description" />
      <div className='meters'>
        <div className='box'>
          {/* Box 1 content */}
          <h2>Box 1</h2>
          <p>{sensorData.temperature} °C  </p>
        </div>
        <div className='box'>
          {/* Box 2 content */}
          <h2>Box 2</h2>
          <p>{sensorData.humidity} %</p>
        </div>
        <div className='box'>
          {/* Box 3 content */}
          <h2>Box 3</h2>
          <p>{sensorData.current} A</p>
        </div>
      </div>
      <button onClick={handleDownload}>Download Sensor Readings</button>
      <footer className='footer'>
        <p1 className='footer-content'>G    E    N    E    R    A    T    O    R     X     I    N    D    U    S    T    R    I    E    S</p1><br />
        <p2 className='footer-bottom-text'>Copyright © 2023 All rights reserved by Gen X</p2>
      </footer>
    </div>
  );
};

export default Dashboard;
