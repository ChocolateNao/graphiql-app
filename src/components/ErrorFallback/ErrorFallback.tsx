import { useLocalization } from 'shared/context/LocalizationContext';

import styles from './ErrorFallback.module.scss';

function ErrorFallback() {
  const { t } = useLocalization();
  return (
    <div className={styles.errorboundary}>
      <h1 className={styles.errorboundary__header}>
        {t('errorPage.errorFallback.header')}
      </h1>
      <p className={styles.errorboundary__text}>
        {t('errorPage.errorFallback.text')}
      </p>
      <button type="button" onClick={() => window.location.reload()}>
        {t('errorPage.errorFallback.reload')}
      </button>
    </div>
  );
}

export default ErrorFallback;
