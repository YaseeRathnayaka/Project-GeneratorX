// ServicePage.jsx

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './ServicePage.css';

const ServicePage = () => {
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem('reminders')) || []
  );

  const [newReminder, setNewReminder] = useState({
    text: '',
    dueDate: null,
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const addReminder = () => {
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));

    setNewReminder({ text: '', dueDate: null, days: 0, hours: 0, minutes: 0 });
  };

  const addNotification = (text) => {
    setNotifications([...notifications, text]);
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const deleteNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      reminders.forEach((reminder, index) => {
        const dueDateTime = moment(reminder.dueDate).add({
          days: reminder.days,
          hours: reminder.hours,
          minutes: reminder.minutes,
        });
        const timeDiff = dueDateTime.diff(moment(), 'seconds');

        if (timeDiff <= 0) {
          const notificationText = `${reminder.text} - Due date is reached!`;
          showNotification(notificationText);
          addNotification(notificationText);
          setReminders(reminders.filter((_, i) => i !== index));
          localStorage.setItem('reminders', JSON.stringify(reminders));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  const showNotification = (text) => {
    console.log(`Notification: ${text}`);
  };

  return (
    <div className="service-page">
      <header className="header"></header>
      <h1>Service Page</h1>
      <div className="reminder-input">
        <input
          type="text"
          placeholder="Enter reminder text"
          value={newReminder.text}
          onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
        />
        <DatePicker
          selected={newReminder.dueDate}
          onChange={(date) => setNewReminder({ ...newReminder, dueDate: date })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select due date and time"
        />
        <div>
          <label>Days:</label>
          <input
            type="number"
            value={newReminder.days}
            onChange={(e) => setNewReminder({ ...newReminder, days: parseInt(e.target.value) })}
          />
          <label>Hours:</label>
          <input
            type="number"
            value={newReminder.hours}
            onChange={(e) => setNewReminder({ ...newReminder, hours: parseInt(e.target.value) })}
          />
          <label>Minutes:</label>
          <input
            type="number"
            value={newReminder.minutes}
            onChange={(e) => setNewReminder({ ...newReminder, minutes: parseInt(e.target.value) })}
          />
        </div>
        <button onClick={addReminder}>Add Reminder</button>
      </div>
      <div className="reminders-list">
        <h2>Reminders</h2>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index}>
              {reminder.text} - Due: {moment(reminder.dueDate).format('MMMM D, YYYY h:mm A')}
              <button onClick={() => deleteReminder(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="notifications-list">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              {notification}
              <button onClick={() => deleteNotification(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default ServicePage;
