import { useState } from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import './AuthPage.css';

function AuthPage({ setUser }) {
  const [choice, setChoice] = useState(false);
  return (
    <main className ="AuthPage">
      <div>
        {choice ? <SignIn setUser={setUser} /> : <SignUp setUser={setUser} />}
        <button onClick={() => setChoice(!choice)}>
          {choice ? "Sign Up Here" : "Sign In Here"}
        </button>
      </div>
    </main>
  );
}

export default AuthPage;
