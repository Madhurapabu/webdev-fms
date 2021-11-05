import { Button, Flex, Heading, HStack, Icon, IconButton, Link } from "@chakra-ui/react";
import { HamburgerIcon, EmailIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import NextLink from "next/link";

const Topbar: React.FC = ({}) => {
  const [display, changeDisplay] = useState("none");

  return (
    <>
      <Flex>
        <Flex
          position="fixed"
          align="center"
          boxShadow="sm"
        
          w="100%"
          zIndex={40}
          justifyContent="space-between"
          alignContent="flex-start"
          bg="white"
        >
          {/* Desktop */}

          <Heading ml={5} textColor="blackAlpha.700" size="md">
            ABC Filling Station
          </Heading>

          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={4}
            icon={<HamburgerIcon />}
            onClick={
              () => changeDisplay("flex")              
            }
            display={["flex", "flex", "none", "none"]}
          />

          <Flex display={["none", "none", "flex", "flex"]}>
            <NextLink href="/" >
              <Button as="a" variant="ghost" aria-label="Home" my={2} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/calculation" >
              <Button
                as="a"
                variant="ghost"
                aria-label="About"
                my={2}
                mx={4}
                w="100%"
              >
                Calculations
              </Button>
            </NextLink>

            <NextLink href="/register/pumper">
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={2}
                mx={5}
                w="100%"
              >
                Add Pumpers
              </Button>
            </NextLink>

            <NextLink href="/register/pump">
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={2}
                mx={2}
                w="100%"
              >
                Add Pump
              </Button>
            </NextLink>

            <NextLink href="/prices">
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={2}
                w="100%"
              >
                Prices
              </Button>
            </NextLink>
            
            <NextLink href="/view">
              <Button
                as="a"
                variant="ghost"
                aria-label="View"
                my={2}
                w="100%"
              >
                View
              </Button>
            </NextLink>
          </Flex>
        </Flex>

        {/* Mobile Content */}
        <Flex
          w="100vw"
          display={display}
          bgColor="gray.50"
          zIndex={50}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="left" justifyItems="left">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
              zIndex={50}
              
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/">
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/calculation" >
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                Calculations
              </Button>
            </NextLink>

            <NextLink href="/register/pumper">
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Add Pumpers
              </Button>
            </NextLink>

            <NextLink href="/register/pump">
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Add Pump
              </Button>
            </NextLink>

            <NextLink href="/prices">
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Prices
              </Button>
            </NextLink>

            <NextLink href="/view">
              <Button
                as="a"
                variant="ghost"
                aria-label="View"
                my={5}
                w="100%"
              >
                View
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Topbar;
