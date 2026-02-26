import { useRef, useState } from "react";
import Header from "./Header";
import ValidateForm from "../Utils/Validate";
import { auth } from "../Utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setError] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    //Validate the form Data

    const validationError = isSignInForm
      ? ValidateForm(email.current.value, password.current.value)
      : ValidateForm(
          email.current.value,
          password.current.value,
          name.current.value,
        );

    // 🔴 If validation fails → stop here
    if (validationError && Object.keys(validationError).length > 0) {
      setError({
        name: validationError.name || "",
        email: validationError.email || "",
        password: validationError.password || "",
        error: "",
      });
      return;
    }

    // 🟢 Validation passed → clear old errors
    setError({
      name: "",
      email: "",
      password: "",
      error: "",
    });

    if (!isSignInForm) {
      // Sign up user Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
              navigate("/browse");
            })
            .catch((error) => {
              const errorMessage = error.message;
              setError((prev) => ({
                ...prev,
                error: errorMessage,
              }));
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
          setError((prev) => ({
            ...prev,
            error: errorMessage,
          }));
          navigate("/");
        });
    } else {
      //Sign in new user Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
          setError((prev) => ({
            ...prev,
            error: errorMessage,
          }));
          navigate("/");
        });
    }
  };

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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12  absolute p-12 bg-black flex flex-col my-40 mx-auto right-0 left-0 text-white rounded-lg opacity-80"
      >
        <h1 className="p-2 my-2 text-left font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <>
            <input
              ref={name}
              type="text"
              placeholder="Enter Full Name"
              className="p-2 m-2 text-left w-full bg-gray-700"
            />
            <p className=" p-2 text-red-800">{errorMessage.name}</p>
          </>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2 text-left w-full bg-gray-700"
        />
        <p className="p-2 text-red-800">{errorMessage.email}</p>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 text-left w-full bg-gray-700"
        />
        <p className="p-2 text-red-800">{errorMessage.password}</p>
        <p className="p-2 text-red-800">{errorMessage.error}</p>
        <button
          className="p-2 m-2 text-center bg-red-700 rounded-lg w-full cursor-ponter"
          onClick={handleButtonClick}
        >
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
