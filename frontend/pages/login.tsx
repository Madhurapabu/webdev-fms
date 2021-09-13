import React from "react";

import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface User {
  username: string;
  password: string;
}

const Login: React.FC = ({}) => {
  const { register, handleSubmit } = useForm<User>();

  const onSubmit = (values: User) => {
      console.log(values)
  };

  return (
    <>
      <Flex
        w="full"
        height="100vh"
        bg="gray.100"
        align="center"
        justifyContent="center"
        mt={5}
      >
        <Flex
          bg="white"
          width="300px"
          h="400px"
          borderRadius="xl"
          shadow="lg"
          direction="column"
          align="center"
        >
          <Heading size="md" mt={5} textColor="gray.500">
            Login
          </Heading>
          <Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* User Name */}
              <FormControl isRequired id="username" pt={8}>
                <FormLabel
                  htmlFor="username"
                  fontWeight="semibold"
                  fontSize="sm"
                  textColor="gray.600"
                >
                  User Name
                </FormLabel>
                <Input
                  {...register("username")}
                  type="text"
                  borderWidth="0px"
                  borderBottom="1px"
                  borderRadius="0px"
                  variant="unstyled"
                  _hover={{ borderBottomColor: "gray.400" }}
                />
              </FormControl>

              {/* Password */}
              <FormControl isRequired id="password" mt={12}>
                <FormLabel
                  htmlFor="password"
                  fontWeight="semibold"
                  fontSize="sm"
                  textColor="gray.600"
                >
                  Password
                </FormLabel>
                <Input
                  {...register("password")}
                  type="password"
                  borderWidth="0px"
                  borderBottom="1px"
                  borderRadius="0px"
                  variant="unstyled"
                  _hover={{ borderBottomColor: "gray.400" }}
                />
              </FormControl>

              <Center marginTop="8">
                <Button type="submit" colorScheme="facebook"  size="sm">
                  Login
                </Button>
              </Center>
            </form>
          </Flex>

          <Text mt={4} textColor="gray.600" fontWeight="semibold">
            {" "}
            OR{" "}
          </Text>

          <Button type="submit" colorScheme="whatsapp"  size="sm" mt={4}>
            Sign In
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
