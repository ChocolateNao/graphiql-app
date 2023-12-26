import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';

import LanguageSelect from 'components/LanguageSelect';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth, logout } from 'utils/firebase';

import styles from './Header.module.scss';

function Header() {
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
    <header className={`${styles.sticky} ${isSticky ? styles.shrink : ''}`}>
      <nav className={styles.navigation}>
        <div className={styles.navigation_left}>
          <img
            className={styles.logo}
            src="./src/assets/png/Logo.png"
            alt="Logo"
          />
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
  );
}

export default Header;
