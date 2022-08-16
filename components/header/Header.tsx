import React, { useContext } from "react";
import { useRouter } from "next/router";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const { user, authState } = useLoggedInUser();
  const router = useRouter();

  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <MobileHeader />
      <WebHeader />
    </>
  );
};

export default Header;
