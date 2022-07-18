import { StatisticsCard } from "./../components/UserStats/StatisticsCard";
import { RandomStatisticCard } from "./../components/UserStats/RandomStatisticCard";
import { MapToChooseStatisticsCard } from "../components/UserStats/MapToChooseStatisticsCard";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useGetStatisticsData } from "../../shared/hooks/statistics-hook";
import { TypeStatisticsPieChartUser as TypeStatisticsBarChartUser } from "../../shared/utils/statisticsUtils/statisticsFunctions.js/typePieChartUser";

function UserStats() {
  const username = useParams().username;
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [user, setUser] = useState();

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/api/users/${username}`
        );
        setUser(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest, username]);

  const {
    randomStatistic,
    randomCountryStatistic,
    typeStatisticsBarChartAll,
    typeStatisticsBarChartUser,
  } = useGetStatisticsData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ maxHeight: "100vh", backgroundColor: "white" }}
    >
      {user ? (
        <Box height="100%" width="100%" display="flex">
          <Box
            sx={{
              height: "100%",
              display: "block",
            }}
          >
            <RandomStatisticCard
              randomStatistic={randomStatistic}
              randomCountryStatistic={randomCountryStatistic}
            />
            <StatisticsCard
              user={user}
              typeStatisticsBarChartAll={typeStatisticsBarChartAll}
              typeStatisticsBarChartUser={typeStatisticsBarChartUser}
            />
          </Box>
          <MapToChooseStatisticsCard />
        </Box>
      ) : null}
    </Box>
  );
}

export default UserStats;
