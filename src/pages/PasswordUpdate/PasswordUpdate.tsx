import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormPassword } from 'models/Auth.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
import { resetPassword } from 'utils/firebase';
import passwordUpdateSchema from 'utils/valifationPasswordUpdate';

import styles from './PasswordUpdate.module.scss';

function PasswordUpdate() {
  const { t } = useLocalization();
  const urlParams = new URLSearchParams(window.location.search);
  const actionCode = urlParams.get('oobCode');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(passwordUpdateSchema),
  });

  useEffect(() => {
    if (!actionCode) navigate('/home');
  }, [actionCode, navigate]);

  const onSubmit = (data: FormPassword) => {
    if (actionCode) {
      resetPassword(actionCode, data.password, navigate);
    }
  };

  return (
    <div className={styles.password_update}>
      <div className={styles.password_update_wrapper}>
        <h4 className={styles.title}>{t('authorization.passwordUpdate')}</h4>
        <form
          className={styles.password_update_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.input_field}>
            <label className={styles.label}>
              {t('authorization.lables.passwordNew')}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.password_update__textBox}
              {...register('password')}
              placeholder={t('placeholders.passwordUpdate')}
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
              className={styles.password_update__textBox}
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
            className={styles.password_update__btn}
            value={t('authorization.passwordSet')}
          />
        </form>
      </div>
    </div>
  );
}
export default PasswordUpdate;
