import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormLogin } from 'models/AuthInterfaces';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from 'utils/firebase';
import loginSchema from 'utils/validationLogin';

import styles from './Login.module.scss';

function Login() {
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
    return <div>Loading...</div>;
  }

  const onSubmit = (data: FormLogin) => {
    logInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.title}>Login</h4>
        <div className={styles.input_field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.login__textBox}
            {...register('email')}
            placeholder="Enter you email address"
          />
          {errors.email ? (
            <p className={styles.error}>{errors.email.message}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <div className={styles.input_field}>
          <label className={styles.label}>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.login__textBox}
            {...register('password')}
            placeholder="Enter your password"
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
        <input type="submit" className={styles.login__btn} value="Login" />
      </form>
      <button
        type="button"
        className={styles.login__google}
        onClick={signInWithGoogle}
      >
        Login with Google
      </button>
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>
      <div>
        Don&apos;t have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
}
export default Login;
