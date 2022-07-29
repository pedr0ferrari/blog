import React from "react";
import Header from "../components/header/header";
import Main from "../layouts/Main";
import { Button, useDisclosure } from "@chakra-ui/react";

import MyPosts from "../components/myposts";

const MeusPosts: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header />
      <Main>
        <Button onClick={onOpen} width="max-content">
          Criar postagem
        </Button>
        <MyPosts isOpen={isOpen} onClose={onClose} />
      </Main>
    </>
  );
};
export default MeusPosts;
