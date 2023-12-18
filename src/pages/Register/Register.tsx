import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormRegister } from 'models/AuthInterfaces';
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

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: FormRegister) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.title}>Register</h4>
        <div className={styles.input_field}>
          <label>Full name</label>
          <input
            className={styles.register__textBox}
            {...register('name')}
            placeholder="Enter your full name"
          />
          {errors.name ? (
            <p className={styles.error}>{errors.name.message}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <div className={styles.input_field}>
          <label>Email</label>
          <input
            className={styles.register__textBox}
            {...register('email')}
            placeholder="Enter your email address"
          />
          {errors.email ? (
            <p className={styles.error}>{errors.email.message}</p>
          ) : (
            <p className={styles.hidden}>Placeholder</p>
          )}
        </div>
        <div className={styles.input_field}>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={styles.register__textBox}
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
        <div className={styles.input_field}>
          <label>Repeat Password</label>
          <input
            type={showPasswordRepeat ? 'text' : 'password'}
            className={styles.register__textBox}
            {...register('confirmPassword')}
            placeholder="Repeat your password"
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
          className={styles.register__btn}
          value="Register"
        />
      </form>
      <button
        type="button"
        className={styles.register__google}
        onClick={signInWithGoogle}
      >
        Register with Google
      </button>
      <div>
        Already have an account? <Link to="/login">Login</Link> now.
      </div>
    </div>
  );
}
export default Register;
