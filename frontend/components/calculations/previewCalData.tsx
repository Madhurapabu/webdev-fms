import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PumperSale from "./pumperSale";

{
  /* Calculate Total Value */
}
const CalTotal: React.FC<{ sDay: string }> = ({ sDay }) => {
  const [DaySale, setDaySale] = useState<
    {
      pumpname: string;
      sales_liters: string;
      sales: string;
      payablevalue:string;
    }[]
  >([]);
  let totalIncome = 0;
  useEffect(() => {
    fetch("http://localhost:5000/sales/date/" + sDay.slice(0, 10))
      .then((res) => res.json())
      .then((data) => {
        setDaySale(data);
      });
  }, [sDay]);
  DaySale.map((i) => {
    totalIncome = totalIncome + Number(i.payablevalue);
  });
  return <>{totalIncome.toFixed(2)}</>;
};

//Fetch sales Data to populate the Table
const FetchSales: React.FC<{
  pumpname: string;
  columnName: string;
  salesday: string;
}> = ({ pumpname, columnName, salesday }) => {
  const [DaySale, setDaySale] = useState<
    {
      pumpname: string;
      sales_liters: string;
      sales: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:5000/sales/date/" + salesday.slice(0, 10))
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setDaySale(data);
      });
  }, [salesday]);

  return (
    <>
      {DaySale.map((s) => {
        if (s.pumpname == pumpname && columnName == "Sales") {
          return <>{Number(s.sales_liters).toFixed(2)}</>;
        } else if (s.pumpname == pumpname && columnName == "Income") {
          return <>{Number(s.sales).toFixed(2)}</>;
        }
      })}
    </>
  );
};

// Polpulate the table rows
const DataPrevRow: React.FC<{ salesDay: string }> = ({ salesDay }) => {
  const [items, setitem] = useState<
    { id: string; fueltype: string; pumpname: string }[]
  >([]);
  useEffect(() => {
    fetch("http://localhost:5000/pump")
      .then((res) => res.json())
      .then((data) => {
        setitem(data);
      });
  }, []);
  items.sort((a, b) => (a["pumpname"] > b["pumpname"] ? 1 : -1));
  
  return (
    <>
      {items.map((i) => {
        return (
          <Tr key={i["id"]} fontSize="lg" fontWeight="semibold">
            <Td>{i.pumpname}</Td>
            <Td pl={10} isNumeric>
              <FetchSales
                salesday={salesDay}
                pumpname={i.pumpname}
                columnName="Sales"
              ></FetchSales>
            </Td>
            <Td isNumeric>
              <FetchSales
                pumpname={i.pumpname}
                columnName="Income"
                salesday={salesDay}
              ></FetchSales>
            </Td>
          </Tr>
        );
      })}
      <Tr fontSize="xl" fontWeight="bold" textColor="red">
        <Td>Total</Td>
        <Td></Td>
        <Td isNumeric>
          <CalTotal sDay={salesDay}></CalTotal>
        </Td>
      </Tr>
    </>
  );
};

//Sales Preview Accordion Styled and Table Heading Init here
const AccordionStyle: React.FC = ({}) => {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dayByesterday = new Date(today);
  dayByesterday.setDate(dayByesterday.getDate() - 2);

  return (
    <>
      {/* Sales Preview of Today */}
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                fontSize="lg"
              >
                {today.toLocaleDateString()}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/*Preview According to Pumpers */}
            <PumperSale salesDay={today.toISOString()}></PumperSale>

            {/* Preview According to Pumps */}
            <Table size="md">
              <Thead align="right">
                <Tr>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold">
                    Pump
                  </Th>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
                    Sales(Liters){" "}
                  </Th>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
                    {" "}
                    Income Amount (LKR){" "}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <DataPrevRow salesDay={today.toISOString()}></DataPrevRow>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>

        {/* Sales Preview of YesterDay */}
        <AccordionItem mt={5}>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                fontSize="lg"
              >
                {yesterday.toLocaleDateString()}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/*Preview According to Pumpers  */ }
            <PumperSale salesDay={yesterday.toISOString()}></PumperSale>

          

            {/* Preview According to Pumps */}

            <Table size="md">
              <Thead align="right">
                <Tr>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold">
                    Pump
                  </Th>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
                    Sales(Liters){" "}
                  </Th>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
                    {" "}
                    Income Amount (LKR){" "}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <DataPrevRow salesDay={yesterday.toISOString()}></DataPrevRow>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>

        {/* Sales Preview of Day Before Yesterday */}
        <AccordionItem mt={5}>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                fontSize="lg"
              >
                {dayByesterday.toLocaleDateString()}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
           {/* Preview According to Pumpers  */}
            <PumperSale salesDay={dayByesterday.toISOString()}></PumperSale>

      

            {/* Preview According to Pumps */}
            <Table size="md">
              <Thead align="right">
                <Tr>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold">
                    Pump
                  </Th>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
                    Sales(Liters){" "}
                  </Th>
                  <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
                    {" "}
                    Income Amount (LKR){" "}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <DataPrevRow
                  salesDay={dayByesterday.toISOString()}
                ></DataPrevRow>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

const PreviewData: React.FC = ({}) => {
  return (
    <>
      <AccordionStyle></AccordionStyle>
    </>
  );
};

export default PreviewData;
