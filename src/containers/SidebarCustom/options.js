import {
  InventorySvg,
  OrderSvg,
  MarketplaceSvg,
  UserSliderSvg,
  PurchaseSvg,
} from "../../assets/images/blimobil";

export const optionDealer = {
  sellCar: [
    {
      key: "inventory",
      label: "Inventory",
      icon: InventorySvg,
    },
    {
      key: "orders",
      label: "Orders",
      icon: OrderSvg,
    },
  ],
  buyCar: [
    {
      key: "marketplace",
      label: "Marketplace",
      icon: MarketplaceSvg,
    },
    {
      key: "purchase",
      label: "Purchase",
      icon: PurchaseSvg,
    },
  ]
};

export const optionSupplier = [
  {
    key: "inventory",
    label: "Inventory",
    icon: InventorySvg,
  },
  {
    key: "orders",
    label: "Orders",
    icon: OrderSvg,
  },
];

export const optionAdmin = [
  {
    key: "orders",
    label: "Orders",
    icon: OrderSvg,
  },
  {
    key: "users",
    label: "Users",
    icon: UserSliderSvg,
  },
];

export const optionFinance = [
  {
    key: "requests",
    label: "Requests",
    icon: OrderSvg,
  },
]