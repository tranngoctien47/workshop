import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    signUpAction: ["params", "callback"],
    signUpSuccess: [],

    signInAction: ["params", "callback"],
    signInSuccess: [],

    login: ["token"],
    logOut: [],

    authorizationFailure: [],
  },
  {}
);
export default Creators;
