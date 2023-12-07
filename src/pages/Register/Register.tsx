import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from 'utils/firebase';

import styles from './Register.module.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/home');
  }, [user, loading, navigate]);
  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <input
          type="text"
          className={styles.register__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={styles.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="button"
          className={styles.register__btn}
          onClick={register}
        >
          Register
        </button>
        <button
          type="button"
          className={`${styles.register__btn} ${styles.register__google}`}
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;