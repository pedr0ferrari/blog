import { Flex } from "@chakra-ui/react";
import React from "react";

const Main: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex
      as="main"
      maxWidth="1140px"
      minHeight="90vh"
      padding="2rem 4rem"
      margin="0 auto"
      backgroundColor="rgb(213, 216, 196)"
    >
      {children}
    </Flex>
  );
};
export default Main;
