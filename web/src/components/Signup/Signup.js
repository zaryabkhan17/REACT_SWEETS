import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "red",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
      "&:hover fieldset": {
        borderColor: "purple",
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue",
      },
    },
  },
})(TextField);

const Signup = () => {
  const url = "http://localhost:5000";

  const history = useHistory();
  let name = useRef();
  let email = useRef();
  console.log(email);
  let password = useRef();
 
  let [validateEmail, setValidateEmail] = useState("");
  const signup = () => {

    axios({
      method: "post",
      url: url + "/auth/signup",
      data: {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      },
    }).then(
      (response) => {
        console.log("response", response);
        console.log("response doc", response.data.doc);
        alert(response.data.message);
        if (response.data.status === 200) {
          history.push("/login");
        }
      },
      (error) => {
        alert("error", error);
        console.log("error data", error.response);
      }
    );
    return false;
  };
  useEffect(() => {
    console.log(validateEmail);

    axios({
      method: "post",
      url: `${url}/auth/validateEmail`,
      data: {
        email: validateEmail,
      },
    }).then((res) => {
      console.log("validation", res.data.isFound);
      console.log("validation", res.data.data);
      if (res.data.data === null) {
        document.getElementById("validate").innerText = "";
        email.current.style.border = "1px solid blue";
      } else if (res.data.data) {
        email.current.style.border = "1px solid green";
        document.getElementById("validate").innerText =
          "email already registered";
      }
    });
  }, [validateEmail]);

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        {/* <CssTextField
          id="custom-css-standard-input"
          label="Name"
          ref={name}
          variant="outlined"
          required
        />
        <br />
        <CssTextField
          id="custom-css-standard-input"
          label="Email"
          type="email"
          ref={email}
          required
          variant="outlined"
          onChange={(e) => setValidateEmail(e.target.value)}
        />
        <br />
        <CssTextField
          id="custom-css-standard-input"
          label="password"
          type="password"
          ref={password}
          variant="outlined"
          required
        />
        <br />
        <button>Submit</button> */}
        Name: <input type="text" ref={name} required /> <br />
        Email
        <input
          type="email"
          ref={email}
          required
          onChange={(e) => setValidateEmail(e.target.value)}
        />
        <small id="validate"></small>
        <br />
        Password :
        <input type="password" ref={password} required />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
