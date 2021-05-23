import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SignInContext } from "../Context/SignInContext";

const LogInUserfunc = () => {
  const [userCheck, setuserCheck] = useState({ email: "", password: "" });

  const userInfo = (e) => {
    const { name, value } = e.target;
    if (name === "email") setuserCheck({ ...userCheck, email: value });
    if (name === "password") setuserCheck({ ...userCheck, password: value });
  };
  const { email, password } = userCheck;
  const { logIn } = useContext(SignInContext);
  return (
    <>
      <form className="form" method="#">
        <div className="form-header">
          <h1>Login User</h1>
        </div>
        <div className="form-input">
          <label>Enter email</label>
          <input
            onChange={(e) => userInfo(e)}
            name="email"
            value={email}
            type="email"
            className="input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-input">
          <label>Enter Password</label>
          <input
            onChange={(e) => userInfo(e)}
            name="password"
            value={password}
            type="password"
            className="input"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-input">
          <input
            onClick={(e) => logIn(e, email, password, setuserCheck)}
            type="submit"
            className="input"
          />
        </div>
        <div className="form-input">
          <small>Not an User?</small>
          <Link to="/Signup">
            <button className="btn btn-primary">SignUp</button>
          </Link>
        </div>
      </form>
    </>
  );
};
export default LogInUserfunc;
