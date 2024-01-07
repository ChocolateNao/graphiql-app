import { Suspense, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Loader from 'components/Loader';
import { FormReset } from 'models/Auth.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import { auth, sendPasswordReset } from 'utils/firebase';
import resetSchema from 'utils/validationReset';

import styles from './Reset.module.scss';

function Reset() {
  const { t } = useLocalization();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(resetSchema) });
  useEffect(() => {
    if (user) navigate('/home');
  }, [user, loading, navigate]);

  const onSubmit = (data: FormReset) => {
    sendPasswordReset(data.email);
  };
  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.reset}>
        <div className={styles.reset_wrapper}>
          <h4 className={styles.title}>{t('authorization.passwordReset')}</h4>
          <form className={styles.reset_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.input_field}>
              <label className={styles.label}>
                {t('authorization.lables.email')}
              </label>
              <input
                className={styles.reset__textBox}
                {...register('email')}
                placeholder={t('placeholders.email')}
              />
              {errors.email ? (
                <p className={styles.error}>{t(errors.email.message)}</p>
              ) : (
                <p className={styles.hidden}>Placeholder</p>
              )}
            </div>

            <input
              type="submit"
              className={styles.reset__btn}
              value={t('passwordResetPage.sendResetLink')}
            />
          </form>
          <div className={styles.reset_bottom}>
            {t('loginPage.noProfile')}{' '}
            <Link to="/register" className={styles.link}>
              {t('authorization.register')}
            </Link>{' '}
            {t('now')}.
          </div>
        </div>
      </div>
    </Suspense>
  );
}
export default Reset;
