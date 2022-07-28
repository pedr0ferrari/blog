import React, { useContext, useEffect, useState } from "react";
import PostCard, { Author } from "./post";
import { Grid } from "@chakra-ui/react";
import { FirebaseCtx } from "../../config/context";
import { PostInterface } from "../../interface/Post";

const PostList: React.FC = () => {
  const [list, setList] = useState([]);
  const { firestore } = useContext(FirebaseCtx);

  const handleGetPosts = async () => {
    try {
      const postsCollection = await firestore.collection("posts").get();
      const postsList = postsCollection.docs.map((doc) => {
        const data = doc.data();
        console.log("cadaItemDaLista", data);
        return data;
      });
      console.log("postsList", postsList);
      setList(postsList);
    } catch (error) {
      // change this to TOAST with error
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <div>
      <Grid
        h="200px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={7}
      >
        {list.map((post: PostInterface, index: number) => {
          return <PostCard key={index} post={post} index={index} />;
        })}
      </Grid>
    </div>
  );
};

export default PostList;
