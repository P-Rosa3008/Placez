export function filterCountrysAZ(countries) {
  const filterCountryAD = () => {
    return countries.filter((country, index) => {
      return (
        country[0][0] === "A" ||
        country[0][0] === "B" ||
        country[0][0] === "C" ||
        country[0][0] === "D"
      );
    });
  };
  const filterCountryEH = () => {
    return countries.filter((country, index) => {
      return (
        country[0][0] === "E" ||
        country[0][0] === "F" ||
        country[0][0] === "G" ||
        country[0][0] === "H"
      );
    });
  };
  const filterCountryIL = () => {
    return countries.filter((country, index) => {
      return (
        country[0][0] === "I" ||
        country[0][0] === "J" ||
        country[0][0] === "K" ||
        country[0][0] === "L"
      );
    });
  };
  const filterCountryMP = () => {
    return countries.filter((country, index) => {
      return (
        country[0][0] === "M" ||
        country[0][0] === "N" ||
        country[0][0] === "O" ||
        country[0][0] === "P"
      );
    });
  };
  const filterCountryQT = () => {
    return countries.filter((country, index) => {
      return (
        country[0][0] === "Q" ||
        country[0][0] === "R" ||
        country[0][0] === "S" ||
        country[0][0] === "T"
      );
    });
  };
  const filterCountryUZ = () => {
    return countries.filter((country, index) => {
      return (
        country[0][0] === "U" ||
        country[0][0] === "V" ||
        country[0][0] === "Y" ||
        country[0][0] === "Z"
      );
    });
  };

  return {
    filterCountryAD,
    filterCountryEH,
    filterCountryIL,
    filterCountryMP,
    filterCountryQT,
    filterCountryUZ,
  };
}
