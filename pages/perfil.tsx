import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React from "react";
import ProfileForm from "../components/profile/ProfileForm";
import Footer from "../components/footer";
import { Container } from "@chakra-ui/react";

const Perfil: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container as="section" minHeight="70vh" paddingY={8} centerContent>
        <ProfileForm />
      </Container>
      <Footer />
    </Main>
  );
};
export default Perfil;
