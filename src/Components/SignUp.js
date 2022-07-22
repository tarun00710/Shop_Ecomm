import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") setUser({ ...user, name: value });
    if (name === "email") setUser({ ...user, email: value });
    if (name === "password") setUser({ ...user, password: value });
    if (name === "confirmpassword")
      setUser({ ...user, confirmpassword: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch("https://glacial-spire-70844.herokuapp.com/registration", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, email, password, confirmpassword })
    });

    const data = await res.json();
    console.log(data.status);
    if (data.status === 422 || !data) {
      window.alert("Invalid registration");
      console.log("Invalid registration");
    } else {
      window.alert("successful registration");
      console.log("successful registration");
      setUser({ name: "", email: "", password: "", confirmpassword: "" });
    }
  };

  const { name, email, password, confirmpassword } = user;

  return (
    <>
      <form class="form" method="#">
        <div class="form-header">
          <h1>SignUp User</h1>
        </div>
        <div class="form-input">
          <label>Enter Name</label>
          <input
            onChange={changeHandler}
            name="name"
            type="text"
            class="input"
            placeholder="Enter your name"
            value={name}
          />
        </div>
        <div class="form-input">
          <label>Enter email</label>
          {}
          <input
            onChange={changeHandler}
            name="email"
            type="email"
            class="input"
            placeholder="Enter your email"
            value={email}
          />
        </div>
        <div class="form-input">
          <label>Enter Password</label>
          <input
            onChange={changeHandler}
            name="password"
            type="password"
            class="input"
            placeholder="Enter password"
            value={password}
          />
        </div>
        <div class="form-input">
          <label>Confirm Password</label>
          <input
            onChange={changeHandler}
            name="confirmpassword"
            type="password"
            class="input"
            placeholder="Confirm password"
            value={confirmpassword}
          />
        </div>
        <div class="form-input">
          <input onClick={postData} value="Signup" type="submit" class="input" />
        </div>
        <div class="form-input">
          <small>Already Registered?</small>
          <Link to="/SignIn">
            <button class="btn btn-primary">SignIn</button>
          </Link>
        </div>
      </form>
    </>
  );
};
export default SignUser;
