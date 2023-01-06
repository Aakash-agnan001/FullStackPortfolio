import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/Link'
import React from 'react'
import firebase from '../firebase/clientApp'
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function Home() {
  // const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    onAuthStateChanged(auth, function (user) {
      if (user) {
        location.href = "/chatRoom"
      }
      else {
        location.href = "/"
      }
    })
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>Welcome</h1>
      <h1 className={styles.to}>To</h1>
      <h1 className={styles.sententia}>Sententia</h1>
      <div className={styles.btn}>
        <button className={styles.signIn} onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  )
}