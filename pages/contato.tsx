import { Flex, Input, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/header/header";
import Main from "../layouts/Main";

const Contato = () => {
  const [nome, setNome] = useState("");
  console.log(nome);
  return (
    <>
      <Header />
      <Main>
        <Flex as="form" direction="column">
          <FormLabel>Nome</FormLabel>
          <Input
            placeholder="Nome completo"
            value={nome}
            onChange={(event) => {
              setNome(event.target.value);
            }}
          />
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" />
        </Flex>
        Flea corporation
      </Main>
    </>
  );
};

export default Contato;
