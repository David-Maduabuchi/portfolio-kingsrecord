import "./barChart.scss";
import Chart from "react-apexcharts";
import { useState, useMemo, useEffect } from "react";
import LoadingBar from "../LoadingBar/LoadingBar";

interface Props {
  graphInfo: string;
  selectedOption: string;
}

const BarChartBox = (props: Props) => {
  const [chartData] = useState<number[]>([800, 1300, 2000, 1600, 800, 900]);
  const [graphLoader, setGraphLoader] = useState(false);
  const [xAxisLabels] = useState<string[]>([
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
  ]);

  useEffect(() => {
    setGraphLoader(true);
    setTimeout(() => {
      setGraphLoader(false);
    }, 2000);
  }, [props.graphInfo]);

  const series = useMemo(
    () => [
      {
        name: props.graphInfo,
        data: chartData, // Chart data is an array of numbers
      },
    ],
    [props.graphInfo, chartData]
  );

  const options = useMemo(
    () => ({
      chart: {
        id: "basic-bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: xAxisLabels, // Ensure categories are an array
        labels: {
          style: {
            fontFamily: "Inter, Poppins, sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            colors: "#A2A4B2",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            colors: "#A3A6B4",
          },
        },
      },
      plotOptions: {
        bar: {
          distributed: false,
          dataLabels: {
            position: "",
          },
        },
      },
      fill: {
        colors: ["#7486E8"],
      },
      responsive: [
        {
          breakpoint: 15000,
          options: {
            xaxis: {
              labels: { style: { fontSize: "10px" } },
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: "11px",
                  colors: "#A3A6B4",
                  fontFamily: "Inter",
                  fontWeight: "600",
                },
              },
            },
          },
        },
        {
          breakpoint: 500,
          options: {
            xaxis: {
              labels: { style: { fontSize: "6.8px" } },
            },
            yaxis: {
              labels: { style: { fontSize: "8px" } },
            },
          },
        },
      ],
      noData: {
        text: "No data available",
        style: {
          color: "#000000",
          fontSize: "14px",
          fontFamily: "Poppins, sans-serif",
        },
      },
    }),
    [xAxisLabels] // Recalculate when xAxisLabels changes
  );

  return (
    <div className="barChartBox">
      {graphLoader ? (
        <LoadingBar height="100%" />
      ) : chartData.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height="100%"
        />
      ) : (
        <div className="no-data">
          <img src="/svg/InvalidGraph.svg" alt="" />
          <span>No results!</span>
        </div>
      )}
    </div>
  );
};

export default BarChartBox;
