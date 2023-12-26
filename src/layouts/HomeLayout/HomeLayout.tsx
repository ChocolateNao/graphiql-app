import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import LanguageSelect from 'components/LanguageSelect';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth, logout } from 'utils/firebase';

import styles from './HomeLayout.module.scss';

function HomeLayout() {
  const [user, loading] = useAuthState(auth);
  const [isSticky, setSticky] = useState(false);
  const navigate = useNavigate();

  const checkScrollTop = () => {
    setSticky(window.pageYOffset > 50);
  };

  const { t } = useLocalization();

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
    <>
      <header className={`${styles.sticky} ${isSticky ? styles.shrink : ''}`}>
        <nav className={styles.navigation}>
          {user && (
            <>
              <NavLink className={styles.welcome} to="/">
                {t('navigation.welcome')}
              </NavLink>
              <LanguageSelect />
              <button type="button" onClick={logout}>
                {t('authorization.logout')}
              </button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default HomeLayout;
