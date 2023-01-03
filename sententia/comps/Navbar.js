import Link from 'next/link'
import styles from '../styles/signNav.module.css'

const Navbar = () => {
    return (
        <nav className={styles.all}>
            <Link className={styles.logo} href="/">Sententia</Link>
        </nav>
    );
}

export default Navbar;