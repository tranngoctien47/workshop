import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    merchantListAction: ["params"],
    merchantListSuccess: ["data"],
    
    merchantCreateAction: ["params", "callback"],
    merchantCreateSuccess: ["data"],

    merchantDetailAction: ["merchantCode"],
    merchantDetailSuccess: ["data"],

    merchantUpdateStatusAction: ["data", "codeMerchant", "callback"],
    merchantUpdateStatusSuccess: [],
   
    merchantFailure: [],
  },
  {}
);
export default Creators;
