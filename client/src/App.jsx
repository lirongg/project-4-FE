import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/Profile';
import Search from './pages/Search';
import CreateItem from './pages/CreateItem';

function App() {
  const [user, setUser] = useState(1);
  // State is temporary at 1 so user do not have to login in be in homepage, to change to null

  const handleSignOut = () => {
    // Implement sign out logic here (e.g., clear user session, reset state)
    setUser(null);
  };

  return (
    <>
      <div>
        {user ? (
          <Router>
            <Navbar
              user={user}
              handleSignOut={handleSignOut}
            />
            <Routes>
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/myprofile" element={<MyProfile user={user} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/create" element={<CreateItem />}/>
            </Routes>
          </Router>
        ) : (
          <Router>
            <Routes>
              <Route
                path="/*"
                element={<AuthPage setUser={setUser} />}
              />
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
