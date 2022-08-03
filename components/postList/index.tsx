import React, { useContext, useEffect, useState } from "react";
import PostCard from "./post";
import { Grid, useToast } from "@chakra-ui/react";
import { FirebaseCtx } from "../../config/context";
import { PostInterface } from "../../interface/Post";

const PostList: React.FC = () => {
  const [list, setList] = useState([]);
  const { firestore } = useContext(FirebaseCtx);
  const toast = useToast();

  const handleGetPosts = async () => {
    try {
      const postsCollection = await firestore.collection("posts").get();
      const postsList = postsCollection.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      setList(postsList);
    } catch (error) {
      // change this to TOAST with error
      toast({
        title: "Ocorreu um erro! Tente novamente",
        status: "error",
      });
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <Grid
      h="200px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={7}
    >
      {list.map((post: PostInterface, index: number) => {
        return <PostCard key={post.uid} post={post} index={index} />;
      })}
    </Grid>
  );
};

export default PostList;
