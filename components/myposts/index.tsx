import React, { useContext, useEffect, useState } from "react";
import { Grid, useToast } from "@chakra-ui/react";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { PostInterface } from "../../interface/Post";
import { UserType } from "../../interface/User";
import CreatePostModal from "../CreatePostModal";
import PostCard from "../postList/post";

const MyPosts: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [list, setList] = useState<PostInterface[]>([]);
  const { firestore } = useContext(FirebaseCtx);
  const { user } = useLoggedInUser();
  const toast = useToast();

  const handleGetUserPosts = async (user: UserType) => {
    try {
      const list = user && (await getUserPosts(user));
      const orderedList = list.sort((x, y) => {
        return x.createdAt - y.createdAt;
      });

      orderedList.reverse();

      setList(list);
    } catch (error) {
      toast({
        title: "Ocorreu um erro... Tente novamente",
        status: "error",
      });
    }
  };

  const getUserPosts = async (user: UserType) => {
    try {
      const postsCollection = await firestore
        .collection("posts")
        .where("userId", "==", user.uid)
        .get();

      const postsList = postsCollection.docs.map((doc) => {
        const data = doc.data() as PostInterface;
        return data;
      });

      return postsList;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (user) handleGetUserPosts(user);
  }, [user]);

  return (
    <Grid
      h="200px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(1, 1fr)"
      gap={7}
    >
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
      {list &&
        list.map((post, index) => {
          return <PostCard key={post.uid} post={post} index={index} />;
        })}
    </Grid>
  );
};

export default MyPosts;
