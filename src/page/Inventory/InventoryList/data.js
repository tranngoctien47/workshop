import UIColor from "../../../colors";
import { random } from "lodash";
import { CAR_STATUS_KEY } from "../../../consts/Enum"

const data = [];

const status = ["Draft", "Available", "Booked", "Sold"]

for(let i =0; i < 10; i++){
    data.push({
        id: i,
        vin: "#VIN12345XYZ",
        status: status[(random(3))],
        type: "Used",
        year: "2019",
        brand: "Honda",
        model: "Accord",
        variant: "1.5 AT",
        milleage: "21,021",
        color: ["#FA8F21", "#171717"],
        media: {
            image: 5,
            mp4: 1
        },
        price: "IDR 90,100"
    })
}

const listStatus = [
    {
      label: "All cars",
      count: 316,
      key: "all",
    },
    {
      label: "Draft",
      count: 19,
      key: CAR_STATUS_KEY.DRAFT,
      color: UIColor.status.draft,
    },
    {
      label: "Availabe",
      count: 188,
      key: CAR_STATUS_KEY.AVAILABLE,
      color: UIColor.status.available,
    },
    {
      label: "Booked",
      count: 23,
      key: CAR_STATUS_KEY.BOOKED,
      color: UIColor.status.booked,
    },
    {
      label: "Sold",
      count: 129,
      key: CAR_STATUS_KEY.SOLD,
      color: UIColor.status.sold,
    },
  ];

export {data, listStatus};