import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export type FirebaseCtxType = {
  authUser: firebase.User | false | null;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
};

export const FirebaseCtx = React.createContext<FirebaseCtxType>(
  {} as FirebaseCtxType
);

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  console.log("Firebase connected");
} catch (error) {
  console.error(error);
}

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<firebase.User | false | null>(null);
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  useEffect(() => {
    //aqui o efeito é executado
    return auth.onAuthStateChanged((user) => {
      if (!user) {
        setAuthUser(false);
      } else {
        setAuthUser(user);
      }
    });
  }, [authUser]); //o efeito depende dos valores do array de dependência (authuser)

  return (
    <FirebaseCtx.Provider value={{ authUser, auth, firestore }}>
      {children}
    </FirebaseCtx.Provider>
  );
};
