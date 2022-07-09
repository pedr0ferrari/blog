import dynamic from "next/dynamic";
import Header from "../components/header/header";
import Main from "../layouts/Main";
import postList from "../lib/postlist";

const PostList = dynamic(() => import("../components/postList"), {
  ssr: false,
});

function HomePage() {
  return (
    <>
      <Header />
      <Main>
        <PostList list={postList} />
      </Main>
    </>
  );
}
export default HomePage;
