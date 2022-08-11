import { Flex } from "@chakra-ui/react";
import React from "react";

const Main: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex
      as="main"
      w="100%"
      maxWidth="100vw"
      direction="column"
      align="center"
      minHeight="100vh"
    >
      {children}
    </Flex>
  );
};
export default Main;
