import Header from "../components/header/header";
import Main from "../layouts/Main";
import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";

import CreatePostModal from "../components/CreatePostModal";

//criar botao input
// armazenar inputs no BD
//renderizar textos do BD na tela

const MeusPosts: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header />
      <Main>
        <Button onClick={onOpen}>abre modal</Button>
        <CreatePostModal isOpen={isOpen} onClose={onClose} />
      </Main>
    </>
  );
};
export default MeusPosts;
