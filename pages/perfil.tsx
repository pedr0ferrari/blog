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
    user && getHttpReference(user.avatarUrl);
  }, [user]);

  return (
    <>
      <Header />
      <Main>
        <Flex direction="column" gap={5} maxWidth="lg" w="100%">
          <Text as="h1" fontSize="3xl" fontWeight="">
            Dados cadastrados
          </Text>
          <InsertAvatar />
          <Image
            alt={`Avatar de ${user && user.name}`}
            src=""
            id="avatarImg"
            boxSize="300"
          />
          <Text>Nome: {user && user.name}</Text>
          <Text>Email: {user && user.email}</Text>
          <Text>Conta criada em: {createdAtFormated}</Text>
          <Button
            onClick={() => setProfileIsOpen(!profileIsOpen)}
            variant="solid"
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
