import React, { useState } from 'react';
import { signUp } from "../utilities/users-api";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const userInput = { username, email, password };
      const { token } = await signUp(userInput);
      localStorage.setItem('token', token);
      setUser(userInput);
      alert("Sign up is successful");
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again");
    }
    console.log('Sign up with:', username, email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
