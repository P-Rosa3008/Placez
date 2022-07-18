import { types } from "../../CreateMarker/components/Types.js";

function MarkerTypes(typeProp) {
  const type = types.filter((type) => {
    return type.label === typeProp;
  });
  const typeKey = type[0].key.replace(/\s/g, "").toLowerCase();
  const typeNiche = type[0].niche.replace(/\s/g, "");
  const iconUrl = `../../icons/${typeNiche}/${typeKey}.png`;
  return iconUrl;
}

export default MarkerTypes;
