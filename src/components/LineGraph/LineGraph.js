import React, { useState, useEffect } from "react";

import { Card, CardContent, Box, Button } from "@material-ui/core";

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
      // console.log(newDataPoint);
      chartData.push(newDataPoint);
    }

    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph() {
  const [savedData, setSavedData] = useState({});
  const [sortedData, setSortedData] = useState({});
  let [backgroundColor, setBackgroundColor] = useState("tomato");
  let [title, setTitle] = useState("new cases");

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((response) => {
          return response.json();
        })
        .then((dataJson) => {
          setSavedData(dataJson);

          let chartData = buildChartData(dataJson);
          setSortedData(chartData);
        });
    };

    fetchData();
  }, []);

  function changeColorOnType(type) {
    var color;
    switch (type) {
      case "cases":
        color = "tomato";
        break;
      case "recovered":
        color = "olive";
        break;
      case "deaths":
        color = "black";
        break;
      default:
        color = "tomato";
    }
    return color;
  }

  function changeTitle(type) {
    var title;
    switch (type) {
      case "cases":
        title = "new cases";
        break;
      case "recovered":
        title = "recovered";
        break;
      case "deaths":
        title = "deaths";
        break;
      default:
        title = "new cases";
    }
    return title;
  }

  function changeDataOnClick(type) {
    let chartData = buildChartData(savedData, type);
    setSortedData(chartData);
    setBackgroundColor(changeColorOnType(type));
    setTitle(changeTitle(type));
  }

  return (
    <Box mb={3}>
      {" "}
      <Card>
        <CardContent>
          <Box mb={2}>
            <h3>Worldwide {title} by day:</h3>
          </Box>
          {sortedData?.length > 0 && (
            <Box mb={2}>
              <Line
                data={{
                  datasets: [
                    {
                      backgroundColor: backgroundColor,
                      borderColor: "transparent",
                      data: sortedData,
                    },
                  ],
                }}
                options={options}
              />
            </Box>
          )}

          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                changeDataOnClick("cases");
              }}
            >
              Cases
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                changeDataOnClick("recovered");
              }}
            >
              Recovered
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                changeDataOnClick("deaths");
              }}
            >
              Deaths
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LineGraph;
