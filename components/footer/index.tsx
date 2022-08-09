import {
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const index = () => {
  return (
    <Container
      as="footer"
      role="contentinfo"
      py={{ base: "12", md: "16" }}
      marginTop="auto"
      w="100vw"
      bg="amarelo.420"
    >
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Midnight Programações. Todos os
          direitos reservados
        </Text>
      </Stack>
    </Container>

    // <Flex bg="amarelo.420" w="100%" marginTop="auto">
    //   footer
    // </Flex>
  );
};

export default index;
