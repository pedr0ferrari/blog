import React, { useContext } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const { user } = useLoggedInUser();
  const { auth } = useContext(FirebaseCtx);
  const router = useRouter();

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <MobileHeader />
      {/* <WebHeader /> */}
    </>
  );
};

export default Header;
