import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React from "react";
import ProfileForm from "../components/profile/ProfileForm";
import Footer from "../components/footer";
import { Container, Spinner } from "@chakra-ui/react";
import useLoggedInUser from "../hooks/useLoggedInUser";

const Perfil: React.FC = () => {
  const { authState } = useLoggedInUser();

  return (
    <Main>
      <Header />
      <Container as="section" minHeight="70vh" paddingY={8} centerContent>
        {authState === "LOADING" ? <Spinner /> : <ProfileForm />}
      </Container>
      <Footer />
    </Main>
  );
};
export default Perfil;
