import React, { useState } from "react";

import {
  Box,
  Button,
  Center,
  CloseButton,
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

interface addPumpers {
  firstname: string;
  lastname: string;
  gender: "male" | "female";
  dob: Date;
  address: string;
  nic: string;
  contactnumber: number;
  username: string;
}

const AddPumpers: React.FC = ({}) => {

  const toast = useToast();
  const id = "test-tost";
  const { register, handleSubmit } = useForm<addPumpers>();

  
    {/* Submit the form */}
  
  const onSubmit = (values: addPumpers) => {
    console.log(values);
    fetch("http://localhost:5000/pumpers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((value) => {
      if (value.ok == true) {
        toast({
          id,
          title: "New pumper details registered successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
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
    });
  };

  return (
    <>
      <Flex height="100vh" my={20}>
        <Flex width="30%" display={["none", "none", "none", "flex"]}>
          <Box
            boxSize="sm"
            bg="#f5f7fb"
            width="100%"
            height="100vh"
            m={-5}
          ></Box>
        </Flex>

        {/* Pumper Registation form */}
        <Flex width="70%">
          <Box boxSize="sm" width="100%" height="100vh" px={10}>
            <Text fontSize="2xl" textColor="#002366" pb={4}>
              Pumpers Registration
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
                  <FormLabel htmlFor="firstname" fontWeight="semibold" >First Name</FormLabel>
                  <Input {...register("firstname")} type="text" />
                </FormControl>

                {/* Last name */}
                <FormControl isRequired id="lastname" pt={5}>
                  <FormLabel htmlFor="lastname" fontWeight="semibold" >Last Name</FormLabel>
                  <Input {...register("lastname")} type="text" />
                </FormControl>

                {/* Gender */}
                <FormControl as="fieldset" isRequired id="gender">
                  <FormLabel as="legend" fontWeight="semibold" > Gender </FormLabel>
                  <RadioGroup name="gender" defaultValue="male">
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
                  <FormLabel htmlFor="dob" fontWeight="semibold" > Date of Birth</FormLabel>
                  <Input {...register("dob")} type="date" />
                </FormControl>

                {/* Address */}
                <FormControl isRequired id="address">
                  <FormLabel htmlFor="address" fontWeight="semibold" >Address</FormLabel>
                  <Input {...register("address")} type="text" />
                </FormControl>

                {/* nic */}
                <FormControl isRequired id="nic">
                  <FormLabel htmlFor="nic" fontWeight="semibold" >NIC Number</FormLabel>
                  <Input {...register("nic")} type="text" />
                </FormControl>

                {/* Contact Number*/}
                <FormControl isRequired id="contactnumber">
                  <FormLabel htmlFor="contactnumber" fontWeight="semibold" >Contact Number</FormLabel>
                  <Input {...register("contactnumber")} type="number" />
                </FormControl>

                {/* User Name*/}
                <FormControl isRequired id="username">
                  <FormLabel htmlFor="username" fontWeight="semibold"  >User Name (User name should be unique)</FormLabel>
                  <Input {...register("username")} type="string" />
                </FormControl>
              </SimpleGrid>
              <Center marginTop="14">
                <Button
                  type="submit"
                  colorScheme="facebook"
                  mx ={5}
                >
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

export default AddPumpers;
