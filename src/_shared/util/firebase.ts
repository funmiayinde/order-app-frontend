import { initializeApp } from 'firebase/app';

console.log('FIREBASE_API_KEY:::', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDf-i3-kecpDpJyG1uR-Jbf0fjXMPhO54U',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'construyo-coding-challenge.firebaseapp.com',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://construyo-coding-challenge.firebaseio.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'construyo-coding-challenge',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'construyo-coding-challenge.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '275103082078',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:275103082078:web:3d55c84dee230264',
};

export const app = initializeApp(firebaseConfig);

