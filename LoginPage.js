import React, { useState } from "react";
import "./LoginPage.css";
import { useDispatch } from "react-redux";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [pwdError, setpwdError] = useState("");
  // var regex_name = /^[a-zA-Z]*/;
  var regex_name = /^[A-Za-z0-9_]{6,20}$/
  var regex_email= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var regex_pwd= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === "")
    {
      namevalidator();
      return;
    }
    if(email === "")
    {
      emailvalidator();
      return;
    }
    if(password === "")
    {
      pwdvalidator();
      return;
    }
    try {
      dispatch({
        type: "login__done",
        payload: {
          name: name,
          email: email,
          password: password,
          loggedin: true,
        },
      });

      props.history.push("/home");
    } catch {
      dispatch({
        type: "login__failed",
        payload: { loggedin: false },
      });
    }
  };

  const namevalidator = () => {
    if(name === ""){
      setnameError("Name field should not be empty")
      return;
    }
    else if (!regex_name.test(name)) {
      setnameError("Name should contain min 6 , max 20 letters");
      return;
    }
    else 
      setnameError("");
  };

  const emailvalidator = () => {
    if(email === ""){
      setemailError("Email field should not be empty")
      return;
    }
    else if (!regex_email.test(email)) {
      setemailError("It should be in valid email format");
      return;
    }
    else 
      setemailError("");
  };

  const pwdvalidator = () => {
    if(password === ""){
      setpwdError("Password field should not be empty")
      return;
    }
    else if (!regex_pwd.test(password)) {
      setpwdError("Password should contain minimum 8 characters, at least one letter,one number and one  special character.");
      return;
    }
    else 
      setpwdError("");
  };

  return (
    <div className="bg">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Sign In</h3>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => namevalidator()}
                onFocus={() => setnameError("")}
              />
              {nameError !== "" ? (
                <span className="error">{nameError}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder={"Enter email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => emailvalidator()}
                onFocus={() => setemailError("")}
              />
              {emailError !== "" ? (
                <span className="error">{emailError}</span>
              ) : (
                <></>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => pwdvalidator()}
                onFocus={() => setpwdError("")}
              />
               {pwdError !== "" ? (
                <span className="error">{pwdError}</span>
              ) : (
                <></>
              )}
            </div>
           

            <button type="submit" className="btn btn-primary btn-block"  disabled={(nameError !== "" || emailError !== "" || pwdError !== "")?true:false}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
