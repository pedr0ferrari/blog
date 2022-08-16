import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React from "react";
import { NextPage } from "next";
import { Container, Spinner } from "@chakra-ui/react";
import Footer from "../components/footer";
import useLoggedInUser from "../hooks/useLoggedInUser";

const PostList = dynamic(() => import("../components/postList"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  const { user, authState } = useLoggedInUser();
  return (
    <>
      <Main>
        {authState === "LOADING" ? (
          <Spinner />
        ) : (
          <>
            <Header />
            <Container
              as="section"
              minHeight="70vh"
              maxWidth="4xl"
              paddingY={8}
              centerContent
            >
              <PostList />
            </Container>
            <Footer />
          </>
        )}
      </Main>
    </>
  );
};
export default HomePage;
