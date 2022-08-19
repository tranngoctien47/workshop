import React, { useMemo } from "react";
import { parseFeature } from "../../../utils/common";
import { dataCabin, dataFeatures, dataLighting, dataSafety } from "../../Inventory/InventoryEdit/data";

export default function useData(data) {
  const dataDetailMarketplace = useMemo(() => {
    return [
      {
        label: "Fuel Type",
        value: data?.fuelType?.name,
      },
      {
        label: "Current Color",
        value: "",
      },
      {
        label: "Seat",
        value: "",
      },
      {
        label: "Registration Date",
        value: "",
      },
      {
        label: "Registration Type",
        value: "",
      },
      {
        label: "Current Mileage",
        value: "",
      },
      {
        label: "Spare Key",
        value: "",
      },
      {
        label: "Service Book",
        value: "",
      },
      {
        label: "Principal Warranty",
        value: "",
      },
    ];
  }, [data]);

  const dataFeaturesConvenience = useMemo(()=>{
    return parseFeature(data.conveniences, dataFeatures)
  },[data])

  const dataFeaturesCabin = useMemo(()=>{
    return parseFeature(data.cabins, dataCabin)
  },[data])

  const dataFeaturesSafety = useMemo(()=>{
    return parseFeature(data.safeties, dataSafety)
  },[data])

  const dataFeaturesLighting = useMemo(()=>{
    return parseFeature(data.lightings, dataLighting)
  },[data])

  return [dataDetailMarketplace, dataFeaturesConvenience, dataFeaturesCabin, dataFeaturesSafety, dataFeaturesLighting];
}
