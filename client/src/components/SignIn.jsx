import React, { useState } from 'react';
import * as usersService from "../utilities/users-service";

function SignIn({setUser}) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value});
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user= await usersService.signIn(state);
      console.log('SignIn successful:', user); 
      setUser(user);
    } catch (err) {
      console.error('SignIn failed:', err); // Debugging log
      setError("Log in failed");
  
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default SignIn;