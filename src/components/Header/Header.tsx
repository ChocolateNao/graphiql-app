import { Suspense, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';

import LanguageSelect from 'components/LanguageSelect';
import Loader from 'components/Loader';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth, logout } from 'utils/firebase';

import styles from './Header.module.scss';

function Header() {
  const [user] = useAuthState(auth);
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

  return (
    <Suspense fallback={<Loader />}>
      <header className={`${styles.sticky} ${isSticky ? styles.shrink : ''}`}>
        <nav className={styles.navigation}>
          <div className={styles.navigation_left}>
            <div className={styles.logo} />
            <NavLink className={styles.welcome} to="/">
              {t('navigation.welcome')}
            </NavLink>
            {user && (
              <NavLink className={styles.home} to="/home">
                {t('navigation.home')}
              </NavLink>
            )}
          </div>
          <div className={styles.navigation_right}>
            <LanguageSelect />
            <NavLink className={styles.settings} to="/endpoint-settings" />
            {user ? (
              <button
                className={`${styles.link} ${styles.logout}`}
                type="button"
                onClick={logout}
              >
                {t('authorization.logout')}
              </button>
            ) : (
              <div className={styles.buttons}>
                <NavLink className={styles.link} to="/login">
                  {t('authorization.login')}
                </NavLink>
                <NavLink className={styles.link} to="/register">
                  {t('authorization.register')}
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>
    </Suspense>
  );
}

export default Header;
