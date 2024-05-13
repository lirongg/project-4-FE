import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function AuthPage({ setUser }) {
  const [choice, setChoice] = useState(false);
  return (
    <main>
      <div>
        {choice ? <SignIn setUser={setUser} /> : <SignUp setUser={setUser} />}
        <button onClick={() => setChoice(!choice)}>
          {choice ? "Sign Up Instead" : "Sign In Instead"}
        </button>
      </div>
    </main>
  );
}

export default AuthPage;
