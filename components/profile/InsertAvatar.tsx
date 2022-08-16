import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import firebase from "firebase";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const InsertAvatar = () => {
  const { register, handleSubmit } = useForm();
  const { firestore } = useContext(FirebaseCtx);
  const { user } = useLoggedInUser();
  const toast = useToast();

  const storeImageOnBucket = (avatarFile) => {
    try {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`userAvatar/${avatarFile[0].name}`);

      imageRef.put(avatarFile[0]).then((snapshot) => {
        return snapshot;
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const addAvatarUrlToUser = async (avatarUrl) => {
    try {
      user &&
        (await firestore
          .collection("users")
          .doc(user.uid)
          .set({ ...user, avatarUrl: avatarUrl }));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleImageUpload = (data) => {
    try {
      storeImageOnBucket(data.avatarFile);
      addAvatarUrlToUser(data.avatarFile[0].name);
    } catch (error) {
      toast({
        title: "Ocorreu um erro... Tente novamente",
        status: "error",
      });
    }
  };

  return (
    <Flex
      as="form"
      direction={{ base: "column", md: "row", lg: "row", xl: "row" }}
      gap={5}
      onSubmit={handleSubmit(handleImageUpload)}
    >
      <FormControl>
        <FormLabel htmlFor="avatarFile">
          Insira um avatar para seu perfil.
        </FormLabel>
        <Input
          pt={1}
          width="max-content"
          type="file"
          {...register("avatarFile")}
          borderColor="black"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            flexBasis: "100%",
          }}
        />
      </FormControl>
      <Button
        type="submit"
        alignSelf={{
          base: "flex-start",
          md: "flex-end",
          lg: "flex-end",
          xl: "flex-end",
        }}
      >
        Salvar
      </Button>
    </Flex>
  );
};

export default InsertAvatar;
