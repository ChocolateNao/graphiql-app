import styles from './Variables.module.scss';

function Variables() {
  return (
    <textarea
      className={styles.variables__textarea}
      placeholder="Enter  Variables"
    />
  );
}

export default Variables;
