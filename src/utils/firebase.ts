import { toast } from 'react-toastify';
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBOHvtTR0FhRZdmBj47Up9o5pro-RlWdWY',
  authDomain: 'fir-auth-article-44b74.firebaseapp.com',
  projectId: 'fir-auth-article-44b74',
  storageBucket: 'fir-auth-article-44b74.appspot.com',
  messagingSenderId: '172661576530',
  appId: '1:172661576530:web:bc7f9df28dcd3743df608b',
  measurementId: 'G-YV3F29HVXH',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    toast.success(
      `User ${user.displayName} with email ${user.email} has successfully signed in!`
    );
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      toast.error(err.message);
    }
  }
};
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success(`User with email ${email} has successfully signed in!`);
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/invalid-credential') {
        toast.error(
          'Invalid credentials. Please check the entered data and try again.'
        );
      } else {
        toast.error(err.message);
      }
    }
  }
};
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    toast.success(
      `User ${name} with email ${email} has successfully registered!`
    );
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error(`User ${name} is already in use with email ${email}`);
      } else {
        toast.error(err.message);
      }
    }
  }
};

const actionCodeSettings = {
  url: 'https://graphiql-app-amogus.vercel.app/password-update',
  handleCodeInApp: false,
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    toast.success('Password reset link sent!');
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      toast.error(err.message);
    }
  }
};

async function resetPassword(
  actionCode: string,
  newPassword: string,
  navigate: (path: string) => void
) {
  try {
    await confirmPasswordReset(auth, actionCode, newPassword);
    toast.success('Password update!');
    navigate('/login');
  } catch (err) {
    if (err instanceof FirebaseError) {
      toast.error(err.message);
    }
  }
}

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  resetPassword,
  sendPasswordReset,
  signInWithGoogle,
};
