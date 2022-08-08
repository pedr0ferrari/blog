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
      direction="column"
      padding="8"
      margin="0 auto"
    >
      {children}
    </Flex>
  );
};
export default Main;
