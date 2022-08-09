import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React, { useEffect, useState } from "react";
import { Button, Flex, Text, Image } from "@chakra-ui/react";
import firebase from "firebase";
import useLoggedInUser from "../hooks/useLoggedInUser";
import EditProfile from "../components/profile/EditProfileForm";
import EditPassword from "../components/profile/EditPassword";
import InsertAvatar from "../components/profile/InsertAvatar";

//nome completo e email cadastrado.
//data de criação de conta.
//quantidade de posts feitos.

const Perfil: React.FC = () => {
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  const { user } = useLoggedInUser();

  const createdAtFormated =
    user && new Date(user.createdAt).toLocaleDateString();

  const getHttpReference = (avatarPath) => {
    const storage = firebase.storage();
    const pathReference = storage.ref();
    pathReference
      .child(`userAvatar/${avatarPath}`)
      .getDownloadURL()
      .then((url) => {
        const img = document.getElementById("avatarImg");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(user && user.avatarUrl);
    user && getHttpReference(user.avatarUrl);
  }, [user]);

  return (
    <>
      <Header />
      <Main>
        <Flex direction="column" gap={5}>
          <Text fontSize="3xl" fontWeight="extrabold">
            Dados cadastrados
          </Text>
          <InsertAvatar />
          <Image alt="" src="" id="avatarImg" />
          <Text>Nome: {user && user.name}</Text>
          <Text>Email: {user && user.email}</Text>
          <Text>Conta criada em: {createdAtFormated}</Text>
          <Button
            onClick={() => setProfileIsOpen(!profileIsOpen)}
            variant="mainBtn"
          >
            Editar perfil
          </Button>
          {profileIsOpen && user ? <EditProfile user={user} /> : <></>}
          <EditPassword user={user} />
        </Flex>
      </Main>
    </>
  );
};
export default Perfil;
