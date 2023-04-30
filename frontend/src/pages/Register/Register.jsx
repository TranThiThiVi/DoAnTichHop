import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const navigation = useNavigate();
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  let a = false,
    b = false,
    c = false,
    d = false;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:8000/api/auth/register", {
        image:
          "https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg",
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
        address: "",
        numberPhone: "",
      })
      .then(function (response) {
        // console.log(response);
        setCheck(false);
        handleClick();
        setMessage("Đăng Kí Thành công !!!");
        setStory("success");
        setTimeout(() => {
          navigation("/login");
        }, 2000);
      })
      .catch(function (error) {
        setCheck(false);
        if (error.response.status == 400) {
          handleClick();
          setMessage(`${error.response.data.msg}`);
          setStory("error");
        } else if (error.response.status == 500) {
          handleClick();
          setMessage(`Đăng Kí Không Thành Công `);
          setStory("error");
        }
      });
  };

  const handleOnClickButtonRegister = async () => {
    await checkInputs();
    if (a === true && b === true && c === true && d === true) {
      setCheck(true);
      handleRegister();
    }
  };

  const checkInputs = () => {
    if (usernameValue === "" || usernameValue.length < 10) {
      setErrorFor(
        username,
        "Username cannot be blank or must have 10 characters"
      );
      setCheck(false);
      a = false;
    } else {
      setCheck(false);
      setSuccessFor(username);
      a = true;
    }

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
      setCheck(false);
      b = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email 'abc@gmail.com'");
      setCheck(false);
      b = false;
    } else {
      setCheck(false);
      setSuccessFor(email);
      b = true;
    }

    if (passwordValue === "" || passwordValue.length < 6) {
      setErrorFor(
        password,
        "Password cannot be blank or must have 6 characters"
      );
      setCheck(false);
      c = false;
    } else {
      setCheck(false);
      setSuccessFor(password);
      c = true;
    }

    if (password2Value === "" || password2Value.length < 6) {
      setErrorFor(
        password2,
        "Password2 cannot be blank or must have 6 characters"
      );
      setCheck(false);
      d = false;
    } else if (passwordValue !== password2Value) {
      setErrorFor(password2, "Passwords does not match");
      setCheck(false);
      d = false;
    } else {
      setCheck(false);
      setSuccessFor(password2);
      d = true;
    }
  };

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  };

  const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  };

  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  return (
    <div>
      <div className="container_register">
        <div class="container_register_form">
          <div class="header">
            <h2>Create Account</h2>
          </div>
          <form id="form" class="form">
            <div class="form-control">
              <label for="username">Username</label>
              <input
                type="text"
                minLength="6"
                placeholder="NguyenVanA"
                id="username"
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <div class="form-control">
              <label for="username">Email</label>
              <input
                type="email"
                placeholder="nguyenvana@gmail.com"
                id="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <div class="form-control">
              <label for="username">Password</label>
              <input
                type="password"
                minLength="6"
                placeholder="Password"
                id="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <div class="form-control">
              <label for="username">Password check</label>
              <input
                type="password"
                minLength="6"
                placeholder="Password two"
                id="password2"
                value={password2Value}
                onChange={(e) => setPassword2Value(e.target.value)}
              />
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
          </form>
          <LoadingButton
            className="buttonBack"
            onClick={() => {
              navigation("/home");
            }}
            variant="outlined"
          >
            Back
          </LoadingButton>
          <LoadingButton
            className="buttonRegister"
            onClick={handleOnClickButtonRegister}
            loading={check}
            variant="outlined"
          >
            Submit
          </LoadingButton>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={story} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
