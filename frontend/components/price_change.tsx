import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface changePrice {
  price: Number;
}

const ChangePrice: React.FC<{ id: string; type: string; }> = ({
  id,
  type,
}) => {
  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const { register, handleSubmit } = useForm<changePrice>();
  const toast = useToast();
  

  const onSubmit = (values: changePrice) => {
    console.log(values);
    fetch("http://localhost:5000/prices/update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((value) => {
      if (value.ok == true) {
        toast({
          title: "Price Change is Succesfull. Please Refresh the page",
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "top-right",
        });
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
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Change Value
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Change the {type} unit price
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogBody>
                <FormControl isRequired id="price" pt={5}>
                  <FormLabel htmlFor="price">
                    {" "}
                    Enter new {type} price ( LKR )
                  </FormLabel>
                  <Input {...register("price")} type="text" />
                </FormControl>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} type="reset">
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={onClose}
                  ml={3}
                  type="submit"
                >
                  Change the unit price
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const TableRow: React.FC = () => {
  const [items, setitem] = useState<
    { id: string; fueltype: string; price: Number }[]
  >([]);
  useEffect(() => {
    fetch("http://localhost:5000/prices")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setitem(data);
      });
  }, []);

  return (
    <>
      {items.map((i) => {
        return (
          <Tr key={i["id"]}>
            <Td>{i.fueltype}</Td>
            <Td pl={10}>{i.price}.00</Td>
            <Td isNumeric>
              {/* Price Change form */}
              <ChangePrice
                id={i.id}
                type={i.fueltype}
              ></ChangePrice>
            </Td>
          </Tr>
        );
      })}
    </>
  );
};

const Data: React.FC = ({}) => {
  return (
    <div>
      <Table size="md">
        <Thead align="right">
          <Tr>
            <Th fontSize="md">Fuel Type</Th>
            <Th fontSize="md">Price ( LKR) </Th>
            <Th fontSize="md"> </Th>
          </Tr>
        </Thead>
        <Tbody>
          <TableRow />
        </Tbody>
      </Table>
    </div>
  );
};

export default Data;
