import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
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

  const handleGetUserPosts = async (user: UserType) => {
    try {
      const postsCollection = await firestore
        .collection("posts")
        .where("userId", "==", user.uid)
        .get();

      const postsList = postsCollection.docs.map((doc) => {
        const data = doc.data() as PostInterface;
        return data;
      });

      setList(postsList);
    } catch (error) {
      // change this to TOAST with error
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) handleGetUserPosts(user);
  }, [user]);

  return (
    <Grid
      h="200px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(6, 1fr)"
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
