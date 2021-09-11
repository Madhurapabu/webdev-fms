import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";


const LineChart: React.FC  = ({}) => {

{/* Declare Arrays and objects  */}
  const today = new Date();
  let TSales = new Array();
  let SDate = new Array();

  type Cash = {
    paiedAmount: string
  }
  const [chartData, setChartData] = useState({})
 
  {/* Function for Fetch Data and Populate the chart  */}
  const fetchSales = async () => {
    
    for(let i=9; i>=0; i--){

      let totalIncome = 0;

      const day = new Date(today);
      day.setDate(day.getDate() - i);
      SDate.push(day.getDate())
      const Sday = day.toISOString().slice(0,10)

      const res = await fetch("http://localhost:5000/pumperrecords/date/"+ Sday)
      const cash: Cash[] = await res.json()
      
      cash.map((i) => {
        totalIncome = totalIncome + Number(i.paiedAmount);
        
      })
        TSales.push(totalIncome)   
    }
    setChartData({
      labels : SDate,
      datasets: [
        {
          label: "Daily Cash InFlow",
          data: TSales,
          fill: false,
          backgroundColor: "green",
          borderColor: "green",
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
      <Line data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }} />
    </Flex>
  </>
)
};

export default LineChart;
