import React, { Component, useEffect, useState} from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const baseURL = "http://localhost:3002/getChartData";


const DeviceChart = ({device, columns}) => {

  const [chartData, setchartData] = useState([]);

  const fetchDataSingle = async () => {
    axios.get(baseURL, {
      params: {
          age: 1440,
          DeviceID: device["DeviceID"],
          TableName: device["DataTableName"],
          column1:"Power",
          column2: "Voltage"
      }
  }).then((response) => {
      setchartData(response.data);
  });
  }

  const fetchDataDual = async () => {
    axios.get(baseURL, {
      params: {
          age: 1440,
          DeviceID: device["DeviceID"],
          TableName: device["DataTableName"],
          column1:"Power1",
          column2: "Power2"
      }
  }).then((response) => {
      setchartData(response.data);
  });
  }

// Call the fetchFici function every 2 seconds
useEffect(() => {
  const timer = setInterval(() => {
    if (device.DeviceType === "POW316") {
		fetchDataSingle();
	}
    else if (device.DeviceType === "DUALR3") {
		fetchDataDual();
	}
    
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
                  colors: ['#ffd966'],
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
                  colors: ['#ffd966'],
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