import React, { Component, useEffect, useState} from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const baseURL = "http://localhost:3002/getChartData";


const DeviceChart = ({device, columns}) => {

  const [chartData, setchartData] = useState([]);

  const fetchDataDHT = async () => {
    axios.get(baseURL, {
      params: {
          age: 1440,
          DeviceID: device["DeviceID"],
          TableName: device["DataTableName"],
          column1:"Temperature",
          column2: "Humidity"
      }
  }).then((response) => {
      setchartData(response.data);
  });
  }

// Call the fetchFici function every 2 seconds
useEffect(() => {
  const timer = setInterval(() => {
    fetchDataDHT();
    console.log(chartData);
  }, 30000);
  return () => { clearInterval(timer) }
}, [])

  return (
      <div>
          <Chart
              type="area"
              height={300}
              width='48%'
              series={[
                  {
                      name: "Temperature",
                      data: chartData?.map(chartData => chartData.y1)
                  }
              ]}

              options={{
                  chart: {
                      toolbar: {
                          show: false
                      },

                  },
                  colors: ['#f90000'],
                  stroke: { width: 1, curve: 'smooth' },
                  dataLabels: { enabled: false },
                  xaxis: {
                    categories: chartData?.map(chartData => chartData.x),
                    reversed: true
                  },
                  yaxis: {
                      show: true,
                  }
              }}
          />
          <Chart
              type="area"
              height={300}
              width='48%'
              series={[
                  {
                      name: "Humidity",
                      data: chartData?.map(chartData => chartData.y2)
                  }
              ]}

              options={{
                  chart: {
                      toolbar: {
                          show: false
                      },

                  },
                  colors: ['#2986cc'],
                  stroke: { width: 1, curve: 'smooth' },
                  dataLabels: { enabled: false },
                  xaxis: {
                    categories: chartData?.map(chartData => chartData.x),
                    reversed: true
                  },
                  yaxis: {
                      show: true,
                  }
              }}
          />
      </div>
  )
}

export default DeviceChart