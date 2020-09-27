import React, { useState, useEffect } from "react";

import { Card, CardContent, Box } from "@material-ui/core";

import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  aspectRatio: 1,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        stacked: true,
        //ticks: {
        // Include a dollar sign in the ticks
        //  callback: function (value, index, values) {
        //    return numeral(value).format("0a");
        //  },
        //},
      },
    ],
  },
};

const buildChartData = (data, casesType = "cases") => {
  let chartData = [];
  let lastDataPoint;



  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      // 
      chartData.push(newDataPoint);
    }

    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <Box mb={2}>
    
      <Card>
        <CardContent>
          <Box mb={2}>
            <h3>Worldwide {casesType} by day:</h3>
          </Box>
          {data?.length > 0 && (
            <Box mb={2}>
              <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      
      </Box>
          )}

        </CardContent>
      </Card>
    </Box>
  );
}

export default LineGraph;
