import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormRegister } from 'models/AuthInterfaces';
import { useLocalization } from 'shared/context/LocalizationContext';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from 'utils/firebase';
import schema from 'utils/validation';

import styles from './Register.module.scss';

function Register() {
  const [user, loading] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const { t } = useLocalization();

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, loading, navigate]);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  const onSubmit = (data: FormRegister) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.title}>{t('authorization.register')}</h4>
        <div className={styles.input_field}>
          <label>{t('authorization.lables.fullName')}</label>
          <input
            className={styles.register__textBox}
            {...register('name')}
            placeholder={t('placeholders.fullName')}
          />
          {errors.name ? (
            <p className={styles.error}>{t(errors.name.message)}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <div className={styles.input_field}>
          <label>{t('authorization.lables.email')}</label>
          <input
            className={styles.register__textBox}
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
          <label>{t('authorization.lables.password')}</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.register__textBox}
            {...register('password')}
            placeholder={t('placeholders.password')}
          />
          <div className={styles.show_password}>
            <label className={styles.label}>
              {t('authorization.lables.passwordShow')}
            </label>
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
        <div className={styles.input_field}>
          <label>{t('authorization.lables.passwordConfirm')}</label>
          <input
            type={showPasswordRepeat ? 'text' : 'password'}
            className={styles.register__textBox}
            {...register('confirmPassword')}
            placeholder={t('placeholders.passwordConfirm')}
          />
          <div className={styles.show_password}>
            <label className={styles.label}>
              {t('authorization.lables.passwordShow')}
            </label>
            <input
              type="checkbox"
              checked={showPasswordRepeat}
              onChange={() => setShowPasswordRepeat(!showPasswordRepeat)}
            />
          </div>
          {errors.confirmPassword ? (
            <p className={styles.error}>{t(errors.confirmPassword.message)}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <input
          type="submit"
          className={styles.register__btn}
          value={t('authorization.register')}
        />
      </form>
      <button
        type="button"
        className={styles.register__google}
        onClick={signInWithGoogle}
      >
        {t('authorization.registerGoogle')}
      </button>
      <div>
        {t('registerPage.yesProfile')}{' '}
        <Link to="/login">{t('authorization.login')}</Link> {t('now')}.
      </div>
    </div>
  );
}
export default Register;
