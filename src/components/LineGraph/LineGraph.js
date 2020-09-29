import React, { useState, useEffect } from "react";
import "./LineGraph.scss";
import { Card, CardContent } from "@material-ui/core";

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
    line: {
      borderJoinStyle: "round",
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
          unit: "month",
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
      chartData.push(newDataPoint);
    }

    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph({ countryName, countryCode, casesType }) {
  const [data, setData] = useState({});
  const [url, setUrl] = useState(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );

  useEffect(() => {
    console.log('useeffect casestype')
   
      if (countryCode === "worldwide") {
        setUrl("https://disease.sh/v3/covid-19/historical/all?lastdays=all");
      } else {
        setUrl(
          `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=all`
        );
      }

    fetchData();
  }, [casesType,countryCode]);

  const fetchData = async () => {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        let chartData;
        
        if(data.timeline === undefined) {
          chartData= buildChartData(data, casesType);
        }
        else{
          chartData= buildChartData(data.timeline, casesType);
        }
        setData(chartData);
      });
  };

  return (
    <Card className="LineGraph">
      <CardContent>
        <h3>
          <span>{countryName}</span> {casesType} by day
        </h3>
        {data?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  lineTension: 0,
                  borderColor: "#CC1034",
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default LineGraph;
