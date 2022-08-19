import { random } from "lodash";

const data = [];

const listStatus = [
  "pendingPayment",
  "verifyingPayment",
  "paid",
  "delivered",
  "completed",
  "cancelLed",
];

for (let i = 0; i < 10; i++) {
  data.push({
    id: i,
    order: "#OR12345XYZ",
    status: listStatus[random(5)],
    product: "2019 Honda Accord Sport 1.5T CVT",
    buyer: {
        avatar: `https://joeschmoe.io/api/v1/${i + 1}`,
        name: "Savannah Nguyen"
    },
    date: "12 May 2022",
    totalAmount: "IDR 90,100",
    totalFee: "IDR 2,703"
  });
}

export { data };
