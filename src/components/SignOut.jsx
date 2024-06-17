import { Link } from 'react-router-dom'
import { logOut } from '../utilities/users-service';

export default function SignOut({ user, setUser }) {
    function handleSignOut() {
      console.log('Logging out...'); // Add a log statement
      logOut();
      console.log('User logged out'); 
      setUser(null);
    }
  
    return (
      <div>
      <Link to="/" onClick={handleSignOut}>
      Sign Out
    </Link>
      </div>
    );
  }