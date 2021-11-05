import React, { useState, useEffect } from "react";
import { Flex, Text, Heading, Skeleton } from "@chakra-ui/react";

const Credit: React.FC = ({}) => {
  {
    /* Declare Arrays and objects  */
  }
  const today = new Date();
  let totalcredited: number;
  let SDate = new Array();
  const [credit, setcredit] = useState<Number>(0);
  const [time, setTime] = useState<Date>();
  const [loading, setloading] = useState<boolean>(false);

  type Cash = {
    credited: string;
  };

  const fetchSales = async () => {
    const rep = today.getDate();
    totalcredited = 0;
    for (let i = rep - 1; i >= 0; i--) {
      
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      SDate.push(day.getDate());
      const Sday = day.toISOString().slice(0, 10);

      const res = await fetch("http://localhost:5000/sales/date/" + Sday);
      const cash: Cash[] = await res.json();
      
      cash.map((i) => {
        totalcredited = totalcredited + Number(i.credited);

      });
    
    }
    setcredit(totalcredited);
    setloading(true);
  };


  const reload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTime(today);
  };

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <>
    <Flex w="100%"  direction={{ base: "column", md: "row" }} >
      <Flex
        bg="grey.100"
        w="50%"
        height="100px"
        mt="100px"
        borderRadius="lg"
        shadow="sm"
        direction="column"
        mx={2}
      >
        <Heading size="lg" align="center" textColor="black.500" mt="10px">
          {today.toLocaleDateString()}
        </Heading>
        <Heading size="lg" align="center" textColor="black.500" mt="10px">
          {time?.toTimeString().slice(0, 8)}
        </Heading>
      </Flex>

      <Flex
        bg="white"
        w="50%"
        height="100px"
        mt={{ base: "35px", md: "100px" }}
        borderRadius="lg"
        shadow="lg"
        direction="column"
        align="center"
      >

        <Skeleton isLoaded={loading} mt="10px">

        <Text
          mx="10px"
          textColor="gray.900"
          fontSize="md"
          fontWeight="semibold"
        >
          Total Credited Sales in Month
        </Text>

          <Heading size="lg" align="center" mt="10px">
            LKR. {credit.toFixed(2)}
          </Heading>
        </Skeleton>
      </Flex>
    </Flex>
    </>
  );
};

export default Credit;
