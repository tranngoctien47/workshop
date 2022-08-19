import React, { useMemo } from "react";
import { LocationSvg } from "../../../../assets/images/blimobil";
import {
  stringBoolean,
  formatCurrency,
  branchTwoArray
} from "../../../../utils/common";
import moment from "moment";
import { useSelector } from "react-redux";
import { TYPE_USER } from "../../../../consts/Enum";

export default function useData(data) {
  const isRule = useSelector((state) => state.Auth.idToken);

  const dataDescriptionsRow1 = useMemo(() => {
    return [
      [
        {
          label: "VIN #",
          value: data.vin
        },
        {
          label: "Brand",
          value: data?.brand?.name
        },
        {
          label: "Year",
          value: data?.year
        },
        {
          label: "Engine",
          value: data?.engine?.name || "-"
        },
        {
          label: "Fuel Type",
          value: data?.fuelType?.name
        }
      ],
      [
        {
          label: "Location",
          value: data?.location?.name,
          icon: LocationSvg
        },
        {
          label: "Model",
          value: data?.model?.name
        },
        {
          label: "Car Variant",
          value: data?.variant?.name || "-"
        },
        {
          label: "Transmission",
          value: data?.transmission?.name || "-"
        },
        {
          label: "Seating capacity",
          value: data?.seatingCapacity?.name || "-"
        }
      ]
    ];
  }, [data]);

  const dataDescriptionsRow2 = useMemo(() => {
    return [
      [
        {
          label: "Milleage",
          value: data.milleage ? `${formatCurrency(data.milleage)} km` : "-"
        },
        {
          label: "Car Registration Date",
          value: data.registrationDate
            ? moment(data.registrationDate).format("YYYY-MM-DD")
            : "-"
        },
        {
          label: "Document Expiry Date (STNK)",
          value: data.STNKDate
            ? moment(data.STNKDate).format("YYYY-MM-DD")
            : "-"
        },
        {
          label: "Warranty",
          value: stringBoolean(data.warrantyAvailability)
        },
        {
          label: "Spare Key",
          value: stringBoolean(data.spareKeyAvailability)
        }
      ],
      [
        {
          label: "Plate Number",
          value: data.plateNumber === "0" ? "Odd" : "Even"
        },
        {
          label: "Car Registration Type",
          value: data.registrationType === "0" ? "Corporate" : "Personal"
        },
        {
          label: "Document Expiry Date (BPKB)",
          value: data.BPKBDate
            ? moment(data.BPKBDate).format("YYYY-MM-DD")
            : "-"
        },
        {
          label: "Service Book",
          value: stringBoolean(data.serviceBookAvailability)
        },
        {
          label: "",
          value: ""
        }
      ]
    ];
  }, [data]);

  const dataPriceShippingFirst = useMemo(() => {
    return [
      [
        {
          label: "Selling Price",
          value: `IDR ${formatCurrency(data.sellingPrice)}`
        },
        {
          label: "Original Price (Show)",
          value: `IDR ${formatCurrency(data.originalPrice)}`
        }
      ],
      [
        {
          label: isRule === TYPE_USER.SUPPLIER ? "BBN Cost" : "",
          value:
            isRule === TYPE_USER.SUPPLIER
              ? `IDR ${formatCurrency(data.bbnCost)}`
              : ""
        },
        { label: "Discount", value: data.discountPercent }
      ]
    ];
  }, [data]);

  const dataPriceShippingSecond = useMemo(() => {
    return [
      [{ label: "Local Delivery (Free)", value: stringBoolean(true) }],
      [{ label: "In-store Pickup (Free)", value: stringBoolean(true) }]
    ];
  }, [data]);

  const dataConvenience = useMemo(() => {
    return branchTwoArray(data.conveniences);
  }, [data]);

  const dataCabin = useMemo(() => {
    return branchTwoArray(data.cabins);
  }, [data]);

  const dataSafety = useMemo(() => {
    return branchTwoArray(data.safeties);
  }, [data]);

  const dataLighting = useMemo(() => {
    return branchTwoArray(data.lightings);
  }, [data]);

  return [
    dataDescriptionsRow1,
    dataDescriptionsRow2,
    dataPriceShippingFirst,
    dataPriceShippingSecond,
    dataConvenience,
    dataCabin,
    dataSafety,
    dataLighting
  ];
}
