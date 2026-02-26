import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../Utils/Firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Utils/userSlice";

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
        navigate("error");
      });
  };
  return (
    <div>
      <div className="absolute w-screen px-6 py-2 bg-gradient-to-b from-gray-800 z-10 flex justify-between">
        <img
          className="w-44 "
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="App-Logo"
        />
        {user && (
          <div className="flex">
            <img
              className="w-12 h-14 p-2 m-2"
              src="https://cineverse-gpt.vercel.app/userIcons/yellowUserIcon.jpg"
              alt="User Profile Logo"
            />
            <button onClick={handleSignout} className="font-bold text-black">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
