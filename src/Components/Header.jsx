import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/Store/userSlice";
import { useEffect } from "react";
import { APP_LOGO, USER_Profile_LOGO } from "../assets/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        dispatch(removeUser);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        navigate("error");
      });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribed when compontnt unmount
    return () => unsubscribed();
  }, []);

  return (
    <div>
      <div className="absolute w-screen px-6 py-3 bg-gradient-to-b from-gray-800 z-10 flex justify-between items-center">
        <img className="w-44 object-contain" src={APP_LOGO} alt="App-Logo" />
        {user && (
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded object-cover "
              src={USER_Profile_LOGO}
              alt="User Profile Logo"
            />

            <div className="text-gray-300 text-sm">
              <p className="font-semibold">{user.displayName}</p>
              <button
                onClick={handleSignout}
                className="font-bold  cursor-pointer hover:text-red-400 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
