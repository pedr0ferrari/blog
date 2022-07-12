import { type } from "os";
import React, { Children } from "react";

export const config = {
  firebaseConfig: {
    apiKey: "AIzaSyBPaDSzfhg1tuafAab3YgaSvqgpBkhCA08",
    authDomain: "blog-ffb3e.firebaseapp.com",
    projectId: "blog-ffb3e",
    storageBucket: "blog-ffb3e.appspot.com",
    messagingSenderId: "134131214803",
    appId: "1:134131214803:web:953323610b7bf2cb45a726",
    measurementId: "G-ECTRG0DTCJ",
  },
};
export type FirebaseCtxType = {
  user: string;
};

export const FirebaseCtx = React.createContext<FirebaseCtxType>(
  {} as FirebaseCtxType
);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = "Pedro";
  return (
    <FirebaseCtx.Provider value={{ user }}>{children}</FirebaseCtx.Provider>
  );
};
