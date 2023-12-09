import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { auth } from 'utils/firebase';

import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <nav className={styles.navigation}>
        {user ? (
          <NavLink className={styles.link} to="/home">
            Home
          </NavLink>
        ) : (
          <>
            <NavLink className={styles.link} to="/login">
              Login
            </NavLink>
            <NavLink className={styles.link} to="/register">
              Register
            </NavLink>
          </>
        )}
      </nav>
      <div className={styles.title}>Welcome to app!!!</div>
    </>
  );
}

export default WelcomePage;
