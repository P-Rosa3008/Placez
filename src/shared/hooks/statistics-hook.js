import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
// import { getBackgroundColours } from "../utils/getterFunctions/getRandomColourArray";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import {
  barChartDataset,
  barOptions,
} from "../utils/statisticsUtils/barChart-utils";
import { typesArray } from "../utils/typeData";
import { getRandomOccurrenceFromArray } from "../utils/getterFunctions/getRandomFromArray";
import { getRandomSentence } from "../utils/getterFunctions/getRandomSentence";
import { getNegativeSetence } from "../utils/getterFunctions/getNegativeSetence";
import { isCountryAccepted } from "../../user/components/UserStats/MapCardComponents/utils/isCountryAccepted";

export const useGetStatisticsData = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const auth = useContext(AuthContext);

  const [typeStatisticsBarChartAllLabels, setTypeStatisticsBarChartAllLabels] =
    useState();
  const [typeStatisticsBarChartAllData, setTypeStatisticsBarChartAllData] =
    useState();
  const [statisticsPieChartPercentageAll, setStatisticsPieChartPercentageAll] =
    useState();
  const [
    typeStatisticsBarChartUserLabels,
    setTypeStatisticsBarChartUserLabels,
  ] = useState();

  const [typeStatisticsBarChartUserData, setTypeStatisticsBarChartUserData] =
    useState();
  // const [coloursUser, setColoursUser] = useState(getBackgroundColours());
  // const [coloursAll, setColoursAll] = useState(getBackgroundColours());
  const [randomStatistic, setRandomStatistic] = useState({
    country: "",
    type: "",
    typeAmount: null,
  });

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const typeStatisticsBarChartAll = async () => {
          const responseData = await sendRequest(
            "http://localhost:8080/api/places"
          );

          const dataCount = [];
          const occurrences = responseData.places.map((p) => p.type);
          const nameOccurrences = [...new Set(occurrences)];

          const count = (arr, val) =>
            arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

          for (const occurrence of nameOccurrences) {
            const numberOfOccurences = count(occurrences, occurrence);
            dataCount.push(numberOfOccurences);
            setTypeStatisticsBarChartAllLabels(nameOccurrences);
            setTypeStatisticsBarChartAllData(dataCount.sort((a, b) => b - a));
          }
        };
        typeStatisticsBarChartAll();

        const typeStatisticsPieChartPercentageAll = async () => {
          const responseData = await sendRequest(
            "http://localhost:8080/api/places"
          );

          const dataCount = [];
          const occurrences = responseData.places.map((p) => p.type);
          const nameOccurrences = [...new Set(occurrences)];

          const count = (arr, val) =>
            arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

          for (const occurrence of nameOccurrences) {
            const numberOfOccurences = count(occurrences, occurrence);
            dataCount.push(numberOfOccurences);
          }

          const calculationOfPercentage = dataCount.map((item) =>
            ((item * 100) / responseData.places.length).toFixed(2)
          );
          setStatisticsPieChartPercentageAll(
            calculationOfPercentage.sort((a, b) => b - a)
          );
        };
        typeStatisticsPieChartPercentageAll();

        const randomCountryStat = async () => {
          let randomStatistic;

          const responseData = await sendRequest(
            "http://localhost:8080/api/places"
          );

          const places = responseData.places;
          const occurrences = places.map((p) => p.country);

          const possibleOccurrences = [...new Set(occurrences)];

          const randomOccurrenceFromArray =
            getRandomOccurrenceFromArray(possibleOccurrences);

          const getCountryAndData = () => {
            const getCountry = places.filter(
              (p) => p.country === randomOccurrenceFromArray
            );
            const dataFromSelectedCountry = places.filter(
              (p) => p.country === getCountry[0].country
            );
            const randomType = getRandomOccurrenceFromArray(typesArray);
            const occurrenceOfTypePerCountry = dataFromSelectedCountry.filter(
              (c) => c.type === randomType
            );

            randomStatistic = {
              country: getCountry[0].country,
              type: randomType,
              typeAmount: occurrenceOfTypePerCountry.length,
            };
          };

          getCountryAndData();

          while (!isCountryAccepted(randomStatistic.country)) {
            getCountryAndData();
          }
          setRandomStatistic(randomStatistic);
        };
        randomCountryStat();

        const typeStatisticsBarChartUser = async () => {
          const responseData = await sendRequest(
            `http://localhost:8080/api/places/${auth.userId}/places`
          );
          const dataCount = [];
          const occurrences = responseData.places.map((p) => p.type);
          const nameOccurrences = [...new Set(occurrences)];

          const count = (arr, val) =>
            arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

          for (const occurrence of nameOccurrences) {
            const numberOfOccurences = count(occurrences, occurrence);
            dataCount.push(numberOfOccurences);
            setTypeStatisticsBarChartUserLabels(nameOccurrences);
            setTypeStatisticsBarChartUserData(dataCount.sort((a, b) => b - a));
          }
        };
        typeStatisticsBarChartUser();

        const typeEvolutionLineChart = async () => {
          const responseData = await sendRequest(
            "http://localhost:8080/api/places"
          );
          const dataCount = [];
          const occurrences = responseData.places.filter((p) => {
            if (p.type === "Resort") return p;
          });
        };
        typeEvolutionLineChart();
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, auth.userId]);

  const typeStatisticsBarChartAll = () => {
    const data = {
      labels: typeStatisticsBarChartAllLabels,
      datasets: barChartDataset(typeStatisticsBarChartAllData),
    };

    return (
      <Box sx={{ width: 325 }}>
        <Typography sx={{ fontWeight: "bold" }}>Most added types?</Typography>
        <Bar width="10%" height="10%" data={data} options={barOptions} />
      </Box>
    );
  };

  const typeStatisticsBarChartUser = () => {
    const data = {
      labels: typeStatisticsBarChartUserLabels,
      datasets: barChartDataset(typeStatisticsBarChartUserData),
    };

    return (
      <Box sx={{ width: 325 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          Types you added the most?
        </Typography>
        <Bar width="10%" height="10%" data={data} options={barOptions} />
      </Box>
    );
  };

  const randomCountryStatistic = () => {
    return randomStatistic.typeAmount > 0
      ? getRandomSentence(
          randomStatistic.country,
          randomStatistic.type,
          randomStatistic.typeAmount
        )
      : getNegativeSetence(randomStatistic.country, randomStatistic.type);
  };

  return {
    typeStatisticsBarChartAll,
    typeStatisticsBarChartUser,
    randomCountryStatistic,
    randomStatistic,
    statisticsPieChartPercentageAll,
  };
};
