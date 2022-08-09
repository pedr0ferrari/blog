import { Container } from "@chakra-ui/react";
import React from "react";
import Footer from "../components/footer";
import Section from "./Section";

const Main: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Container
        as="main"
        maxWidth="4xl"
        minHeight="90vh"
        paddingX="8"
        paddingTop="8"
        centerContent
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};
export default Main;
