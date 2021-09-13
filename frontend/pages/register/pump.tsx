import React from "react";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

interface addPump {
  fueltype: string;
  pumpname: string;
  initialreading: string;
  ongoingreading : Number;
}

const AddPump: React.FC = ({}) => {
  const { register, handleSubmit } = useForm<addPump>();
  const toast = useToast();
  const id = "test-tost";

  const onSubmit = (values: addPump) => {
    values.ongoingreading = 0
    console.log(values);
    fetch("http://localhost:5000/pump/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((value) => {
      console.log(value.ok);
      if (value.ok == true) {
        toast({
          id,
          title: "New pump add successfully",
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "top-right",
        });
      } else {
        toast({
          id,
          title: "Error. Please check fields again",
          status: "error",
          isClosable: true,
          duration: 1500,
          position: "top-right",
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

        <Flex width="70%">
          <Box boxSize="sm" width="100%" height="100vh" px={10}>
            <Text fontSize="2xl" textColor="#002366" pb={4}>
              Pump Registration
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
                <FormControl isRequired pt={5}>
                  <FormLabel htmlFor="fueltype"> Fuel Type </FormLabel>
                  <Select {...register("fueltype")}>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Super Diesel">Super Diesel</option>
                    <option value="Super Petrol">Super Petrol</option>
                    <option value="Kerosine">Kerosine</option>
                  </Select>
                </FormControl>

                {/* Pump Name */}
                <FormControl isRequired id="pumpname" pt={5}>
                  <FormLabel htmlFor="pumpname">Pump Name</FormLabel>
                  <Input {...register("pumpname")} type="text" />
                </FormControl>

                {/* Initial Reading */}
                <FormControl isRequired id="initialreading" pt={5}>
                  <FormLabel htmlFor="initialreading">
                    {" "}
                    Initial Reading{" "}
                  </FormLabel>
                  <Input  {...register("initialreading", { pattern: /^[0-9.]+$/i })} />
                </FormControl>
              </SimpleGrid>
              <Center marginTop="14">
                <Button type="submit" colorScheme="facebook" marginX="3">
                  Submit
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

export default AddPump;
