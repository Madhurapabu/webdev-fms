import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Router from 'next/router';

interface calculationdata {
  pumpname: string;
  fueltype: string;
  ongoingreading: String;
  sales_liters: string;
  sales: String;
  creditedsale: string;
  assign_pumpman: string;
  payablevalue: string;
  dateOfSales: Date;
}

const CalcDate: React.FC<{ ptype: string }> = ({ ptype }) => {
  const [pumpdetail, setPumpdetail] = useState<{ dateOfSales: string }[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/sales/pumpname/" + ptype)
      .then((res) => res.json())
      .then((data) => {
        setPumpdetail(data);
      });
  }, [ptype]);

  let calcDate: Date;
  let calcDateDisplay: any;
  pumpdetail.map((dateCatch) => {
    calcDate = new Date(dateCatch.dateOfSales);
    calcDateDisplay = calcDate.toLocaleDateString();
  });
  return <>{calcDateDisplay}</>;
};

const Fetchpumpers: React.FC = ({}) => {
  const [pumpers, setPumper] = useState<{ id: string; username: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/pumpers")
      .then((res) => res.json())
      .then((data) => {
        setPumper(data);
      });
  }, []);
  return (
    <>
      {pumpers.map((pu) => {
        return <option key={pu["id"]}> {pu.username}</option>;
      })}
    </>
  );
};

