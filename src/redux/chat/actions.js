import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    chatListAction: ["params"],
    chatListSuccess: ["data"],

    chatDetailAction: ["chatCode"],
    chatDetailSuccess: ["data"],

    chatCreateAction: ["params", "callback", "typeChat", "optionChat"],
    chatCreateSuccess: [],

    chatSendMessageAction: ["chatCode", "params", "callback"],
    chatSendMessageSuccess: [],

    chatFailure: []
  },
  {}
);
export default Creators;
