import styles from './Variables.module.scss';

function Variables() {
  return (
    <textarea
      className={styles.variables__textarea}
      placeholder="Enter variables"
    />
  );
}

export default Variables;
