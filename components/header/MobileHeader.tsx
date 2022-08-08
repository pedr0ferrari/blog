import React, { useContext, useState } from "react";
import { Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { HiMenu } from "react-icons/hi";

const MobileHeader = () => {
  const { user } = useLoggedInUser();
  const { auth } = useContext(FirebaseCtx);
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const handleRoute = (path: string) => {
    router.push(path);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Flex
        as="header"
        paddingX={8}
        height="11vh"
        minHeight="80px"
        alignItems="center"
        bg="amarelo.420"
        display={{ base: "flex", md: "flex", lg: "none", xl: "none" }}
      >
        <Heading fontFamily="mono" fontWeight="normal" size="lg" flexGrow="1">
          bloguerino
        </Heading>

        <IconButton
          fontSize="3xl"
          colorScheme="amarelo"
          color="preto"
          aria-label="open menu"
          icon={<HiMenu />}
          onClick={handleOpenMenu}
        />
      </Flex>

      {/* another way to ternary openMenu */}
      {/* {openMenu ? (
        <Flex
          width="100%"
          height="100vh"
          bg="rgba(226, 227, 149, 1)"
          display={{ base: "flex" }}
        ></Flex>
      ) : (
        <></>
      )} */}

      <Flex
        width="100%"
        height="100vh"
        bg="rgba(226, 227, 149, 1)"
        display={{ base: openMenu ? "flex" : "none" }}
      >
        {" "}
        {user ? (
          <Flex
            as="nav"
            width="100%"
            direction="column"
            alignContent="center"
            gap={9}
            py="8"
            px="8"
          >
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
              }}
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex
            as="nav"
            width="100%"
            direction="column"
            alignContent="center"
            gap={9}
            py="8"
            px="8"
          >
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
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default MobileHeader;
