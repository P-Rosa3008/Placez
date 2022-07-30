import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

export const useGetStatisticsData = (user) => {
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
          try {
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
              setTypeStatisticsBarChartUserData(
                dataCount.sort((a, b) => b - a)
              );
            }
          } catch (error) {
            console.log(error);
            return <Box />;
          }
        };
        typeStatisticsBarChartUser();

        const typeEvolutionLineChart = async () => {
          const responseData = await sendRequest(
            "http://localhost:8080/api/places"
          );
          const dataCount = [];
          const occurrences = responseData.places.map(
            (p) => p.date.split(" ")[0]
          );
          console.log(occurrences);
          console.log(typeStatisticsBarChartAllLabels);
          console.log(typeStatisticsBarChartAllData);
        };
        typeEvolutionLineChart();
      } catch (err) {}
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

    if (user.places.length > 0) {
      return (
        <Box sx={{ width: 325 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Types you added the most?
          </Typography>
          <Bar width="10%" height="10%" data={data} options={barOptions} />
        </Box>
      );
    }
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

  const placesEvolutionLineChart = () => {};

  return {
    typeStatisticsBarChartAll,
    typeStatisticsBarChartUser,
    randomCountryStatistic,
    randomStatistic,
    statisticsPieChartPercentageAll,
  };
};
