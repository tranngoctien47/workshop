import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    orderListAction: ["params"],
    orderListSuccess: ["data"],

    orderDetailAction: ["orderCode"],
    orderDetailSuccess: ["data"],

    orderAdminDetailAction: ["orderCode", "typeOrder"],
    orderAdminDetailSuccess: ["data"],

    orderAdminUpdateStatusAction: ["orderCode", "typeOrder", "params", "paramsList"],
    orderAdminUpdateStatusSuccess: [],

    preOrderInfoAction: [],
    preOrderInfoSuccess: [],

    orderFailure: [],
  },
  {}
);
export default Creators;