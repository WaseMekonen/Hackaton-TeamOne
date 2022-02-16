import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { SpinnerCircular } from "spinners-react";
import { API_KEY } from '../../logic/keys';
import styles from './register.module.css';

export default function Register({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorFromServer, setErrorFromServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectToSearch, setRedirectToSearch] = useState(false);

  function register() {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    setLoading(true)
    axios
      .post(url, {
        email,
        password,
        confirmPassword
      })
      .then(function (response) {
        setLoading(false)
        setErrorFromServer(false);
        setAuth(response.data)
        console.log(response)
        setRedirectToSearch(true)
        localStorage.setItem("userData", JSON.stringify(response.data))
        newRegister(response.data.localId)
      })
      .catch(function (error) {
        setErrorFromServer(error);
        setLoading(false)
        console.log(error);
      });
  };

  function newRegister(localId){
    const newUser = {localId,favorites:[]};

    axios.post("/users",newUser)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))

  }

  // if (redirectToSearch) {
  //   return <Redirect to='/Search' />
  // }

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (password.length < 6) {
            alert("password should be at least 6 characters");
          }
          else if (password !== confirmPassword) {
            alert("password must be the same as confirm password");
          }
          else {
            register();
          }
        }}
      >
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} autoComplete="on"/>
        <br></br>
        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="on"/>
        <br></br>
        <input type="submit" value="Register" disabled={!email || !password || !confirmPassword} />
      </form>
      {loading ? <SpinnerCircular /> : ""}
      <p style={{ color: "red" }}>
        {errorFromServer ? "Error From Server" : ""}
      </p>
    </div>
  )
}
