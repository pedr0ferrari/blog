import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React from "react";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import Footer from "../components/footer";

const PostList = dynamic(() => import("../components/postList"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  return (
    <>
      <Main>
        <Header />
        <Container as="section" minHeight="70vh" paddingY={8} centerContent>
          <PostList />
        </Container>
        <Footer />
      </Main>
    </>
  );
};
export default HomePage;
