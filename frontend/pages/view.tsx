import React from "react";
import Head from "next/head";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import PumperSearch from "../components/search/pumpers";
import PumpeSearch from "../components/search/pumps";
import SaleSearch from "../components/search/sales";

const ViewPage: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>Data View Page</title>
        <meta name="description" content="FMS" />
      </Head>

      <Tabs isFitted variant="enclosed" pt={20}>
        <TabList mb="1em">
          <Tab fontWeight="bold"> Pumper Details Search</Tab>
          <Tab fontWeight="bold">Pump Detail Search</Tab>
          <Tab fontWeight="bold">Sales Detail Search</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
                <PumperSearch></PumperSearch>
          </TabPanel>
                
          <TabPanel>
            <PumpeSearch/>
          </TabPanel>

          <TabPanel>
            <SaleSearch/>
          </TabPanel>

        </TabPanels>
      </Tabs>
    </>
  );
};

export default ViewPage;
