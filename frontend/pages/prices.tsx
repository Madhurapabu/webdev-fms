import React from "react";

import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Pricedisplay from "../components/price_change";

const Prices: React.FC = ({}) => {
  return (
    <>
      <Flex height="100vh" my={20}>
        <Flex width="30%" display={["none", "none", "none", "flex"]}>
          <Box
            boxSize="sm"
            bg="#f5f7fb"
            width="100%"
            height="100vh"
            m={-5}
          ></Box>
        </Flex>

        <Flex width="70%">
          <Box boxSize="sm" width="100%" height="100vh" px={10}>
            <Text fontSize="2xl" textColor="#002366" pb={4}>
              Fuel Prices
            </Text>
            <Divider bg="#002366" height="2px"></Divider>
            {/* Add Price Display */}
            <Pricedisplay></Pricedisplay>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Prices;
