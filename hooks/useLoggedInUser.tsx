import { useContext, useEffect, useState } from "react";
import { FirebaseCtx } from "../config/context";
import { UserType } from "../interface/User";

const useLoggedInUser = () => {
  // usar contexto do firebase para pegar o authuser
  const { authUser, firestore } = useContext(FirebaseCtx);
  const firebaseUserID = authUser ? authUser.uid : null;
  const [user, setUser] = useState<UserType | false | null>(null);

  const authState =
    user === false ? "LOGGEDOUT" : user === null ? "LOADING" : "LOGGEDIN";

  // useeffect para conferir se o user está deslogado
  useEffect(() => {
    if (authUser === false) {
      setUser(false);
    }
  }, [authUser]);

  // useeffect para buscar os dados do user se o mesmo tiver um ID
  useEffect(() => {
    if (typeof firebaseUserID === "string") {
      firestore
        .collection("users")
        .doc(firebaseUserID)
        .get()
        .then((doc) => {
          const userData = doc.data() as UserType;
          setUser(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebaseUserID]);

  // retornar o estado de login (authstate)
  return { user, authState };
};

export default useLoggedInUser;
