import React from "react";

import { useHttpClient } from "../../hooks/http-hook";
import { getRandomOccurrenceFromArray } from "./getRandomFromArray";

export const useRandomCountry = async () => {
  const { sendRequest } = useHttpClient();

  const getRandomCountry = async () => {
    const responseData = await sendRequest("http://localhost:8080/api/places");

    const occurrences = responseData.places.map((p) => p.country);

    const possibleOccurrences = [...new Set(occurrences)];

    const occurrenceOfTypePerCountry = responseData.places.filter(
      (p) => p.country === getRandomOccurrenceFromArray(possibleOccurrences)
    );
    return occurrenceOfTypePerCountry;
  };

  return { getRandomCountry };
};
