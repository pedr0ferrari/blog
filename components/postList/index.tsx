import React from "react";
import PostCard, { Author } from "./post";
import { Grid, GridItem } from "@chakra-ui/react";
export interface PostInterface {
  title: string;
  content: string;
  description: string;
  author: Author;
  created_at: number;
}

const PostList: React.FC<{
  list: PostInterface[];
}> = ({ list }) => {
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
