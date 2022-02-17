import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { SpinnerCircular } from "spinners-react";
import { API_KEY } from '../../logic/keys'
import styles from './login.module.css'

export default function Login({ setAuth, auth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirectToSearch, setRedirectToSearch] = useState(false);



  function getUserFavorites (localId){
    axios.get(`/users/${localId}`)
    .then(function (response) {
      let data = response.data
      console.log(data);
  }).catch(function (error) {
      console.error(error);
  });
  }


    function logIn() {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        setLoading(true)
        axios
            .post(url, {
                email,
                password
            })
            .then(function (response) {
                console.log(response)
                setLoading(false)
                getUserFavorites(response.data.localId)
                setAuth(response.data)
                setRedirectToSearch(true)
                localStorage.setItem("userData", JSON.stringify(response.data))
            })
            .catch(function (error) { setErrorFromServer(error); setLoading(false) })
    }

    if (redirectToSearch) {
        return <Redirect to='/Search' />
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                logIn();
            }}>
                <input type='email' placeholder="E-mail" onChange={(e) => { setEmail(e.target.value) }} />
                <br></br>
                <input type='password' placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <br></br>
                <input type='submit' value="Log In" disabled={!email || !password} />
            </form>
            {loading ? <SpinnerCircular /> : ""}
            <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
        </div>
    )
}

