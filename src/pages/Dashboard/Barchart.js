import React from "react"
import ReactApexChart from "react-apexcharts"
// import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const Barchart = ({ data }) => {
  // const apaexlineColumnColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "High - 2013",
      data: data,
    },
  ]
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    // colors: apaexlineColumnColors,
    xaxis: {
      categories: [
        "Adenocarcinoma",
        "Large Cell Carcinoma",
        "Normal",
        "Squamous Cell Carcinoma",
      ],
    },
    yaxis: {
      // title: {
      //   text: "$ (thousands)",
      // },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " %"
        },
      },
    },
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  )
}

export default Barchart
