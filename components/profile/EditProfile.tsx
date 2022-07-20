import { Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { UserType } from "../../interface/User";

const EditProfile: React.FC<{ user: UserType }> = ({ user }) => {
  const { register } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  return (
    <Flex as="form" direction="column" gap={5}>
      <Input type="name" {...register("name")} />
      <Input />
    </Flex>
  );
};

export default EditProfile;
