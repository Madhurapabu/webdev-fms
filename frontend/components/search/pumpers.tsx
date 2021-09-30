import React, { useEffect, useState } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

interface viewRes {
  id: string;
  firstname: string;
  lastname: string;
  gender: "male" | "female";
  dob: Date;
  address: string;
  nic: string;
  contactnumber: number;
  username: string;
  totalSale: string;
  prevSale: string;
}

const DeletePumper: React.FC<{id: string, fname: string, lname: string}> = ({id, fname, lname}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const deletePumper = () =>{
    fetch("http://localhost:5000/pumpers/" + id,{ 
     method: "DELETE" 
  }).then((value) => {

    if( value.ok == true){
      const reload = async() =>{
        toast({
          title: "Pumper is removed.",
          status: "success",
          isClosable: true, 
          duration: 1500,
          position: "top-right",
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        location.reload();
      }          
      reload();
    }
     
  })
  }

  return(<> 
  
  <Button colorScheme="red" size="sm" onClick={onOpen} mr={5} mt={2}>Remove</Button>

 <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader color="red.500">Delete {fname} {lname}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text> Are you sure you want to remove {fname} {lname}?  </Text>
      <Text>  Pumper will be deleted permanently from system. </Text> 
   
    </ModalBody>

    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={onClose}>
        Close
      </Button>
      <Button colorScheme="red" onClick={deletePumper}>Remove {fname}</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  </>
)
}


const PumperEdit: React.FC<{
  data: {
    id: string;
    firstname: string;
    lastname: string;
    gender: "male" | "female";
    dob: Date;
    address: string;
    nic: string;
    contactnumber: number;
    username: string;
    totalSale: string;
    prevSale: string;
  };
}> = ({ data }) => {
  const { register, handleSubmit } = useForm<viewRes>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onSubmit = (values: viewRes) => {
    values.dob = data.dob;
    console.log(values);

    fetch("http://localhost:5000/pumpers/editpumper/" + data.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((value) => {
      if (value.ok == true) {
        const reload = async () => {
          toast({
            title: "Pumper update is Succesfull.",
            status: "success",
            isClosable: true,
            duration: 1500,
            position: "top-right",
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          location.reload();
        };
        reload();
      } else {
        toast({
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
      <IconButton
        mt={2}
        mr={2}
        aria-label="Open Menu"
        size="lg"
        icon={<EditIcon />}
        zIndex={50}
        onClick={onOpen}
        variant="ghost"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
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
                  <Input
                    {...register("firstname")}
                    type="text"
                    defaultValue={data.firstname}
                  />
                </FormControl>

                {/* Last name */}
                <FormControl isRequired id="lastname" pt={5}>
                  <FormLabel htmlFor="lastname" fontWeight="semibold">
                    Last Name
                  </FormLabel>
                  <Input
                    {...register("lastname")}
                    type="text"
                    defaultValue={data.lastname}
                  />
                </FormControl>

                {/* Gender */}
                <FormControl as="fieldset" isRequired id="gender">
                  <FormLabel as="legend" fontWeight="semibold">
                    {" "}
                    Gender{" "}
                  </FormLabel>
                  <RadioGroup name="gender" defaultValue={data.gender}>
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
                <FormControl id="dob">
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
                  <Input
                    {...register("address")}
                    type="text"
                    defaultValue={data.address}
                  />
                </FormControl>

                {/* nic */}
                <FormControl isRequired id="nic">
                  <FormLabel htmlFor="nic" fontWeight="semibold">
                    NIC Number
                  </FormLabel>
                  <Input
                    {...register("nic")}
                    type="text"
                    defaultValue={data.nic}
                  />
                </FormControl>

                {/* Contact Number*/}
                <FormControl isRequired id="contactnumber">
                  <FormLabel htmlFor="contactnumber" fontWeight="semibold">
                    Contact Number
                  </FormLabel>
                  <Input
                    {...register("contactnumber")}
                    type="number"
                    defaultValue={data.contactnumber}
                  />
                </FormControl>
              </SimpleGrid>
              <Center marginTop="14">
                <Button type="submit" colorScheme="red" mx={5} mb={5} >
                  Edit Pumper
                </Button>

                <Button colorScheme="blue" mx={5} mb={5} onClick={onClose}>
                  Close
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const PumperSearch: React.FC = ({}) => {
  const [search, setsearch] = useState<string>("");
  const [isSearching, setisSearching] = useState<boolean>(false);
  const [results, setresults] = useState<viewRes[]>([]);

  const HandleSearch = () => {

    if(search.length > 0){
    setisSearching(true);
    fetch("http://localhost:5000/pumpers/name/" + search)
      .then((res) => res.json())
      .then((data) => {
        setresults(data);
        setisSearching(false);
      });
  }
  
  else{
    console.log("empty")
  }
  };
  return (
    <>
      <Flex justifyContent="center">
        <Flex>
          <Input
            placeholder="Enter Pumper name..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <Button
            w={48}
            ml={4}
            isLoading={isSearching}
            loadingText="Searching"
            onClick={HandleSearch}
          >
            Search
          </Button>
        </Flex>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} ml={10} mt={10}>
        {results.map((r) => {
          return (
            <Box
              key={r["id"]}
              w="max-content"
              h="max-content"
              bg="gray.100"
              borderRadius="lg"
              boxShadow="lg"
            >
              <Flex justifyContent="space-between" align="center">
                <Heading my="20px" size="md" fontWeight="semibold" mx="20px">
                  {r.firstname.toUpperCase()} {r.lastname.toUpperCase()}
                </Heading>
                <PumperEdit data={r}></PumperEdit>
                <DeletePumper id={r.id} fname={r.firstname} lname={r.lastname}/>
               
              </Flex>

              <Divider />

              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} pb={4}>
                {/* Gender */}
                <Flex direction="column" ml={6} mt={4}>
                  <Text>Gender</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {" "}
                    {r.gender.toUpperCase()}{" "}
                  </Text>
                </Flex>

                {/* Birthday */}
                <Flex direction="column" ml={6} mt={4}>
                  <Text>Birthday</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {" "}
                    {r.dob.toLocaleString().slice(0, 10)}{" "}
                  </Text>
                </Flex>

                {/* Age */}
                <Flex direction="column" ml={10} mt={4}>
                  <Text>Age</Text>
                  <Text fontWeight="semibold" mb={2}>
                    10 Years
                  </Text>
                </Flex>
              </SimpleGrid>

              {/* Address */}
              <Flex direction="column" mx={6} mt={4}>
                <Text>Address</Text>
                <Text fontWeight="semibold" mb={2}>
                  {" "}
                  {r.address.toUpperCase()}
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 2, md: 3, lg: 3 }} pb={4}>
                {/* Contact Details */}
                <Flex direction="column" ml={6} mt={4}>
                  <Text>Mobile</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {r.contactnumber}
                  </Text>
                </Flex>

                <Flex direction="column" ml={6} mt={4}>
                  <Text>NIC</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {r.nic}
                  </Text>
                </Flex>

                <Flex direction="column" ml={6} mt={4}>
                  <Text>User Name</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {r.username}
                  </Text>
                </Flex>
              </SimpleGrid>
            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export default PumperSearch;
