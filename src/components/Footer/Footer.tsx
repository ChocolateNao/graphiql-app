import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper_logo}>
        <div>© 2023</div>
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
      <div>
        <div>Made with love and passion by:</div>
        <div className={styles.footer_github}>
          <a
            className={styles.link}
            href="https://github.com/Sylphur"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sylphur
          </a>
          <a
            className={styles.link}
            href="https://github.com/TatsianaSauko"
            target="_blank"
            rel="noopener noreferrer"
          >
            TatsianaSauko
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
      </div>
    </footer>
  );
}

export default Footer;
