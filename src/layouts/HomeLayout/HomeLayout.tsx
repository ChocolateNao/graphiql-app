import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { auth, logout } from 'utils/firebase';

import styles from './HomeLayout.module.scss';

function HomeLayout() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading, navigate]);
  return (
    <div>
      <header>
        <nav className={styles.navigation}>
          {user && (
            <>
              <NavLink className={styles.welcome} to="/">
                Welcome
              </NavLink>
              <div>En</div>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
