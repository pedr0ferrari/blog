import React, { useContext } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const Header = () => {
  const { user } = useLoggedInUser();
  const { auth } = useContext(FirebaseCtx);
  const router = useRouter();

  const firstName = user && user.name.split(" ").slice(0, 1);

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
      {user ? (
        <Heading size="2xl" flexGrow="1">
          {firstName}
        </Heading>
      ) : (
        <Heading size="2xl" flexGrow="1">
          *~ITALO VIADO~*
        </Heading>
      )}

      {user ? (
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
            onClick={async () => {
              await auth.signOut();
              handleRoute("/");
            }}
          >
            Logout
          </Button>
        </Flex>
      ) : (
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
            onClick={() => handleRoute("/contato")}
          >
            Contato
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
      )}
    </Flex>
  );
};

export default Header;
