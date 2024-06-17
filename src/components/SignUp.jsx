import React, { useState } from "react";
import { signUp } from "../utilities/users-api";
import './SignUp.css';

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(evt) {
    setState({ ...state, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signUp(state);
      alert("Sign up is successful! Please sign in now!");
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again!");
    }
  }

  return (
    <div>
      <div className="intro-container">
        <h1>ClutterCritter</h1>
        <p>We Find the Stuff You Forget!</p>
      </div>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={state.name}
            onChange={handleChange}
            required
            className="input-field"
          />
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
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
