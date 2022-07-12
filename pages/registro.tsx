import React from "react";
import { useContext, useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Header from "../components/header/header";
import { FirebaseCtx } from "../config/context";
import Main from "../layouts/Main";

const Registro: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  const handleRegister = (data: any) => {
    console.log("data", data);
    if (data.password !== data.confirmPassword) {
      setError("password", {
        type: "custom",
        message: "Você inseriu senhas diferentes, tente novamente.",
      });
      setError("confirmPassword", {
        type: "custom",
        message: "Você inseriu senhas diferentes, tente novamente.",
      });
    } else {
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log("newUser", newUser);
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
