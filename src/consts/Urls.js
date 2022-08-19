export default {
  API_BASE_URL: process.env.REACT_APP_API_URL,
  URL_FILE: process.env.REACT_APP_URL_FILE,

  //INVENTORY
  INVENTORY_LIST: "/car/dealer/list",
  INVENTORY_DETAIL: "/car/dealer/code",
  INVENTORY_CATE: "/category-type/list",
  INVENTORY_COUNT_STATUS: "/car/count-status",
  INVENTORY_UPDATE: "/car/code",
  INVENTORY_CREATE: "/car",
  INVENTORY_DELETE: "/car/code",
  LIST_LOCATION: "/location",
  LIST_BRAND: "/brand/list",
  LIST_MODEL: "/model/list",

  //AUTH
  SIGN_UP: "/user/register",
  SIGN_IN: "/user/login",

  //MERCHANT
  CREATE_MERCHANT: "/create/merchant",
  LIST_MERCHANT: "/admin/merchant/listing",
  DETAIL_MERCHANT: "/admin/merchant",
  CHANGE_STATUS_MERCHANT: "/admin/merchant",

  //ORDER
  ORDER_LIST_DEALER: "/dealer/order/listing",
  ORDER_LIST_SUPPLIER: "/supplier/order/listing",
  ORDER_LIST_ADMIN: "/admin/order/listing",
  ORDER_DETAIL: "/order",
  ORDER_DETAIL_ADMIN: "/admin/order",
  UPDATE_STATUS_ORDER_ADMIN: "/admin/order",
  PRE_ORDER_INFO: "/dealer",

  //ADMIN - USER
  LIST_USER_ADMIN: "/admin/account/listing",
  DETAIL_USER: "/admin/user",

  //UPLOAD
  UPLOAD_FILE: "/file/upload",

  //CHAT
  CHAT_LIST: "/conv/listing",
  CHAT_DETAIL: "/conv",
  CHAT_CREATE: "/conv/create",
  CHAT_ORDER_CREATE: "/conv/by-order",
  SEND_MESSAGE: "/conv",

  //MARKETPLACE
  MARKETPLACE_LIST: "/marketplace/dealer",
  CREATE_ORDER_MARKETPLACE: "/dealer/create-order",

  //PURCHASE
  PURCHASE_LIST: "/dealer/purchase/listing",
  PURCHASE_DETAIL: "/purchase",

  //FINANCE
  FINANCE_LIST_DEALER: "/dealer/finance/listing",
  FINANCE_LIST: "/finance/order/listing"
};
