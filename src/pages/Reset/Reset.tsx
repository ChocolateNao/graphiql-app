import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormReset } from 'models/AuthInterfaces';
import { auth, sendPasswordReset } from 'utils/firebase';
import resetSchema from 'utils/validationReset';

import styles from './Reset.module.scss';

function Reset() {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: FormReset) => {
    sendPasswordReset(data.email);
  };
  return (
    <div className={styles.reset}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.title}>Password reset</h4>
        <div className={styles.input_field}>
          <label>Email</label>
          <input
            className={styles.reset__textBox}
            {...register('email')}
            placeholder="Enter you email address"
          />
          {errors.email ? (
            <p className={styles.error}>{errors.email.message}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>

        <input
          type="submit"
          className={styles.reset__btn}
          value="Send password reset email"
        />
      </form>
      <div>
        Don&apos;t have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
}
export default Reset;
