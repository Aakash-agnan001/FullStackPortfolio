import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/sign.module.css'
import Navbar from '../comps/Navbar'

export default function signIn() {
    return (
        <div>
            <Navbar />
            <form className={styles.form}>
                <h3 className={styles.title}>Sign In</h3>

                <div className={styles.email}>
                    <label className={styles.ep}>Email</label>
                    <br />
                    <input className={styles.input} type="email" />
                </div>

                <br />

                <div className={styles.password}>
                    <label className={styles.ep}>Password</label>
                    <br />
                    <input className={styles.input} type="password" />
                </div>

                <button className={styles.btn}>Submit</button>
            </form>
        </div>
    )
}
