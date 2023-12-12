import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormPassword } from 'models/AuthInterfaces';
import { resetPassword } from 'utils/firebase';
import passwordUpdateSchema from 'utils/valifationPasswordUpdate';

import styles from './PasswordUpdate.module.scss';

function PasswordUpdate() {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.title}>Set a new password</h4>
        <div className={styles.input_field}>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.password_update__textBox}
            {...register('password')}
            placeholder="Enter new password"
          />
          <div className={styles.show_password}>
            <label className={styles.label}>Show password</label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
          {errors.password ? (
            <p className={styles.error}>{errors.password.message}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <div className={styles.input_field}>
          <label>Repeat Password</label>
          <input
            type={showPasswordRepeat ? 'text' : 'password'}
            className={styles.password_update__textBox}
            {...register('confirmPassword')}
            placeholder="Repeat new password"
          />
          <div className={styles.show_password}>
            <label className={styles.label}>Show password</label>
            <input
              type="checkbox"
              checked={showPasswordRepeat}
              onChange={() => setShowPasswordRepeat(!showPasswordRepeat)}
            />
          </div>
          {errors.confirmPassword ? (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <input
          type="submit"
          className={styles.password_update__btn}
          value="Set password"
        />
      </form>
    </div>
  );
}
export default PasswordUpdate;
