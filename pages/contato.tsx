import {
  Flex,
  Input,
  FormLabel,
  Textarea,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import Header from "../components/header/header";
import Main from "../layouts/Main";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../config/context";

type ContactData = { name: string; email: string; message: string };

const Contato: React.FC = () => {
  const { firestore } = useContext(FirebaseCtx);
  const { register, handleSubmit } = useForm<ContactData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const toast = useToast();

  const handleContact = async (data) => {
    try {
      const messageId = await createContactMessage(data);
      console.log(data.name, data.email, data.message);
      if (messageId) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Entraremos em contato em breve.",
          status: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createContactMessage = async (message) => {
    try {
      const messageRef = firestore.collection("contactMessage").doc();
      const messageId = messageRef.id;
      await messageRef.set({ ...message });
      return messageId;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <Flex
          as="form"
          direction="column"
          gap={5}
          onSubmit={handleSubmit(handleContact)}
        >
          <Text fontSize="3xl" fontWeight="extrabold">
            Entre em contato conosco!
          </Text>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input placeholder="Nome completo" {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input placeholder="Email" type="email" {...register("email")} />
            <FormErrorMessage>Email inválido.</FormErrorMessage>
            <FormHelperText>Nunca compartilharemos seu email.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Mensagem</FormLabel>
            <Textarea placeholder="Mensagem" {...register("message")} />
          </FormControl>
          <Button type="submit">Enviar</Button>
        </Flex>
      </Main>
    </>
  );
};

export default Contato;
