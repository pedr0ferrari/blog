import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Header from "../components/header/header";
import { FirebaseCtx } from "../config/context";
import Main from "../layouts/Main";

type LoginData = { email: string; password: string };

const Login: React.FC = () => {
  const { auth } = useContext(FirebaseCtx);
  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (data: LoginData) => {
    console.log("data", data);
    const res = await auth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
    console.log(res);
    router.push("/");
  };

  return (
    <>
      <Header />
      <Main>
        <Flex
          as="form"
          direction="column"
          gap={5}
          onSubmit={handleSubmit(handleLogin)}
        >
          Faça o login.
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Insira seu Email"
              type="email"
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              placeholder="Insira sua senha"
              type="password"
              {...register("password")}
            />
          </FormControl>
          <Button type="submit">Login</Button>
        </Flex>
      </Main>
    </>
  );
};

export default Login;
