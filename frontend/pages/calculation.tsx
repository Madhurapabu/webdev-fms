import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import Calcard from "../components/calculations/calculation_com";
import PreviewData from "../components/calculations/previewCalData";

const PumpCalc: React.FC = ({}) => {
  return <></>;
};

const Calculation: React.FC = ({}) => {
  /*const [items, setitem] = useState<
    { id: string; fueltype: string; pumpname: string; initialreading: Number }[]
  >([]);
  useEffect(() => {
    fetch("http://localhost:5000/pump")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setitem(data);
      });
  }, []); */

  return (
    <>
      <Tabs isFitted variant="enclosed" pt={20}>
        <TabList mb="1em">
          <Tab fontWeight="bold"> Add Calculation Data</Tab>
          <Tab fontWeight="bold">Preview Calculated Data</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid
              pt={5}
              columns={{ sm: 2, md: 3, lg: 4 }}
              spacingX="40px"
              spacingY="20px"
              mx={5}
            >
              <Calcard></Calcard>
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            
            <PreviewData></PreviewData>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Calculation;
