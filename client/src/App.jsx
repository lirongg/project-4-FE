// App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import MyProfile from './pages/Profile/Profile.jsx';
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem.jsx';
import { getUser } from './utilities/users-service';
import ViewItems from './pages/ViewItems';
import LocationPage from './components/LocationPage.jsx';
import { NotificationProvider } from './components/NotificationContext';
import RelocateItem from './pages/RelocateItem.jsx';
import EditProfile from './pages/EditProfile.jsx';

function App() {
  const [user, setUser] = useState(null);

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
    <div>
      {user ? (
        <Router>
          <Navbar user={user} setUser={setUser} />
          <NotificationProvider>
            <Routes>
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="/profile/edit" element={<EditProfile user={user} setUser={setUser} />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/edit/:itemId" element={<EditItem />} />
              <Route path="/relocate/:id" element={<RelocateItem />} />
              <Route path="/location/:location" element={<LocationPage />} />
              <Route path="/myprofile" element={<MyProfile user={user} setUser={setUser} />} />
              <Route path="/create" element={<CreateItem />} />
              <Route path="/view" element={<ViewItems />} />
            </Routes>
          </NotificationProvider>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/*" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
