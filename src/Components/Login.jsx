import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2bcf01ee-7ef6-4930-b0d5-c6863853c461/web/IN-en-20241125-TRIFECTA-perspective_a47db038-756f-4f26-b1f7-cfc882b98746_large.jpg"
          alt="App-backgroundImage"
        />
      </div>

      <form className="w-3/12  absolute p-12 bg-black flex flex-col my-40 mx-auto right-0 left-0 text-white rounded-lg opacity-80">
        <h1 className="p-2 my-2 text-left font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 text-left w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 m-2 text-left w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 m-2 text-left w-full bg-gray-700"
        />
        <button className="p-2 m-2 text-center bg-red-700 rounded-lg w-full">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 m-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? " New To Netflix? Sign Up Now "
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
