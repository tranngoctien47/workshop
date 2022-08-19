import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    marketplaceListAction: ["params"],
    marketplaceListSuccess: ["data"],

    marketplaceDetailAction: ["code"],
    marketplaceDetailSuccess: ["data"],

    marketplaceBookingAction: ["params"],
    marketplaceBookingSuccess: ["data"],

    marketplaceBookingCreateAction: ["params", "callback"],
    marketplaceBookingCreateSuccess: ["data"],

    marketplaceFailure: [],
  },
  {}
);
export default Creators;
