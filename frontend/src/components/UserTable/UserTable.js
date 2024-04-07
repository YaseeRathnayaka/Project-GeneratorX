// UserTable.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import './UserTable.css';

const firebaseConfig = {
  apiKey: "AIzaSyCjLiE1yQU-L860nsmFXKe3LJVohw1T7ec",
  authDomain: "genx-v42.firebaseapp.com",
  databaseURL: "https://genx-v42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "genx-v42",
  storageBucket: "genx-v42.appspot.com",
  messagingSenderId: "204000689935",
  appId: "1:204000689935:web:883000c61d00e9f968887a"};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRecords = await auth.listUsers();
        const userList = userRecords.users.map((userRecord) => ({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName || '',
          lastSignInTime: userRecord.metadata.lastSignInTime,
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a new user signs in, add them to the state
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          lastSignInTime: user.metadata.lastSignInTime,
        };
        setUsers((prevUsers) => [newUser, ...prevUsers]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeleteUser = async (uid) => {
    try {
      await auth.deleteUser(uid);
      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
      console.log('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword);
      const newUser = {
        uid: userCredential.user.uid,
        email: newUserEmail,
        displayName: '',
        lastSignInTime: null,
      };
      setUsers((prevUsers) => [newUser, ...prevUsers]);
      console.log('User added successfully.');
      setNewUserEmail('');
      setNewUserPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleAddUser} inline>
        <FormGroup className="mb-2 mr-sm-2">
          <FormLabel className="mr-sm-2">Email</FormLabel>
          <FormControl
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2">
          <FormLabel className="mr-sm-2">Password</FormLabel>
          <FormControl
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" className="mb-2">Add User</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Display Name</th>
            <th>Last Sign-In Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.uid}</td>
              <td>{user.email}</td>
              <td>{user.displayName}</td>
              <td>{user.lastSignInTime}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.uid)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
