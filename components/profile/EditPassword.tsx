import { Button, Flex, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";

import { FirebaseCtx } from "../../config/context";

const EditPassword: React.FC<{ user }> = ({ user }) => {
  const { auth } = useContext(FirebaseCtx);
  const toast = useToast();

  const resetPassword = async (email) =>
    await auth.sendPasswordResetEmail(email);

  const handlePasswordChange = async (email: string, e: React.MouseEvent) => {
    try {
      e.preventDefault();
      await resetPassword(email);

      toast({
        title: "Enviamos um email para o endereço cadastrado!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Ooops! Tente novamente...",
        status: "error",
        description: `Erro: ${error.message}`,
      });
    }
  };

  return (
    <Flex as="form" direction="column" gap={5}>
      <Button
        colorScheme="telegram"
        type="submit"
        onClick={(e) => handlePasswordChange(user.email, e)}
      >
        Alterar senha por email
      </Button>
    </Flex>
  );
};

export default EditPassword;
