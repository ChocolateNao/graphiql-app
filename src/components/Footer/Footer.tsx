import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        © 2023, Authors on GitHub:
        <a
          className={styles.link}
          href="https://github.com/Sylphur"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          Sylphur,{' '}
        </a>
        <a
          className={styles.link}
          href="https://github.com/TatsianaSauko"
          target="_blank"
          rel="noopener noreferrer"
        >
          TatsianaSauko,{' '}
        </a>
        <a
          className={styles.link}
          href="https://github.com/ChocolateNao"
          target="_blank"
          rel="noopener noreferrer"
        >
          ChocolateNao
        </a>
      </div>
      <div className={styles.wrapper_logo}>
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.logo}
            src="https://rs.school/images/rs_school_js.svg"
            alt="Course logo"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
