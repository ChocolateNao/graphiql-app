import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormLogin } from 'models/Auth.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from 'utils/firebase';
import loginSchema from 'utils/validationLogin';

import styles from './Login.module.scss';

function Login() {
  const { t } = useLocalization();
  const [user, loading] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  const onSubmit = (data: FormLogin) => {
    logInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_wrapper}>
        <h4 className={styles.title}>{t('loginPage.welcomeBack')}</h4>
        <h4 className={styles.subtitle}>{t('authorization.login')}</h4>
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_field}>
            <label className={styles.label}>
              {t('authorization.lables.email')}
            </label>
            <input
              className={styles.login__textBox}
              {...register('email')}
              placeholder={t('placeholders.email')}
            />
            {errors.email ? (
              <p className={styles.error}>{t(errors.email.message)}</p>
            ) : (
              <p className={styles.hidden}>Placeholder</p>
            )}
          </div>
          <div className={styles.input_field}>
            <label className={styles.label}>
              {t('authorization.lables.password')}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.login__textBox}
              {...register('password')}
              placeholder={t('placeholders.password')}
            />
            <div className={styles.show_password}>
              <label>{t('authorization.lables.passwordShow')}</label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password ? (
              <p className={styles.error}>{t(errors.password.message)}</p>
            ) : (
              <p className={styles.hidden}>Placeholder</p>
            )}
          </div>
          <input
            type="submit"
            className={styles.login__btn}
            value={t('authorization.login')}
          />
        </form>
        <div className={styles.divider}>{t('bigOR')}</div>
        <button
          type="button"
          className={styles.login__google}
          onClick={signInWithGoogle}
        >
          {t('authorization.loginGoogle')}
        </button>
        <div>
          <Link to="/reset" className={styles.link}>
            {t('authorization.passwordForgot')}
          </Link>
        </div>
        <div className={styles.login_bottom}>
          {t('loginPage.noProfile')}{' '}
          <Link to="/register" className={styles.link}>
            {t('authorization.register')}
          </Link>{' '}
          {t('now')}.
        </div>
      </div>
    </div>
  );
}
export default Login;
