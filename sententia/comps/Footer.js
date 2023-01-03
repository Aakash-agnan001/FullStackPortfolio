import Link from 'next/link'
import styles from '../styles/footer.module.css'
import firebase from '../firebase/clientApp'


const Footer = () => {


    return (
        <div className={styles.all}>
            <form className={styles.form}>
                <input className={styles.input} type="text" placeholder='Type your thoughts ...' />

                <button className={styles.btn} onClick={() => firebase.auth.signOut()}>Submit</button>
            </form>
        </div>
    );
}

export default Footer;