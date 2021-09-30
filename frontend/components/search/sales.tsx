import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface Sales {
  pumpname: string;
  sales_liters: string;
  sales: string;
  payablevalue: string;
  id: string;
  fueltype: string;
  assign_pumpman: string; 
}

const SaleSearch: React.FC = ({}) => {
  const [search, setsearch] = useState<string>("");
  const [isSearching, setisSearching] = useState<boolean>(false);
  const [results, setresults] = useState<Sales[]>([]);

  const HandleSearch = () => {
    
    if(search.length > 0 ){
      setisSearching(true);
      fetch("http://localhost:5000/sales/date/" + search)
      .then((res) => res.json())
      .then((data) => {
        setresults(data);
        setisSearching(false);
      }).catch();
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Flex>
          <Input
            type="date"
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

      <Table size="md" mt={10}>
        <Thead align="right">
          <Tr>
            <Th fontSize="md" textColor="#00008b" fontWeight="bold">
              Pumpman
            </Th>
            <Th fontSize="md" textColor="#00008b" fontWeight="bold">
              Fuel Type
            </Th>
            <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
              Sales(Liters)
            </Th>
            <Th fontSize="md" textColor="#00008b" fontWeight="bold" isNumeric>
              Income Amount (LKR)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
        {results.map((i) => {
          
            return(
              <>
              <Tr key={i["id"]}>
                <Td fontWeight="semibold" > {i.assign_pumpman} </Td>
                <Td fontWeight="semibold" > {i.fueltype} </Td>
                <Td fontWeight="semibold" isNumeric> {Number(i.sales_liters).toFixed(2)} </Td>
                <Td  fontWeight="semibold" isNumeric> {Number(i.payablevalue).toFixed(2)} </Td>
              </Tr>
              </> 
            )

         })}
        </Tbody>
      </Table>
    </>
  );
};

export default SaleSearch;