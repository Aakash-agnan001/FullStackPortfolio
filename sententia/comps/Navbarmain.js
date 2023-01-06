import Link from 'next/link'
import styles from '../styles/signNav.module.css'

const Navbarmain = () => {
    return (
        <nav className={styles.all}>
            <Link className={styles.logo} href='/chatRoom'>Sententia</Link>
            <Link className={styles.signOut} href='/signIn'>Sign Out</Link>
        </nav>
    );
}

export default Navbarmain;