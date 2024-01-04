import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormRegister } from 'models/Auth.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from 'utils/firebase';
import registerSchema from 'utils/validationRegister';

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
  } = useForm({ mode: 'onChange', resolver: yupResolver(registerSchema) });

  const { t } = useLocalization();

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  const onSubmit = (data: FormRegister) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  return (
    <div className={styles.register}>
      <div className={styles.register_wrapper}>
        <h4 className={styles.title}>{t('registerPage.welcomeHeader')}</h4>
        <h4 className={styles.subtitle}>{t('authorization.register')}</h4>
        <form
          className={styles.register_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.input_field}>
            <label className={styles.label}>
              {t('authorization.lables.fullName')}
            </label>
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
            <label className={styles.label}>
              {t('authorization.lables.email')}
            </label>
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
            <label className={styles.label}>
              {t('authorization.lables.password')}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.register__textBox}
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
          <div className={styles.input_field}>
            <label className={styles.label}>
              {t('authorization.lables.passwordConfirm')}
            </label>
            <input
              type={showPasswordRepeat ? 'text' : 'password'}
              className={styles.register__textBox}
              {...register('confirmPassword')}
              placeholder={t('placeholders.passwordConfirm')}
            />
            <div className={styles.show_password}>
              <label>{t('authorization.lables.passwordShow')}</label>
              <input
                type="checkbox"
                checked={showPasswordRepeat}
                onChange={() => setShowPasswordRepeat(!showPasswordRepeat)}
              />
            </div>
            {errors.confirmPassword ? (
              <p className={styles.error}>
                {t(errors.confirmPassword.message)}
              </p>
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
        <div className={styles.divider}>{t('bigOR')}</div>
        <button
          type="button"
          className={styles.register__google}
          onClick={signInWithGoogle}
        >
          {t('authorization.registerGoogle')}
        </button>
        <div className={styles.register_bottom}>
          {t('registerPage.yesProfile')}{' '}
          <Link to="/login" className={styles.link}>
            {t('authorization.login')}
          </Link>{' '}
          {t('now')}.
        </div>
      </div>
    </div>
  );
}
export default Register;
