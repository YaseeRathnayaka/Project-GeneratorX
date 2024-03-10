// UserTable.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './UserTable.css';

const firebaseConfig = {
    apiKey: "AIzaSyAWfhB2BnxeTKNjOBnXxQ6KupNcWvq5wUE",
    authDomain: "genx-119ab.firebaseapp.com",
    databaseURL: "https://genx-119ab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "genx-119ab",
    storageBucket: "genx-119ab.appspot.com",
    messagingSenderId: "116686597163",
    appId: "1:116686597163:web:804911fb329005b39c0e6e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    userId: '',
    password: '',
    lastLogin: '',
  });

  useEffect(() => {
    const usersRef = database.ref('users');
    usersRef.on('value', (snapshot) => {
      const fetchedUsers = snapshot.val();
      if (fetchedUsers) {
        const userList = Object.keys(fetchedUsers).map((key) => ({
          userId: key,
          ...fetchedUsers[key],
        }));
        setUsers(userList);
      }
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          name: user.displayName || '',
          email: user.email || '',
          userId: user.uid || '',
          lastLogin: user.metadata.lastSignInTime || '',
        });

        // Display authenticated user in the table
        setUsers((prevUsers) => [...prevUsers, userData]);
      }
    });

    return () => {
      usersRef.off();
    };
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddUser = () => {
    const usersRef = database.ref('users');
    const newUserRef = usersRef.push();
    newUserRef.set(userData);

    auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        console.log('User added successfully!');
        alert('User added successfully!');
        handleClose();
      })
      .catch((error) => {
        console.error('Error adding user:', error.message);
        alert('Error adding user. Please check the console for details.');
      });

    setUsers((prevUsers) => [...prevUsers, userData]);
  };

  const handleDeleteUser = (userId) => {
    const userRef = database.ref(`users/${userId}`);
    userRef.remove();
  };

  return (
    <div>
      <Button onClick={handleShow}>Add User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>User ID</th>
            <th>Last Login</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userId}</td>
              <td>{user.lastLogin}</td>
              <td>{user.password}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                name="userId"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
