import styles from './Headers.module.scss';

function Headers() {
  return (
    <textarea
      className={styles.headers__textarea}
      placeholder="Enter headers"
    />
  );
}

export default Headers;
