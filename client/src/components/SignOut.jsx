
export default function SignOut({ user, setUser }) {
    function handleSignOut() {
      logOut();
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