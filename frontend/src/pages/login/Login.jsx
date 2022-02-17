import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { SpinnerCircular } from "spinners-react";
import { API_KEY } from '../../logic/keys'
import style from './login.module.css'

export default function Login({ setAuth, setFavorites}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirectToSearch, setRedirectToSearch] = useState(false);

    function getUserFavorites(localId) {
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
        <div className={style.Login}>
            <form className={style.logInForm} onSubmit={(e) => {
                e.preventDefault();
                logIn();
            }}>
                <h3>Log In</h3>
                <input className={style.logInInput} type='email' placeholder="E-mail" onChange={(e) => { setEmail(e.target.value) }} />
                <input className={style.logInInput} type='password' placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <input className={style.button} type='submit' value="Log In" disabled={!email || !password} />
                <section> {loading ? <SpinnerCircular /> : ""} </section>
                <p style={{ color: "red" }}>{errorFromServer ? "Error From Server" : ""}</p>
            </form>
        </div>
    )
}
