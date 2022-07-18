import dynamic from "next/dynamic";
import Header from "../components/header/header";
import Main from "../layouts/Main";
import postList from "../lib/postlist";
import React from "react";

const PostList = dynamic(() => import("../components/postList"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <>
      <Header />
      <Main>
        <PostList list={postList} />
      </Main>
    </>
  );
};
export default HomePage;
