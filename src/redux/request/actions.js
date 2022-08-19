import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    requestListAction: ["params"],
    requestListSuccess: ["data"],

    requestDetailAction: ["purchaseCode"],
    requestDetailSuccess: ["data"],

    requestFailure: [],
  },
  {}
);
export default Creators;