import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { auth } from 'utils/firebase';

import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const [user] = useAuthState(auth);
  return (
    <>
      <nav className={styles.navigation}>
        {user ? (
          <NavLink to="/home">Home</NavLink>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
      <div className={styles.title}>Welcome to app!!!</div>
    </>
  );
}

export default WelcomePage;
