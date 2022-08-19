import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    userListAction: ["params"],
    userListSuccess: ["data"],

    userDetailAction: ["userCode"],
    userDetailSuccess: ["data"],
   
    userFailure: [],
  },
  {}
);
export default Creators;
