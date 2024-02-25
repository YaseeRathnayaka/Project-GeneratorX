// App.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { LoginForm, LogoutLink } from './Login.js';
import AdminPage1 from '../AdminPage01/AdminPage01.js';



const Mac = () => {

  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <LogoutLink /> : <LoginForm />}
      {user && <AdminPage1 />}
    </div>
  );
};

export default Mac;
