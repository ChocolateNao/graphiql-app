import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { auth, logout } from 'utils/firebase';

import styles from './HomeLayout.module.scss';

function HomeLayout() {
  const [user, loading] = useAuthState(auth);
  const [isSticky, setSticky] = useState(false);
  const navigate = useNavigate();

  const checkScrollTop = () => {
    setSticky(window.pageYOffset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (!user) {
        navigate('/');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className={`${styles.sticky} ${isSticky ? styles.shrink : ''}`}>
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
