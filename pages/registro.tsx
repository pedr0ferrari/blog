import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "../components/header/Header";
import Main from "../layouts/Main";
import Footer from "../components/footer";
import RegisterForm from "../components/register/RegisterForm";

const Registro: React.FC = () => {
  return (
    <>
      <Main>
        <Header />
        <Container as="section" minHeight="70vh" paddingY={8} centerContent>
          <RegisterForm />
        </Container>
        <Footer />
      </Main>
    </>
  );
};

export default Registro;
