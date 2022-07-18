export function filterTypes(types) {
  const filterTypeCulture = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Culture";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };

  const filterTypeFoodsAndDrinks = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Foods and Drinks";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };

  const filterTypeHealth = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Health";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };

  const filterTypeHousing = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Housing";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };

  const filterTypeNature = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Nature";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };

  const filterTypeTourism = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Tourism";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };
  const filterTypeOther = () => {
    const typeCulture = types.filter((type, index) => {
      return type["niche"] === "Other";
    });
    return typeCulture.map((type) => {
      return type["label"];
    });
  };

  return {
    filterTypeCulture,
    filterTypeFoodsAndDrinks,
    filterTypeHealth,
    filterTypeHousing,
    filterTypeNature,
    filterTypeTourism,
    filterTypeOther,
  };
}
