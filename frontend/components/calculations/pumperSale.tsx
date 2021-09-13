import React, { useState, useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface changePaid {
  pumpername: String;
  saleDate: String;
  payableAmount: String;
  paiedAmount: String;
  balance: String;
  searchkey: String;
}

{/* Add Paied amount to Pumpers' Records Database */}
const Addpay: React.FC<{
  searchkey: string;
  pumpername: string;
  saleDate: string;
  payableAmount: string;
}> = ({ searchkey, pumpername, saleDate, payableAmount }) => {
  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const { register, handleSubmit } = useForm<changePaid>();


  const onSubmit = (values: changePaid) => {
    values.pumpername = pumpername;
    values.saleDate = saleDate;
    values.payableAmount = payableAmount;
    values.searchkey = searchkey;
    values.balance = (
      Number(values.paiedAmount) - Number(values.payableAmount)
    ).toFixed(2);

    {/* Send Data to Pumpers' Records Database */ }
    fetch("http://localhost:5000/pumperrecords/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((value)=>{
      if(value.ok == true){
        const reload = async() =>{
          await new Promise(resolve => setTimeout(resolve, 100));
          location.reload();
        }          
        reload();
      }
    })
  };

  return (
    <>
      <Button size="sm" colorScheme="red" onClick={() => setIsOpen(true)}>
        Paid Amount
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Change Paid Amount
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogBody>
                <FormControl isRequired id="price" pt={5}>
                  <FormLabel htmlFor="price">
                    {" "}
                    Enter All Paied Amount for Sales ( LKR )
                  </FormLabel>
                  <Input {...register("paiedAmount")} type="text" />
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
                  Change Paid Amount
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

{/* Calculated Data Preview according to Pumpers */}
const DataPrevRow: React.FC<{ salesDay: string }> = ({ salesDay }) => {

  {/* Declare Objects and Arrays for calculations */}
  var CalTotal: { [k: string]: any } = {};
  var Precords: { [k: string]: any } = {};
  var PayAmount: { [k: string]: any } = {};

  let pumpers = new Array();

  const [wPumpers, setwPumpers] = useState<
    { id: string; assign_pumpman: string; payablevalue: string }[]
  >([]);

  const [rPumpers, setrPumpers] = useState<
    { id: string; pumpername: string; paiedAmount: string }[]
  >([]);

  /* Fetch all sales in one day */
  useEffect(() => {
    fetch("http://localhost:5000/sales/date/" + salesDay.slice(0, 10))
      .then((res) => res.json())
      .then((data) => {
        setwPumpers(data);
      });
  }, [salesDay]);

  /* Fetch working pumpers in that day */
  wPumpers.map((i) => {
    {
      /* Calculate the Total of each Pumpers */
    }
    const hasKey = i.assign_pumpman in CalTotal;

    if (hasKey) {
      let temp = CalTotal[i.assign_pumpman];
      CalTotal[i.assign_pumpman] = (
        Number(temp) + Number(i.payablevalue)
      ).toFixed(2);
    } else {
      let temp = i.assign_pumpman;
      CalTotal[temp] = Number(i.payablevalue).toFixed(2);
    }

    if (pumpers.indexOf(i.assign_pumpman) == -1) {
      pumpers.push(i.assign_pumpman);
    }
  });

  {/* pass data for creat document for Pumpers' record Database */}
  pumpers.map((p) => {
    Precords.pumpername = p;
    Precords.payableAmount = CalTotal[p];
    Precords.saleDate = salesDay.slice(0, 10);
    Precords.balance = 0;
    Precords.searchkey = p + salesDay.slice(0, 10);
    Precords.paiedAmount = 0;
  });

  useEffect(() => {
    fetch("http://localhost:5000/pumperrecords/date/" + salesDay.slice(0, 10))
      .then((res) => res.json())
      .then((data) => {
        setrPumpers(data);
      });
  }, [salesDay]);

  rPumpers.map((i) => {
    PayAmount[i.pumpername] = Number(i.paiedAmount).toFixed(2);
  });

  return (
    <>
      {/* Populate the rows */}
      {pumpers.map((a) => {
        return (
          <>
            <Tr key={a} fontSize="lg" fontWeight="semibold">
              <Td>{a}</Td>
              <Td isNumeric>{CalTotal[a]}</Td>
              <Td isNumeric> {PayAmount[a]}</Td>
              <Td isNumeric>         
                 <Addpay
                  pumpername={a}
                  saleDate={salesDay.slice(0, 10)}
                  payableAmount={CalTotal[a]}
                  searchkey={a + salesDay.slice(0, 10)}>
                  </Addpay>
              </Td>
            </Tr>
          </>
        );
      })}
    </>
  );
};

{/* Init Data preview Table */}
const PumperSale: React.FC<{ salesDay: string }> = ({ salesDay }) => {
  return (
    <>
      <Table size="md" mb="80px">
        <Thead align="right">
          <Tr>
            <Th fontSize="md" textColor="#00008b" fontWeight="bold">
              Pumper
            </Th>
            <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
              Payable Amount(LKR){" "}
            </Th>
            
            <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
              {" "}
              Paid Amount (LKR){" "}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <DataPrevRow salesDay={salesDay}></DataPrevRow>
        </Tbody>
      </Table>
    </>
  );
};
export default PumperSale;