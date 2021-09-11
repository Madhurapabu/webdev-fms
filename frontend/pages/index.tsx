import { Button, Flex, IconButton, Link } from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import Image from "next/image";
import BarChart from "../components/charts/Sales_type";
import LineChart from "../components/charts/cashflow";


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Home Page of fms</title>
        <meta name="description" content="FMS" />
      </Head>
    <Flex dir="row">
    <Flex w="full" h="100vh">
     
      <BarChart/>
    
    </Flex>

    <Flex w="full" h="100vh">
     
     <LineChart/>
   
    </Flex>

    </Flex>
    </>
  );
}
