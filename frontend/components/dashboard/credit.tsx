import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";

const Credit : React.FC =({}) =>{

    {
        /* Declare Arrays and objects  */
      }
      const today = new Date();
      let totalcredited: number;
      let SDate = new Array();
      const [credit, setcredit] = useState<Number>(0);
      const [time, setTime] = useState<Date>();
      
    

      type Cash = {
        credited: string;
      };
      
    
      {
        /* Function for Fetch Data and Calculate Credited value  */
      }
      const fetchSales = async () => {
        
        const rep = today.getDate()

        for (let i = rep-1; i >= 0; i--) {
           totalcredited = 0;
            
          const day = new Date(today);
          day.setDate(day.getDate() - i);
          SDate.push(day.getDate());
          const Sday = day.toISOString().slice(0, 10);
            
          const res = await fetch(
            "http://localhost:5000/sales/date/" + Sday
          );
          const cash: Cash[] = await res.json();
    
          cash.map((i) => {
            totalcredited = totalcredited + Number(i.credited);
          });
          setcredit(100/(i+1)) 
        }
        setcredit(totalcredited)
      }
      
      const reload = async() =>{
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTime(today)
      }          

      useEffect(() => {
        fetchSales();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      
      useEffect(() => {
        reload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [time]);
      

    return(
    <>
           
        <Flex bg="grey.100" w="50%" height="100px" mt="100px" borderRadius="lg" shadow="sm" direction="column" mx={2}>

           
            <Heading size="lg" align="center" textColor="green.500" mt="10px">{today.toLocaleDateString()}</Heading>
            <Heading size="lg" align="center" textColor="green.500" mt="10px">{time?.toTimeString().slice(0,8)}</Heading>

        </Flex>

        <Flex bg="white" w="50%" height="100px" mt="100px" borderRadius="lg" shadow="lg" direction="column">

            <Text mx="10px" textColor="gray.900" fontSize="md" fontWeight="semibold"> Total Credited Sales in Month </Text>
            <Heading size="lg" align="center" mt="10px">LKR. {credit.toFixed(2)}</Heading>
            
        </Flex>
     </>
    )
}

export default Credit