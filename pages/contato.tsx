import {
  Flex,
  Input,
  FormLabel,
  Textarea,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/header/header";
import Main from "../layouts/Main";

const Contato = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = () => {
    console.log({ nome, email, mensagem });
  };

  return (
    <>
      <Header />
      <Main>
        <Flex as="form" direction="column" gap={5}>
          Entre em contato conosco!
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder="Nome completo"
              value={nome}
              onChange={(event) => {
                setNome(event.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <FormErrorMessage>Email inválido.</FormErrorMessage>
            <FormHelperText>Nunca compartilharemos seu email.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Mensagem</FormLabel>
            <Textarea
              placeholder="Mensagem"
              value={mensagem}
              onChange={(event) => {
                setMensagem(event.target.value);
              }}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Enviar</Button>
        </Flex>
      </Main>
    </>
  );
};

export default Contato;
