import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import LanguageSelect from 'components/LanguageSelect';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth } from 'utils/firebase';

import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);
  const { t } = useLocalization();

  if (loading) return <div>{t('loading')}</div>;
  return (
    <div className={styles.welcome}>
      <nav className={styles.navigation}>
        <LanguageSelect />
        {user ? (
          <NavLink className={styles.link} to="/home">
            {t('navigation.home')}
          </NavLink>
        ) : (
          <>
            <NavLink className={styles.link} to="/login">
              {t('authorization.login')}
            </NavLink>
            <NavLink className={styles.link} to="/register">
              {t('authorization.register')}
            </NavLink>
          </>
        )}
      </nav>
      <div className={styles.title}>
        {t('welcomePage.welcome', { name: user ? user.email : 'stranger' })}
      </div>
    </div>
  );
}

export default WelcomePage;
