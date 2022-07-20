import React from "react";
import { useContext } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Header from "../components/header/header";
import { FirebaseCtx } from "../config/context";
import Main from "../layouts/Main";
import { useRouter } from "next/router";

type RegisterData = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const Registro: React.FC = () => {
  const { auth, firestore } = useContext(FirebaseCtx);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterData>({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
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

    console.log("newUser", newUser);
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
    <>
      <Header />
      <Main>
        <Flex
          as="form"
          direction="column"
          gap={5}
          onSubmit={handleSubmit(handleRegister)}
        >
          Registre-se.
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input placeholder="Nome Completo" {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.confirmPassword)}>
            <FormLabel>Confirme sua senha</FormLabel>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit">Enviar</Button>
        </Flex>
      </Main>
    </>
  );
};

export default Registro;
