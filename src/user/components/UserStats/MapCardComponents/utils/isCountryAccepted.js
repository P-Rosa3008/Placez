import { countrys } from "./countriesNamesOnly";
import { unacceptedCountries } from "./unacceptedCountrys";

export const isCountryAccepted = (country) => {
  if (unacceptedCountries.includes(country)) {
    return false;
  }
  if (countrys.includes(country)) {
    return true;
  }
};
