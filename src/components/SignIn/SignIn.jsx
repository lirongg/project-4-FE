import React, { useState } from 'react';
import * as usersService from "../../utilities/users-service";
import './SignIn.css';

function SignIn({ setUser }) {
  const [state, setState] = useState({
    email: "user1@example.com",  // Default email
    password: "password123",        // Default password
  });

  const [error, setError] = useState("");

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await usersService.signIn(state);
      console.log('SignIn successful:', user);
      setUser(user);
    } catch (err) {
      console.error('SignIn failed:', err);
      setError("Log in failed");
    }
  }

  return (
    <div>
      <div className="intro-container"></div>
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
}

export default SignIn;
