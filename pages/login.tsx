import { Container } from "@chakra-ui/react";

import React from "react";
import Footer from "../components/footer";
import Header from "../components/header/Header";
import LoginForm from "../components/login/LoginForm";
import Main from "../layouts/Main";

const Login: React.FC = () => {
  return (
    <>
      <Main>
        <Header />
        <Container as="section" minHeight="70vh" paddingY={8} centerContent>
          <LoginForm />
        </Container>
        <Footer />
      </Main>
    </>
  );
};

export default Login;
