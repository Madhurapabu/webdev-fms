import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
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


interface Pump {
    fueltype: string;
    pumpname: string;
    initialreading: string;
    ongoingreading : Number;
    id : string;
  }

const DeletePumper: React.FC<{id: string, pname: string,}> = ({id, pname,}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const deletePumper = () =>{
    fetch("http://localhost:5000/pumpers/" + id,{ 
     method: "DELETE" 
  }).then((value) => {

    if( value.ok == true){
      const reload = async() =>{
        toast({
          title: "Pump is removed.",
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
    <ModalHeader color="red.500">Delete {pname} </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text> Are you sure you want to remove {pname} Pump?  </Text>
      <Text>  Pump will be deleted permanently from system. </Text> 
   
    </ModalBody>

    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={onClose}>
        Close
      </Button>
      <Button colorScheme="red" onClick={deletePumper}>Remove {pname}</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  </>
)
}


const PumperEdit: React.FC<{
  data: {
    fueltype: string;
    pumpname: string;
    initialreading: string;
    ongoingreading : Number;
    id : string;
  };
}> = ({ data }) => {
  const { register, handleSubmit } = useForm<Pump>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onSubmit = (values: viewRes) => {
    
    console.log(values);

    fetch("http://localhost:5000/pump/edit/" + data.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((value) => {
      if (value.ok == true) {
        const reload = async () => {
          toast({
            title: "Pump update is Succesfull.",
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
          title: "Error. Pumpname already used",
          status: "error",
          isClosable: true,
          duration: 1500,
          position: "top-right",
        });
      }
    });
    console.log("http://localhost:5000/pump/edit/" + data.id)
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
                <FormControl isRequired id="pumpname" pt={5}>
                  <FormLabel htmlFor="pumpname" fontWeight="semibold">
                    Pump Name
                  </FormLabel>
                  <Input
                    {...register("pumpname")}
                    type="text"
                    defaultValue={data.pumpname}
                  />
                </FormControl>

              </SimpleGrid>
              <Center marginTop="14">
                <Button type="submit" colorScheme="red" mx={5} mb={5} >
                  Edit Pump
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

const PumpSearch: React.FC = ({}) => {
  const [search, setsearch] = useState<string>("");
  const [isSearching, setisSearching] = useState<boolean>(false);
  const [results, setresults] = useState<Pump[]>([]);
  let liters = 0;

  const HandleSearch = () => {
    
    if(search.length > 0 ){
    setisSearching(true);
    fetch("http://localhost:5000/pump/type/" + search)
      .then((res) => res.json())
      .then((data) => {
        setresults(data);
        setisSearching(false);
      });
  }
  else{
    console.log("empty")
  };
  }


  
  return (
    <>
      <Flex justifyContent="center">
        <Flex>
          <Input
            placeholder="Enter Pump Fuel type ..."
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
            liters = Number(r.ongoingreading) - Number(r.initialreading)
          return (
            <Box
              key={r["id"]}
              w="max-content"
              h="max-content"
              bg="gray.100"
              borderRadius="lg"
              boxShadow="lg"
            >
              <Flex justifyContent="space-between" align="center" >
                  
                <Flex align="center">
                <Heading my="20px" size="md" fontWeight="semibold" mx="20px">
                  {r.pumpname.toString()} 
                </Heading>
                <PumperEdit data={r}></PumperEdit>
                </Flex>

                <Flex align="center">
                <DeletePumper id={r.id} pname={r.pumpname} />  
                </Flex>
              </Flex>

              <Divider />

              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} pb={4}>
                {/* Fule Type */}
                <Flex direction="column" ml={6} mt={4}>
                  <Text>Fuel Type</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {" "}
                    {r.fueltype}
                  </Text>
                </Flex>
              </SimpleGrid>

              {/* Ongoing Reading */}
              <Flex direction="column" mx={6} mt={4}>
                <Text>Present Reading</Text>
                <Text fontWeight="semibold" mb={2}>
                  {" "}
                  {r.ongoingreading}
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 2, md: 3, lg: 3 }} pb={4}>
                {/* Initial Reading */}
                <Flex direction="column" ml={6} mt={4}>
                  <Text>Total Liters</Text>
                  <Text fontWeight="semibold" mb={2}>
                    {liters} Liters
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

export default PumpSearch;