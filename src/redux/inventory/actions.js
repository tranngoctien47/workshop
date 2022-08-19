import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    inventoryListAction: ["params"],
    inventoryListSuccess: ["data"],

    inventoryDetailAction: ["code"],
    inventoryDetailSuccess: ["data"],

    inventoryCountStatusAction : [],
    inventoryCountStatusSuccess: ["data"],

    inventoryDeleteAction: ["code", "params", "callback"],
    inventoryDeleteSuccess: [],

    inventoryCreateAction: ["params", "callback"],
    inventoryCreateSuccess: [],

    inventoryUpdateAction: ["params", "code", "callback"],
    inventoryUpdateSuccess: [],

    inventoryFailure: [],
  },
  {}
);
export default Creators;
