import { Flex, GridItem, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import React from "react";
import { PostInterface } from "..";

export interface Author {
  name: string;
  avatar_url: string;
}

const PostCard: React.FC<{
  post: PostInterface;
  index: number;
}> = ({ post, index }) => {
  const date = new Date(post.created_at).toUTCString().slice(0, -3);
  if (index === 0) {
    return (
      <GridItem colSpan={6} marginY={8}>
        <Flex>
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          <Flex direction="column" paddingX={5} paddingY={1}>
            <header>
              <Text fontSize="4xl" fontWeight="bold">
                {post.title}
              </Text>
            </header>
            <Text fontSize="2xl">{post.description}</Text>
            <Flex as="footer" paddingY={2} marginTop="auto">
              <Image
                w={10}
                h={10}
                borderRadius="full"
                src={post.author.avatar_url}
                alt="Avatar de Pedro Ferrari"
              />
              <Flex direction="column" paddingX={2}>
                <p>author: {post.author.name}</p>
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
        </header>
        <p>{post.description}</p>
        <Flex as="footer" paddingY={2} marginTop="auto">
          <Image
            w={10}
            h={10}
            borderRadius="full"
            src={post.author.avatar_url}
            alt="Avatar de Pedro Ferrari"
          />
          <Flex direction="column" paddingX={2}>
            <p>author: {post.author.name}</p>
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
