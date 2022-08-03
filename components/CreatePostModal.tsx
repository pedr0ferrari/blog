import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseCtx } from "../config/context";
import useLoggedInUser from "../hooks/useLoggedInUser";

type PostData = {
  title: string;
  content: string;
};

const CreatePostModal = ({ isOpen, onClose }) => {
  const { firestore } = useContext(FirebaseCtx);
  const toast = useToast();
  const { user } = useLoggedInUser();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<PostData>({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const handleCreatePost = async (data: PostData) => {
    try {
      const postId = await createPost(data);
      if (postId) {
        onClose();
        reset();
        toast({
          title: "Postagem criada com sucesso!",
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Alguma coisa deu errado... tente novamente.",
        status: "error",
        description: `Erro: ${error.message}`,
      });
    }
  };

  const createPost = async (newPost) => {
    try {
      const postRef = firestore.collection("posts").doc();
      const postId = postRef.id;

      await postRef.set({
        ...newPost,
        uid: postId,
        userId: user && user.uid,
        createdAt: Date.now(),
      });

      console.log(newPost);
      return postId;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const closeAndReset = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(handleCreatePost)}>
        <ModalHeader>
          <Text fontSize="3xl" fontWeight="extrabold">
            Crie sua postagem!
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={5}>
            <FormControl isInvalid={Boolean(errors.title)}>
              <FormLabel>Título</FormLabel>
              {/* spread operator = ... */}
              <Input
                placeholder="Título da postagem"
                {...register("title", {
                  required: "Obrigatório preencher este campo!",
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.content)}>
              <FormLabel>Texto da postagem</FormLabel>
              <Textarea
                placeholder="Digite o texto da sua publicação"
                {...register("content", {
                  required: "Obrigatório preencher este campo!",
                })}
              />

              <FormErrorMessage>
                {errors.content && errors.content.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" isDisabled={!isValid} colorScheme="yellow">
            Criar
          </Button>
          <Button onClick={closeAndReset}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
