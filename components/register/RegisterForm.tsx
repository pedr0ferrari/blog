import {
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../../config/context";

type RegisterData = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const RegisterForm: React.FC = () => {
  const { auth, firestore } = useContext(FirebaseCtx);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<RegisterData>({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    mode: "onChange",
  });

  const toast = useToast();
  const router = useRouter();

  const handleRegister = async (data: RegisterData) => {
    if (data.password !== data.confirmPassword) {
      setError("password", {
        type: "custom",
        message: "Você inseriu senhas diferentes, tente novamente.",
      });

      setError("confirmPassword", {
        type: "custom",
        message: "Você inseriu senhas diferentes, tente novamente.",
      });
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: Date.now(),
    };

    await createUser(newUser);
    router.push("/");
  };

  const createUser = async (newUser) => {
    try {
      const {
        user: { uid },
      } = await auth.createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      );

      await firestore.collection("users").doc(uid).set({
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
        uid: uid,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: error.message,
        status: "error",
      });
    }
  };
  return (
    <Flex
      as="form"
      direction="column"
      gap={5}
      onSubmit={handleSubmit(handleRegister)}
      maxWidth="lg"
      w="100%"
    >
      <Text as="h1" fontSize="3xl" fontWeight="normal">
        Registre-se
      </Text>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel>Nome</FormLabel>
        <Input
          placeholder="Nome Completo"
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
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Digite seu email"
          {...register("email", {
            required: "Obrigatório preencher este campo!",
          })}
          borderColor="black"
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          placeholder="Digite sua senha"
          {...register("password", {
            required: "Obrigatório preencher este campo!",
            minLength: {
              value: 6,
              message: "Senha deve conter no mínimo 6 caractéres.",
            },
          })}
          borderColor="black"
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.confirmPassword)}>
        <FormLabel>Confirme sua senha</FormLabel>
        <Input
          type="password"
          placeholder="Confirme sua senha"
          {...register("confirmPassword", {
            required: "Obrigatório preencher este campo!",
          })}
          borderColor="black"
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>

      <Button type="submit" isDisabled={!isValid}>
        Enviar
      </Button>
    </Flex>
  );
};

export default RegisterForm;