const Addvalues: React.FC<{
  id: string;
  type: string;
  pname: string;
  perreading: any;
}> = ({ id, type, pname, perreading }) => {
  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const { register, handleSubmit } = useForm<calculationdata>();
  const toast = useToast();

  const onSubmit = (values: calculationdata) => {
    values.pumpname = pname;
    values.fueltype = type;
    values.sales_liters = (
      Number(values.ongoingreading) - perreading
    ).toString();

    if (type == "Diesel") {
      values.sales = (Number(values.sales_liters) * dprice).toString();
      values.payablevalue = (
        (Number(values.sales_liters) - Number(values.creditedsale)) *
        dprice
      ).toString();
    } else if (type == "Petrol") {
      values.sales = (Number(values.sales_liters) * pprice).toString();
      values.payablevalue = (
        (Number(values.sales_liters) - Number(values.creditedsale)) *
        pprice
      ).toString();
    } else if (type == "Super Diesel") {
      values.sales = (Number(values.sales_liters) * sdprice).toString();
      values.payablevalue = (
        (Number(values.sales_liters) - Number(values.creditedsale)) *
        sdprice
      ).toString();
    } else if (type == "Super Petrol") {
      values.sales = (Number(values.sales_liters) * spprice).toString();
      values.payablevalue = (
        (Number(values.sales_liters) - Number(values.creditedsale)) *
        spprice
      ).toString();
    } else {
      values.sales = (Number(values.sales_liters) * kprice).toString();
      values.payablevalue = (
        (Number(values.sales_liters) - Number(values.creditedsale)) *
        kprice
      ).toString();
    }


    if (Number(values.sales) >= 0 && Number(values.sales_liters) >= 0) {
      {
        /* Update pump ongoing reading  */
      }

      fetch("http://localhost:5000/pump/update/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(values),
      }).then((value) => {
        if (value.ok == true) {
          {
            /* Check is ongoing value is succesfully add?? */
          }
          fetch("http://localhost:5000/sales/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(values),
          }).then((value) => {
           

            /* Data submiting is success */
            if (value.ok == true) {

             const reload = async() =>{
                toast({
                  title: "Calculated is Succesfull.",
                  status: "success",
                  isClosable: true, 
                  duration: 1500,
                  position: "top-right",
                });
                await new Promise(resolve => setTimeout(resolve, 2000));
                location.reload();
              }          
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
        }
        
      });
    } else {
      /* action that User input wrong data */
      toast({
        title: "Error. You entered wrong data. Check values again",
        status: "error",
        isClosable: true,
        duration: 2000,
        position: "top-right",
      });
    }
  };

  {
    /* Get prices of each fuletype */
  }
  var dprice: number;
  var pprice: number;
  var spprice: number;
  var sdprice: number;
  var kprice: number;
  const [prices, setPrice] = useState<
    { id: string; fueltype: string; price: number }[]
  >([]);
  useEffect(() => {
    fetch("http://localhost:5000/prices")
      .then((res) => res.json())
      .then((data) => {
        setPrice(data);
      });
  }, []);
  prices.map((pr) => {
    if (pr.fueltype == "Diesel") {
      dprice = pr.price;
    }
    if (pr.fueltype == "Petrol") {
      pprice = pr.price;
    }
    if (pr.fueltype == "Super Diesel") {
      sdprice = pr.price;
    }
    if (pr.fueltype == "Super Petrol") {
      spprice = pr.price;
    } else kprice = pr.price;
  });

  return (
    <>
      <Button colorScheme="facebook" onClick={() => setIsOpen(true)}>
        Add Values
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add last shift data
            </AlertDialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogBody>
                <FormControl isRequired id="dateOfSales" pt={5}>
                  <FormLabel htmlFor="dateOfSales">
                    Enter the date should calculate sales
                  </FormLabel>
                  <Input {...register("dateOfSales")} type="Date" />
                </FormControl>

                <FormControl isRequired id="ongoingreading" pt={5}>
                  <FormLabel htmlFor="ongoingreading">
                    Enter Pump Last Reading
                  </FormLabel>
                  <Input
                    {...register("ongoingreading", { pattern: /^[0-9.]+$/i })}
                  />
                </FormControl>

                <FormControl isRequired id="creditedsale" pt={5}>
                  <FormLabel htmlFor="creditedsale">
                    Enter Credited Sales (Liters)
                  </FormLabel>
                  <Input
                    {...register("creditedsale", { pattern: /^[0-9.]+$/i })}
                  />
                </FormControl>

                <FormControl id="assign_pumpman" isRequired pt={5}>
                  <FormLabel htmlFor="assign_pumpMan">
                    Enter Name of Asigned PumpMan
                  </FormLabel>
                  <Select {...register("assign_pumpman")}>
                    <Fetchpumpers></Fetchpumpers>
                  </Select>
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
                  Submit the data
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const Calcard: React.FC = ({}) => {
  const [pumps, setpumps] = useState<
    {
      id: string;
      fueltype: string;
      pumpname: string;
      ongoingreading: Number;
      initialreading: Number;
    }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:5000/pump")
      .then((res) => res.json())
      .then((data) => {
        setpumps(data);
      });
  }, []);

  var prevReading: Number;
  pumps.sort((a, b) => (a["pumpname"] > b["pumpname"] ? 1 : -1));

  return (
    <>
      {pumps.map((p) => {
        if (p.ongoingreading > 0) {
          prevReading = p.ongoingreading;
        } else prevReading = p.initialreading;
        return (
          <Box
            key={p["id"]}
            bg="#f5f7fb"
            width="100%"
            height="max-content"
            borderRadius="10px"
            borderColor="#002366"
            borderWidth="2px"
            boxShadow="lg"
          >
            <Text fontSize="4xl" align="center">
              {p.pumpname}
            </Text>
            <Text fontSize="2xl" align="center">
              {p.fueltype} Pump
            </Text>
            <Divider pt={5} width="100%"></Divider>

            <Text fontSize="xl" align="center" fontWeight="bold" mt={5}>
              Starting Reading
            </Text>
            <Text
              fontSize="lg"
              align="center"
              fontWeight="semibold"
              shadow="lg"
              borderColor="white"
              borderWidth="3px"
              borderRadius="10px"
              mx="20px"
              mt={1}
              py={2}
              height="50px"
            >
              {prevReading}
            </Text>

            <Text fontSize="xl" align="center" fontWeight="bold" mt={5}>
              Calculated for
            </Text>
            <Text
              fontSize="lg"
              align="center"
              fontWeight="bold"
              shadow="lg"
              borderColor="white"
              borderWidth="3px"
              borderRadius="10px"
              mx="20px"
              mt={1}
              py={2}
              height="50px"
            >
              <CalcDate ptype={p.pumpname}></CalcDate>
            </Text>
            <Box align="center" my={5}>
              <Addvalues
                id={p.id}
                type={p.fueltype}
                pname={p.pumpname}
                perreading={prevReading}
              ></Addvalues>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Calcard;
