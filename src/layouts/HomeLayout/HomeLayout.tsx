import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import LanguageSelect from 'components/LanguageSelect';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth, logout } from 'utils/firebase';

import styles from './HomeLayout.module.scss';

function HomeLayout() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useLocalization();
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
    </div>
  );
}

export default HomeLayout;
