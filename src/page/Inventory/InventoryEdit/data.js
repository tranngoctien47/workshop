import {
  cabin,
  feature10,
  feature11,
  feature12,
  feature13,
  feature14,
  feature15,
  feature16,
  feature17,
  feature18,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
  feature7,
  feature8,
  feature9,
  lighting,
  safety,
  WirelessCharger,
} from "../../../assets/images/blimobil";
import { dataSelectYear } from "../../../utils/common";

const dataFeatures = [
  {
    icon: WirelessCharger,
    name: "Wireless Charger",
  },
  {
    icon: feature2,
    name: "Electric Steering Adjustment",
  },
  {
    icon: feature3,
    name: "Parking Brake",
  },
  {
    icon: feature4,
    name: "Cruise Control",
  },
  {
    icon: feature5,
    name: "Auto Brake Hold",
  },
  {
    icon: feature6,
    name: "Paddle Shift",
  },
  {
    icon: feature7,
    name: "Steering Mode Selection",
  },
  {
    icon: feature8,
    name: "Push Start Button",
  },
  {
    icon: feature9,
    name: "Power Door",
  },
  {
    icon: feature10,
    name: "Door Lock Keyless Operation",
  },
  {
    icon: feature11,
    name: "Auto Start",
  },
  {
    icon: feature12,
    name: "Reverse Camera",
  },
  {
    icon: feature13,
    name: "Auto Wipers / Rain Sensing",
  },
  {
    icon: feature14,
    name: "Bluetooth",
  },
  {
    icon: feature15,
    name: "Navigation",
  },
  {
    icon: feature16,
    name: "Hill Start Assist",
  },
  {
    icon: feature16,
    name: "Hill Descent Assist",
  },
  {
    icon: feature17,
    name: "Parking Sensor Front",
  },
  {
    icon: feature18,
    name: "Auto Dim Rearview Mirror",
  },
];

export const dataCabin = [
  {
    icon: cabin.cabin1,
    name: "Sunroof",
  },
  {
    icon: cabin.cabin2,
    name: "Electronice Adjustable Seats",
  },
  {
    icon: cabin.cabin3,
    name: "Rear Air-cond",
  },
  {
    icon: cabin.cabin4,
    name: "Sun Shade",
  },
  {
    icon: cabin.cabin5,
    name: "Power Sockets / USB",
  },
  {
    icon: cabin.cabin6,
    name: "Carplay",
  },
];

export const dataSafety = [
  {
    icon: safety.safety1,
    name: "Autonomous Braking System (AEB)",
  },
  {
    icon: safety.safety2,
    name: "Emergency Stop Signal (ESS)",
  },
  {
    icon: safety.safety3,
    name: "Lane-keeping Assist",
  },
  {
    icon: safety.safety4,
    name: "ABS/EBD",
  },
  {
    icon: safety.safety5,
    name: "Stability Control",
  },
  {
    icon: safety.safety6,
    name: "Airbags",
  },
  {
    icon: safety.safety7,
    name: "ISOFIX",
  },
];

export const dataLighting = [
  {
    icon: lighting.lighting1,
    name: "Auto Headlamps",
  },
  {
    icon: lighting.lighting2,
    name: "LED Daytime Running Lights",
  },
];

export const dataSelect = [
  {
    name: "Jack",
    key: "jack",
  },
  {
    name: "Lucy",
    key: "lucy",
  },
];

export const listFormModalExtrar = [
  {
    name: "carBrand",
    label: "Car Brand",
    required: true,
    placeholder: "Select a brand",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "carModel",
    label: "Car Model",
    required: true,
    placeholder: "Select a model",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "carYear",
    label: "Car Year",
    required: true,
    placeholder: "Select car year",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "carVariant",
    required: true,
    label: "Car Variant",
    placeholder: "Select car variant",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "engine",
    label: "Engine",
    required: false,
    placeholder: "Select Location",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "transmission",
    label: "Transmission",
    required: false,
    placeholder: "Select car variant",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "milleage",
    label: "Milleage",
    required: false,
    placeholder: "Select milleage range",
    dataSelect: dataSelect,
    type: "select",
  },
  {
    name: "price",
    label: "Price",
    required: true,
    placeholder: "Number",
    type: "input",
  },
];

export { dataFeatures };
