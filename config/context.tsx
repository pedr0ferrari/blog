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
  apiKey: "AIzaSyBPaDSzfhg1tuafAab3YgaSvqgpBkhCA08",
  authDomain: "blog-ffb3e.firebaseapp.com",
  projectId: "blog-ffb3e",
  storageBucket: "blog-ffb3e.appspot.com",
  messagingSenderId: "134131214803",
  appId: "1:134131214803:web:953323610b7bf2cb45a726",
  measurementId: "G-ECTRG0DTCJ",
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
