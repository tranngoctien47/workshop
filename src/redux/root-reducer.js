import App from "@iso/redux/app/reducer";
import Auth from "@iso/redux/auth/reducer";
import LanguageSwitcher from "@iso/redux/languageSwitcher/reducer";
import ThemeSwitcher from "@iso/redux/themeSwitcher/reducer";
import inventoryReducer from "./inventory/reducer";
import authorizationReducer from "./authorization/reducer";
import merchantReducer from "./merchant/reducer";
import userReducer from "./user/reducer";
import orderReducer from "./order/reducer";
import marketplaceReducer from "./marketplace/reducer";
import chatReducer from "./chat/reducer";
import purchaseReducer from "./purchase/reducer";
import requestReducer from "./request/reducer";
import { combineReducers } from "redux";
import { resettableReducer } from "reduxsauce";

const resettable = resettableReducer("RESET");

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  inventoryState: resettable(inventoryReducer),
  authorizationState: resettable(authorizationReducer),
  merchantState: resettable(merchantReducer),
  userState: resettable(userReducer),
  orderState: resettable(orderReducer),
  marketplaceState: resettable(marketplaceReducer),
  chatState: resettable(chatReducer),
  purchaseState: resettable(purchaseReducer),
  requestState: resettable(requestReducer)
});
