import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const BarChart: React.FC  = ({}) => {

{/* Declare Arrays and objects  */}
  const today = new Date();
  let liters = new Array();
  var Type_Total: { [k: string]: any } = {};

  let types = {
      Diesel :0,
      Petrol : 0,
      SuperDiesel : 0,
      SuperPetrol : 0,
      Kerosine: 0
  }

  type Cash = {
    fueltype: string;
    sales_liters: string;
  }
  
  const [chartData, setChartData] = useState({})


  {/* Function for Fetch Data and Populate the chart  */}
  const fetchSales = async () => {

      const day = new Date(today);
      day.setDate(day.getDate() - 1);
    
      const Sday = day.toISOString().slice(0,10)
      console.log(Sday)
      const res = await fetch("http://localhost:5000/sales/date/"+ Sday)
      const cash: Cash[] = await res.json()
      cash.map((i) => {
          
          const hasKey = i.fueltype in Type_Total;

        {/* Calculate Total saled liters from each fuel type */}
          if (hasKey) {
            let temp = Type_Total[i.fueltype];
            Type_Total[i.fueltype] = (
              Number(temp) + Number(i.sales_liters)
            ).toFixed(2);
          } else {
            Type_Total[i.fueltype] = Number(i.sales_liters).toFixed(2);
          }

        
          if(i.fueltype == "Diesel"){
             types.Diesel = Type_Total[i.fueltype]
           }
           else if (i.fueltype == "Petrol"){
            types.Petrol = Type_Total[i.fueltype]
           }
           else if (i.fueltype == "Super Petrol"){
            types.SuperPetrol = Type_Total[i.fueltype]
           }
           else if (i.fueltype == "Super Diesel"){
            types.SuperDiesel = Type_Total[i.fueltype]
           }
           else {
            types.Kerosine = Type_Total[i.fueltype]
           }  
      })
    
    liters.push(types.Diesel)
    liters.push(types.Petrol)
    liters.push(types.SuperDiesel)
    liters.push(types.SuperPetrol)
    liters.push(types.Kerosine)   

    setChartData({
      labels : ["Diesel", "Petrol", "Super Diesel", "Super Petrol", "Kerosine"],
      datasets: [
        {
          data: liters,
          backgroundColor:[
            'blue',
            'yellow',
            'purple',
            'orange',
            "gray",
          ],
          hoverOffset: 4
        },
      ],
    })
  }
 
  useEffect(() => {
    fetchSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


 return(
  <>
    <Flex w="100%" mt="100px" ml={25} h="max-content" bg="gray.200" p={4} shadow="lg">
      <Doughnut data={chartData}/>
    </Flex>
  </>
)
};

export default BarChart;
