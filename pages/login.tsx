import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../components/header/Header";
import { FirebaseCtx } from "../config/context";
import Main from "../layouts/Main";

type LoginData = { email: string; password: string };

const Login: React.FC = () => {
  const { auth } = useContext(FirebaseCtx);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const toast = useToast();

  const handleLogin = async (data: LoginData) => {
    try {
      const userId = loginFirebase(data);
      if (userId) {
        toast({
          title: "Login feito com sucesso!",
          status: "success",
        });
        router.push("/");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const loginFirebase = async (data) => {
    try {
      const res = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      if (res.user) {
        return res.user.uid;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <Header />
      <Main>
        <Flex
          as="form"
          direction="column"
          gap={5}
          onSubmit={handleSubmit(handleLogin)}
          maxWidth="lg"
          w="100%"
        >
          <Text as="h1" fontSize="3xl" fontWeight="normal">
            Faça o login
          </Text>

          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              placeholder="Insira seu Email"
              type="email"
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
              placeholder="Insira sua senha"
              type="password"
              {...register("password", {
                required: "Obrigatório preencher este campo!",
              })}
              borderColor="black"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" isDisabled={!isValid}>
            Login
          </Button>
        </Flex>
      </Main>
    </>
  );
};

export default Login;
