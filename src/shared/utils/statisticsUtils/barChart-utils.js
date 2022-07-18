export const barOptions = {
  indexAxis: "y",
  plugins: { legend: { display: false } },
  scales: {
    x: {
      setSize: 10,
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        callback: function (label, index, labels) {
          if (Math.floor(label) === label) {
            return label;
          }
        },
      },
    },
    y: {
      afterSetDimensions: function (axes) {
        axes.maxWidth = 165;
      },
      stacked: false,
      ticks: {
        callback: function (value) {
          const valueLegend = this.getLabelForValue(value);
          if (valueLegend.length > 10) {
            return valueLegend.substr(0, 7) + "...";
          }
          return valueLegend.substr(0, 11);
        },
      },
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
};

export const barChartDataset = (data) => {
  return [
    {
      data: data,
      barPercentage: 1,
      categoryPercentage: 0.8,
      backgroundColor: ["rgba(20, 33, 61, 1)", "rgba(253,161,13,1)"],
      borderColor: "rgba(20, 33, 61, 0.2)",
    },
  ];
};
