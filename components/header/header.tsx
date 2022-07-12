import Link from "next/link";
import styles from "./header.module.css";
import { Button, Flex, Heading } from "@chakra-ui/react";
import handler from "../../pages/api/hello";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <Flex
      as="header"
      paddingX={8}
      height="10vh"
      alignItems="center"
      backgroundColor="antiquewhite"
    >
      <Heading size="2xl" flexGrow="1">
        *~ITALO VIADO~*
      </Heading>
      <Flex as="nav" gap={3}>
        <Button
          size="lg"
          as="a"
          colorScheme="yellow"
          onClick={() => handleRoute("/")}
        >
          Home
        </Button>

        <Button
          size="lg"
          as="a"
          colorScheme="yellow"
          onClick={() => handleRoute("/meusposts")}
        >
          Meus Posts
        </Button>

        <Button
          size="lg"
          as="a"
          colorScheme="yellow"
          onClick={() => handleRoute("/contato")}
        >
          Contato
        </Button>

        <Button
          size="lg"
          as="a"
          colorScheme="yellow"
          onClick={() => handleRoute("/perfil")}
        >
          Perfil
        </Button>
        <Button
          size="lg"
          as="a"
          colorScheme="yellow"
          onClick={() => handleRoute("/registro")}
        >
          Registro
        </Button>
        <Button
          size="lg"
          as="a"
          colorScheme="yellow"
          onClick={() => handleRoute("/login")}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
