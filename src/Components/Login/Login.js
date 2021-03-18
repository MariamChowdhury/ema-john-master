import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeFirebaseFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";

initializeFirebaseFramework();

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false,
  });

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res,true)
    });
  };
  const googleSignOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res,false)
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res,true)
    });
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res,true)
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res,true)
      });
    }
    e.preventDefault();
  };
  const handleBlur = (e) => {
    let handleValid = true;
    if (e.target.name === "email") {
      const validateEmail = /\S+@\S+\.\S+/.test(e.target.value);
      handleValid = validateEmail;
    }
    if (e.target.name === "password") {
      const passLength = e.target.value.length > 6;
      const passValidation = /\d{1}/.test(e.target.value);
      handleValid = passLength && passValidation;
    }
    if (handleValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
const handleResponse =(res,redirect) =>{
  setUser(res);
  setLoggedInUser(res);
 if(redirect){
  history.replace(from);
 }
}
  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={googleSignOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}{" "}
      <br />
      <button onClick={fbSignIn}>Sign in with Facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome,{user.name}!</p>
          <p>Your email is: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New User Sign up</label>
      <br />
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            placeholder="Name"
            name="email"
            required
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          onBlur={handleBlur}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onBlur={handleBlur}
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "logged in"} successfully!
        </p>
      )}
    </div>
  );
}

export default Login;
