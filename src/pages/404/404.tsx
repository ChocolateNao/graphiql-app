import styles from './404.module.scss';

function NotFoundPage() {
  return (
    <div className={styles['not-found-container']}>
      <div className={styles['not-found-content']}>
        <h1 className={styles['not-found-title']}>404</h1>
        <p className={styles['not-found-text']}>Oops! Page not found.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
