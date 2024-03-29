import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../../config/context";
import { UserType } from "../../interface/User";

export interface UpdateUserFormType {
  email: string;
  name: string;
}

const EditProfileForm: React.FC<{ user: UserType }> = ({ user }) => {
  const { authUser, firestore } = useContext(FirebaseCtx);
  const { register, handleSubmit } = useForm<UpdateUserFormType>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const toast = useToast();

  const handleUpdateForm = async (data: UpdateUserFormType) => {
    try {
      if (authUser) {
        await authUser.updateEmail(data.email);
        await firestore
          .collection("users")
          .doc(authUser.uid)
          .update({ ...user, name: data.name, email: data.email });
      }
      toast({
        title: "Informações alteradas com sucesso!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Ooops! Tente novamente...",
        status: "error",
        description: `error.message: ${error.message}`,
      });
    }
  };
  return (
    <Flex
      as="form"
      direction="column"
      gap={5}
      onSubmit={handleSubmit(handleUpdateForm)}
    >
      <Input type="name" {...register("name")} borderColor="black" />
      <Input type="email" {...register("email")} borderColor="black" />
      <Button colorScheme="teal" type="submit">
        Confirmar edição de perfil
      </Button>
    </Flex>
  );
};

export default EditProfileForm;
