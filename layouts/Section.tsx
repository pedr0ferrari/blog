import { Box } from "@chakra-ui/react";
import React from "react";

const Section = ({ children }) => {
  return (
    <Box as="section" w="100%" py="8">
      {children}
    </Box>
  );
};

export default Section;
