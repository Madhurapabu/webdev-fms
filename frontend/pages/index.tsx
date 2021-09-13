import {Flex, Container } from "@chakra-ui/react";
import Head from "next/head";
import BarChart from "../components/charts/Sales_type";
import LineChart from "../components/charts/cashflow";
import Credit from "../components/dashboard/credit";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page of fms</title>
        <meta name="description" content="FMS" />
      </Head>
      <Container overflowY="auto" maxW="8XL" bg="gray.100">

        <Flex direction={{ base: "column", md: "row" }} w="100%" align="center">
            
            <Flex w={{base:"100%", md:"50%"}} >
            <Credit></Credit>
            </Flex>

            <Flex w={{base:"100%", md:"50%"}} align="center" >
              
            </Flex>
        </Flex>

        <Flex direction={{ base: "column", md: "row" }} w="100%" align="center" mb={5}>
          
          <Flex w={{base:"100%", md:"50%"}} mr={5} >
            <BarChart />
          </Flex>

          <Flex w={{base:"100%", md:"50%"}} align="center" >
            <LineChart />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
