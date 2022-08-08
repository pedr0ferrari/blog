import dynamic from "next/dynamic";
import Header from "../components/header/Header";
import Main from "../layouts/Main";
import React from "react";

const PostList = dynamic(() => import("../components/postList"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <>
      <Header />
      <Main>
        <PostList />
      </Main>
    </>
  );
};
export default HomePage;
