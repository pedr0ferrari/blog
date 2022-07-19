import Header from "../components/header/header";
import Main from "../layouts/Main";
import React, { useState } from "react";
import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useForm } from "react-hook-form";
import EditProfile from "../components/profile/EditProfile";

//nome completo e email cadastrado.
//data de criação de conta.
//quantidade de posts feitos.

const Perfil: React.FC = () => {
  const { user } = useLoggedInUser();

  const createdAtFormated =
    user && new Date(user.createdAt).toLocaleDateString();

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <>
      <Header />
      <Main>
        <Flex direction="column" gap={5}>
          <Text fontSize="3xl" fontWeight="extrabold">
            Dados cadastrados
          </Text>
          <Text>Nome: {user && user.name}</Text>
          <Text>Email: {user && user.email}</Text>
          <Text>Conta criada em: {createdAtFormated}</Text>
          <Button onClick={() => setIsOpen(!isOpen)}>Editar perfil</Button>

          {isOpen && user ? <EditProfile user={user} /> : <></>}
        </Flex>
      </Main>
    </>
  );
};
export default Perfil;
