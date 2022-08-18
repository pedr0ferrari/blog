import {
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      bg="amarelo.420"
      minH="20vh"
      w="100%"
      paddingY={8}
      direction="column"
      align="center"
      justify="center"
      gap="2"
    >
      <Stack
        justify="space-between"
        direction="row"
        align="center"
        justifyContent="center"
      >
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            size="lg"
            href="https://www.linkedin.com/in/pedro-ferrari-a6538a248/"
            target="_blank"
            _hover={{}}
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="2.25rem" />}
          />
          <IconButton
            as="a"
            size="lg"
            href="https://github.com/pedr0ferrari"
            target="_blank"
            _hover={{}}
            aria-label="GitHub"
            icon={<FaGithub fontSize="2.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Flex
        direction="column"
        gap="2"
        align={{ base: "flex-start", md: "center", lg: "center" }}
      >
        <Text fontSize="sm" color="subtle" pt="2" fontWeight="bold">
          Contato: pedrosantanaferrari96@gmail.com
        </Text>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Pedro Santana Ferrari. Todos os
          direitos reservados.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
