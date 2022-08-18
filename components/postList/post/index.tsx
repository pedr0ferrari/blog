import { Flex, GridItem, SkeletonCircle } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";

import { FirebaseCtx } from "../../../config/context";
import { CreatedAt, PostInterface } from "../../../interface/Post";
import { UserType } from "../../../interface/User";

const PostCard: React.FC<{
  post: PostInterface;
}> = ({ post }) => {
  const { firestore } = useContext(FirebaseCtx);
  const [author, setAuthor] = useState<UserType | null>(null);
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState<string>("");

  const handleGetUserById = async () => {
    try {
      const userRef = await firestore.collection("users").doc(post.userId);
      const userById = await userRef.get();
      const dataUserById = userById.data() as UserType;
      setAuthor(dataUserById);
    } catch (error) {
      console.log(error);
    }
  };

  const getHttpReference = (avatarPath) => {
    const storage = firebase.storage();
    const pathReference = storage.ref();
    pathReference
      .child(`userAvatar/${avatarPath}`)
      .getDownloadURL()
      .then((url) => {
        setAuthorAvatarUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    author && getHttpReference(author.avatarUrl);
  }, [author]);

  useEffect(() => {
    handleGetUserById();
  }, []);

  const createdAt: CreatedAt = post.createdAt;

  const createdAtInSeconds: number = createdAt.seconds;
  const createdAtInMs = createdAtInSeconds * 1000;
  const date = new Date(createdAtInMs).toLocaleString();

  return (
    <GridItem
      colSpan={2}
      bg="amarelo.420"
      boxShadow="0 0 8px grey"
      paddingX={4}
      paddingY={2}
      height="max-content"
    >
      <header>
        <Text fontSize="xl" fontWeight="bold">
          {post.title}
        </Text>
        <Text paddingY={1}>{post.content}</Text>
      </header>
      <p>{post.description}</p>
      <Flex as="footer" paddingY={2} marginTop="auto">
        <Image
          w={10}
          h={10}
          borderRadius="full"
          src={authorAvatarUrl}
          alt={author && `avatar de ${author.name}`}
          fallback={
            <SkeletonCircle
              w={10}
              h={10}
              startColor="white"
              endColor="yellow"
            />
          }
        />
        <Flex direction="column" paddingX={2}>
          <p>author: {author && author.name}</p>
          <i>{date}</i>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default PostCard;
