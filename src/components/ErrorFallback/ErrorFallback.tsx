import styles from './ErrorFallback.module.scss';

function ErrorFallback() {
  return (
    <div className={styles.errorboundary}>
      <h1 className={styles.errorboundary__header}>
        Oopsie Woopsie! Something went wrong.
      </h1>
      <p className={styles.errorboundary__text}>
        You can try to refresh the page or simply click the button here that
        will do it for you.
      </p>
      <button type="button" onClick={() => window.location.reload()}>
        Reload page
      </button>
    </div>
  );
}

export default ErrorFallback;
