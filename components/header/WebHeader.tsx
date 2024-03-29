import React, { useContext } from "react";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const WebHeader = () => {
  const { user, authState } = useLoggedInUser();
  const { auth } = useContext(FirebaseCtx);
  const router = useRouter();

  // const handleRoute = (path: string) => {
  //   console.log("router.asPath", router.asPath);
  //   if (router.asPath === "/" && authState === "LOGGEDOUT") {
  //     router.reload();
  //   } else {
  //     router.push(path);
  //   }
  // };

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <Flex
      as="header"
      w="100%"
      paddingX={8}
      height="10vh"
      minHeight="80px"
      alignItems="center"
      bg="amarelo.420"
      display={{ base: "none", md: "none", lg: "flex", xl: "flex" }}
    >
      <Heading fontFamily="mono" fontWeight="normal" size="xl" flexGrow="1">
        bloguerino
      </Heading>

      {authState === "LOADING" ? (
        <Spinner />
      ) : (
        <Flex as="nav" gap={3}>
          {user ? (
            <>
              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/")}
              >
                Home
              </Button>

              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/meusposts")}
              >
                Meus Posts
              </Button>

              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/contato")}
              >
                Contato
              </Button>

              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/perfil")}
              >
                Perfil
              </Button>

              <Button
                size="lg"
                variant="headerBtn"
                onClick={async () => {
                  await auth.signOut();
                  handleRoute("/");
                  router.reload();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/")}
              >
                Home
              </Button>

              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/contato")}
              >
                Contato
              </Button>

              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/registro")}
              >
                Registro
              </Button>
              <Button
                size="lg"
                variant="headerBtn"
                onClick={() => handleRoute("/login")}
              >
                Login
              </Button>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default WebHeader;
