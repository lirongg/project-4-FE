import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/Profile';
import CreateItem from './pages/CreateItem';
import {getUser} from "./utilities/users-service";
import ViewItems from './pages/ViewItems';

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); 


  return (
    <>
      <div>
        {user ? (
          <Router>
            <Navbar
              user={user}
              setUser={setUser}
            />
            <Routes>
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/myprofile" element={<MyProfile user={user} />} />
              <Route path="/create" element={<CreateItem />}/>
              <Route path="/view" element={<ViewItems />}/>
            </Routes>
          </Router>
        ) : (
          <Router>
            <Routes>
              <Route
                path="/*"
                element={<AuthPage setUser={setUser}/>}
              />
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
