import { Avatar, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import firebase from "firebase";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../../config/context";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const InsertAvatar = () => {
  const { register, handleSubmit } = useForm();
  const { firestore } = useContext(FirebaseCtx);
  const { user } = useLoggedInUser();

  const storeImageOnBucket = (avatarFile) => {
    try {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`userAvatar/${avatarFile[0].name}`);
      console.log("imageRef", imageRef);
      imageRef.put(avatarFile[0]).then((snapshot) => {
        console.log("snapshot", snapshot);
      });
    } catch (error) {
      console.log(error);
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
      console.error(error);
    }
  };

  const handleImageUpload = (data) => {
    console.log(data);
    storeImageOnBucket(data.avatarFile);
    addAvatarUrlToUser(data.avatarFile[0].name);
  };

  return (
    <Flex as="form" onSubmit={handleSubmit(handleImageUpload)}>
      <FormLabel>avatar</FormLabel>
      <Input type="file" {...register("avatarFile")} />
      <Button type="submit">Salvar avatar</Button>
    </Flex>
  );
};

export default InsertAvatar;
