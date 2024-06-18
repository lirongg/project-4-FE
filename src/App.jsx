import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import MyProfile from './pages/Profile/Profile.jsx';
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem.jsx';
import ViewItems from './pages/ViewItems/ViewItems';
import LocationPage from './components/LocationPage/LocationPage.jsx';
import RelocateItem from './pages/RelocateItem.jsx';
import EditProfile from './pages/Profileedit/EditProfile.jsx';
import logo from './assets/logo.png';
import { getUser } from './utilities/users-service';
import { NotificationProvider } from './components/Notifications/NotificationContext';
import './App.css';

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
    <div>
      <Helmet>
        <title>ClutterCritter</title>
        <meta name="description" content="ClutterCritter helps you organize and find the stuff you forget." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* Conditionally render the logo */}
      {!user && (
        <div className="logo-container">
          <img src={logo} alt="ClutterCritter Logo" className="logo" />
        </div>
      )}

      {user ? (
        <Router>
          <Navbar user={user} setUser={setUser} />
          <NotificationProvider>
            <Routes>
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="/profile/edit" element={<EditProfile user={user} setUser={setUser} />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/edit/:itemId" element={<EditItem user={user} />} /> {/* Pass user as a prop */}
              <Route path="/relocate/:id" element={<RelocateItem />} />
              <Route path="/location/:location" element={<LocationPage />} />
              <Route path="/myprofile" element={<MyProfile user={user} setUser={setUser} />} />
              <Route path="/create" element={<CreateItem user={user} />} /> {/* Pass user as a prop */}
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
