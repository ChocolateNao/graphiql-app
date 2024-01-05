import { NavLink } from 'react-router-dom';

import { useLocalization } from 'shared/context/LocalizationContext';

import styles from './EndpointSettings.module.scss';

function EndpointSettings() {
  const { t } = useLocalization();
  return (
    <div className={styles.wrapper}>
      <div className={styles.window}>
        <div className={styles.window_header}>
          <h1 className={styles.title}>
            {t('endpointSettings.endpointSettingsHeading')}
          </h1>
          <NavLink className={styles.close_btn} to="/home" />
        </div>
        <div className={styles.window_main}>
          <div className={styles.title}>{t('endpointSettings.useProxy')}</div>
          <div className={styles.btn_switch}>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider} />
            </label>
          </div>
        </div>
        <div className={styles.window_middle} />
        <div className={styles.window_footer} />
      </div>
    </div>
  );
}

export default EndpointSettings;
