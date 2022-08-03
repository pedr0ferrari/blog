import { Flex, GridItem } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";

import { FirebaseCtx } from "../../../config/context";
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import { PostInterface } from "../../../interface/Post";
import { UserType } from "../../../interface/User";

const PostCard: React.FC<{
  post: PostInterface;
  index: number;
}> = ({ post, index }) => {
  const { firestore } = useContext(FirebaseCtx);
  const [author, setAuthor] = useState<UserType | null>(null);
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState<string>("");
  const { user } = useLoggedInUser();

  const handleGetUserById = async () => {
    try {
      const userRef = await firestore.collection("users").doc(post.userId);
      const userById = await userRef.get();
      const dataUserById = userById.data() as UserType;
      console.log(dataUserById);
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
    console.log(user && user.avatarUrl);
    user && getHttpReference(user.avatarUrl);
  }, [user]);

  useEffect(() => {
    handleGetUserById();
  }, []);

  const date = new Date(post.createdAt).toUTCString().slice(0, -3);
  if (index === 0) {
    return (
      <GridItem colSpan={6} marginY={8}>
        <Flex>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          <Flex direction="column" paddingX={5} paddingY={1}>
            <Flex as="header" direction="column">
              <Text fontSize="4xl" fontWeight="bold">
                {post.title}
              </Text>
              <Text paddingY={2}>{post.content}</Text>
            </Flex>
            <Text fontSize="2xl">{post.description}</Text>
            <Flex as="footer" paddingY={2} marginTop="auto">
              <Image
                w={10}
                h={10}
                borderRadius="full"
                src={authorAvatarUrl}
                alt={author && `avatar de ${author.name}`}
              />
              <Flex direction="column" paddingX={2}>
                <p>author: {author && author.name}</p>
                <p>
                  <i>{date}</i>
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
    );
  } else {
    return (
      <GridItem colSpan={2} bg="white" paddingX={4} paddingY={2}>
        <header>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
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
          />
          <Flex direction="column" paddingX={2}>
            <p>author: {author && author.name}</p>
            <p>
              <i>{date}</i>
            </p>
          </Flex>
        </Flex>
      </GridItem>
    );
  }
};

export default PostCard;
