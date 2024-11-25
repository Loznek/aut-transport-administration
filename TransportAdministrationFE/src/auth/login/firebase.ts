import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDGrqCOLJW3kfwxmzgBsqDQAqwLk5AkIcQ',
  authDomain: 'transportadministration.firebaseapp.com',
  projectId: 'transportadministration',
  storageBucket: 'transportadministration.appspot.com',
  messagingSenderId: '416428906713',
  appId: '1:416428906713:web:2df06c0a3a2fcdc3b3c6c8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign-in', error);
    throw error;
  }
};
