import { Marker } from "@react-google-maps/api";
import React from "react";

export default class BetterMarker {
  constructor(
    key,
    title,
    type,
    advanced,
    position,
    icon,
    onClick,
    mapRef,
    countries,
    types
  ) {
    this.key = key;
    this.title = title;
    this.type = type;
    this.advanced = advanced;
    this.position = position;
    this.icon = icon;
    this.onClick = onClick;
    this.mapRef = mapRef;
    this.countries = countries;
    this.types = types;
  }

  createMarker(
    key,
    title,
    type,
    position,
    icon,
    onClick,
    mapRef,
    countries,
    types
  ) {
    if (
      mapRef >= 12 ||
      (types >= 1 && mapRef.zoom >= 9) ||
      (countries >= 1 && mapRef.zoom >= 10) ||
      (countries >= 1 && types >= 1 && mapRef.zoom >= 10)
    ) {
      return (
        <Marker
          key={key}
          title={title}
          type={type}
          position={position}
          icon={icon}
          onClick={onClick}
        ></Marker>
      );
    } else {
      return;
    }
  }
}
