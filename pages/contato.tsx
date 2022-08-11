import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React from "react";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/footer";
import { Container } from "@chakra-ui/react";

const Contato: React.FC = () => {
  return (
    <>
      <Main>
        <Header />
        <Container as="section" minHeight="70vh" paddingY={8} centerContent>
          <ContactForm />
        </Container>
        <Footer />
      </Main>
    </>
  );
};

export default Contato;
