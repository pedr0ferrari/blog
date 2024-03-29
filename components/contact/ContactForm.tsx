import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../../config/context";

type ContactData = { name: string; email: string; message: string };

const ContactForm: React.FC = () => {
  const { firestore } = useContext(FirebaseCtx);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  const toast = useToast();

  const handleContact = async (data) => {
    try {
      const messageId = await createContactMessage(data);
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
    <Flex
      as="form"
      direction="column"
      gap={5}
      onSubmit={handleSubmit(handleContact)}
      maxWidth="lg"
      w="100%"
      h="100%"
    >
      <Text as="h1" fontSize="3xl" fontWeight="normal">
        Entre em contato conosco!
      </Text>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel>Nome</FormLabel>
        <Input
          placeholder="Nome completo"
          {...register("name", {
            required: "Obrigatório preencher este campo!",
            minLength: { value: 3, message: "Nome muito curto..." },
          })}
          borderColor="black"
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Obrigatório preencher este campo!",
          })}
          borderColor="black"
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}.
        </FormErrorMessage>
        <FormHelperText>Nunca compartilharemos seu email.</FormHelperText>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.message)}>
        <FormLabel>Mensagem</FormLabel>
        <Textarea
          placeholder="Mensagem"
          {...register("message", {
            required: "Obrigatório preencher este campo!",
            minLength: { value: 20, message: "Mensagem muito curta..." },
          })}
          borderColor="black"
        />
        <FormErrorMessage>
          {errors.message && errors.message.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        isDisabled={!isValid}
        variant="solid"
        alignSelf="left"
      >
        Enviar
      </Button>
    </Flex>
  );
};

export default ContactForm;
