import { random } from "lodash";

const data = [];

export const listStatusUser = [
  "new",
  "requestingStore",
  "available",
  "storeRejected",
  "deleted",
];

for (let i = 0; i < 10; i++) {
  data.push({
    id: i,
    dealerName: "Blimobil Dealer 1",
    dateRegistered: "12 May 2022",
    lastVisited: "12 May 2022",
    status: listStatusUser[random(4)],
    inventory: random(120),
    totalIncome: "IDR 90,100",
    totalCharged: "IDR 2,703"
  });
}

export { data };
