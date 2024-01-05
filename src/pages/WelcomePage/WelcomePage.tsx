import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import TeamMemberCard from 'components/TeamMemberCard';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth, logout } from 'utils/firebase';

import teamMembers from './teamMembers';

import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const [user, loading] = useAuthState(auth);
  const { t } = useLocalization();

  if (loading) return <div>{t('loading')}</div>;
  return (
    <div className={styles.welcome}>
      <div className={styles.welcome_top__wrapper}>
        <div className={styles.welcome_top}>
          <div className={styles.welcome_top_left}>
            <h1 className={styles.title}>{t('welcomePage.welcome')}</h1>
            <h2 className={styles.subtitle}>
              {t('welcomePage.freePossibilitiesHeading')}{' '}
            </h2>
            <div>
              {user ? (
                <button type="button" className={styles.link} onClick={logout}>
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
          </div>
          <div className={styles.welcome_top_right}>
            <div className={styles.welcome_top_right_top}>
              <img
                className={styles.query}
                src="png/Query.png"
                alt="Response"
              />
              <div className={styles.welcome_top_right_title}>
                <h2>{t('welcomePage.instantResponse')}</h2>
                <h3>{t('welcomePage.instantResponseText')}</h3>
              </div>
            </div>
            <img
              className={styles.response}
              src="png/Response.png"
              alt="Query"
            />
          </div>
        </div>
      </div>
      <div className={styles.welcome_bottom}>
        <div className={styles.learn}>
          <div className={styles.learn_title}>
            {t('welcomePage.graphqlNewbie')}
          </div>
          <div className={styles.learn_subtitle}>
            {t('welcomePage.graphqlTutorials')}
          </div>
          <a
            className={styles.link}
            href="https://graphql.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('welcomePage.startLearning')}
          </a>
        </div>
      </div>
      <div className={styles.team}>
        {t('welcomePage.developmentTeamHeading')}
      </div>
      <div className={styles.cards_container}>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
      <div className={styles.text}>{t('welcomePage.inFavorOfRsschool')}</div>
      <div className={styles.text}>
        {t('welcomePage.inFavorOfRsschoolText')}{' '}
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('welcomePage.here')}
        </a>
        .
      </div>
    </div>
  );
}

export default WelcomePage;
