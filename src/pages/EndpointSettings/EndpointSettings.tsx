import { NavLink } from 'react-router-dom';

import styles from './EndpointSettings.module.scss';

function EndpointSettings() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.window}>
        <div className={styles.window_header}>
          <div className={styles.title}>Endpoint Settings</div>
          <NavLink className={styles.close_btn} to="/home" />
        </div>
        <div className={styles.window_main}>
          <div className={styles.title}>
            Use built-in proxy in case of CORS errors
          </div>
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
