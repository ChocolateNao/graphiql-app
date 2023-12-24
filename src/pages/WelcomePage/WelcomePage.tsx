import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import LanguageSelect from 'components/LanguageSelect';
import TeamMemberCard from 'components/TeamMemberCard';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth } from 'utils/firebase';

import teamMembers from './teamMembers';

import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);
  const { t } = useLocalization();

  if (loading) return <div>{t('loading')}</div>;
  return (
    <div className={styles.welcome}>
      <nav className={styles.navigation}>
        {user ? (
          <NavLink className={`${styles.link} ${styles.home}`} to="/home">
            {t('navigation.home')}
          </NavLink>
        ) : (
          <>
            <NavLink
              className={`${styles.link} ${styles.link_login}`}
              to="/login"
            >
              {t('authorization.login')}
            </NavLink>
            <NavLink
              className={`${styles.link} ${styles.link_register}`}
              to="/register"
            >
              {t('authorization.register')}
            </NavLink>
          </>
        )}
        <LanguageSelect />
      </nav>
      <div className={styles.title}>
        {t('welcomePage.welcome', { name: user ? user.email : 'stranger' })}
      </div>
      <div className={styles.cards_container}>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;
