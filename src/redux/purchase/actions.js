import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    purchaseListAction: ["params"],
    purchaseListSuccess: ["data"],

    purchaseDetailAction: ["purchaseCode"],
    purchaseDetailSuccess: ["data"],

    purchaseFailure: [],
  },
  {}
);
export default Creators;