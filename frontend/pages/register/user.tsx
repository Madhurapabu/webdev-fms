import React from "react";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

interface User {
  firstname: string;
  lastname: string;
  gender: "male" | "female";
  dob: Date;
  address: string;
  nic: string;
  contactnumber: number;
  username: string;
  password: string;
  repassword: string;
}

const UserRegister: React.FC = ({}) => {
  const toast = useToast();
  const id = "test-tost";
  const { register, handleSubmit } = useForm<User>();

  const onSubmit = (values: User) => {

    if(values.password.length >= 6){
        if (values.password == values.repassword) {
        console.log(values);
            fetch("http://localhost:5000/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(values),
          }).then((value) => {
            console.log(value.ok)
            if (value.ok == true) {
                location.replace("/login")
            }
            else{
              toast({
                id,
                title: "Error. Please check fields again",
                status: "error",
                isClosable: true,
                duration: 1500,
              });
            }
            })
        }
        else {
        toast({
            id,
            title: "Those passwords didn’t match. Try again.",
            status: "error",
            isClosable: true,
            duration: 1500,
            position:"top-right"
        });
        }
    }
    else{
        toast({
            id,
            title: "Password shuld be at least 6 chacters",
            status: "error",
            isClosable: true,
            duration: 1500,
            position:"top-right"
        });
    }
  };

  return (
    <>
      <Flex height="100vh" my={20} align="center" justifyContent="center">
        {/* User Registation form */}
        <Flex width="70%" align="center">
          <Box boxSize="sm" width="100%" height="100vh" px={10}>
            <Text fontSize="2xl" textColor="#002366" pb={4}>
              User Registration
            </Text>
            <Divider bg="#002366" height="2px"></Divider>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid
                width="100%"
                height="-moz-min-content"
                columns={{ sm: 1, md: 2 }}
                spacingX="60px"
                spacingY="40px"
              >
                <FormControl isRequired id="firstname" pt={5}>
                  <FormLabel htmlFor="firstname" fontWeight="semibold">
                    First Name
                  </FormLabel>
                  <Input {...register("firstname")} type="text" />
                </FormControl>

                {/* Last name */}
                <FormControl isRequired id="lastname" pt={5}>
                  <FormLabel htmlFor="lastname" fontWeight="semibold">
                    Last Name
                  </FormLabel>
                  <Input {...register("lastname")} type="text" />
                </FormControl>

                {/* Gender */}
                <FormControl as="fieldset" isRequired id="gender">
                  <FormLabel as="legend" fontWeight="semibold">
                    {" "}
                    Gender{" "}
                  </FormLabel>
                  <RadioGroup name="gender">
                    <HStack spacing="50px">
                      <Radio value="male" {...register("gender")}>
                        Male
                      </Radio>
                      <Radio value="female" {...register("gender")}>
                        Female
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>

                {/* DOB  */}
                <FormControl isRequired id="dob">
                  <FormLabel htmlFor="dob" fontWeight="semibold">
                    {" "}
                    Date of Birth
                  </FormLabel>
                  <Input {...register("dob")} type="date" />
                </FormControl>

                {/* Address */}
                <FormControl isRequired id="address">
                  <FormLabel htmlFor="address" fontWeight="semibold">
                    Address
                  </FormLabel>
                  <Input {...register("address")} type="text" />
                </FormControl>

                {/* nic */}
                <FormControl isRequired id="nic">
                  <FormLabel htmlFor="nic" fontWeight="semibold">
                    NIC Number
                  </FormLabel>
                  <Input {...register("nic")} type="text" />
                </FormControl>

                {/* Contact Number*/}
                <FormControl isRequired id="contactnumber">
                  <FormLabel htmlFor="contactnumber" fontWeight="semibold">
                    Contact Number
                  </FormLabel>
                  <Input {...register("contactnumber")} type="number" />
                </FormControl>

                {/* User Name*/}
                <FormControl isRequired id="username">
                  <FormLabel htmlFor="username" fontWeight="semibold">
                    User Name (User name should be unique)
                  </FormLabel>
                  <Input {...register("username")} type="string" />
                </FormControl>

                {/* Password*/}
                <FormControl isRequired id="password">
                  <FormLabel htmlFor="password" fontWeight="semibold">
                    Password
                  </FormLabel>
                  <Input {...register("password")} type="password" />
                </FormControl>

                {/* Re Enter the Password*/}
                <FormControl isRequired id="repassword">
                  <FormLabel htmlFor="repassword" fontWeight="semibold">
                    Re enter your Password
                  </FormLabel>
                  <Input {...register("repassword")} type="password" />
                </FormControl>
              </SimpleGrid>

              <Center marginTop="14">
                <Button type="submit" colorScheme="facebook" mx={5}>
                  Register
                </Button>
                <Button type="reset" marginX="3">
                  Reset
                </Button>
              </Center>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default UserRegister;
