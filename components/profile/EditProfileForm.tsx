import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { UserType } from "../../interface/User";

const EditProfileForm: React.FC<{ user: UserType }> = ({ user }) => {
  const { register } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  return (
    <Flex as="form" direction="column" gap={5}>
      <Input type="name" {...register("name")} />
      <Input type="email" {...register("email")} />
      <Button colorScheme={"teal"}>Confirmar edição de perfil</Button>
    </Flex>
  );
};

export default EditProfileForm;
