export const TYPE_PAGE = Object.freeze({
  DETAIL: 1,
  CREATE: 2,
  UPDATE: 3
});

export const PAGINATION = Object.freeze({
  page: 1,
  recordPerPage: 10
});

export const CAR_STATUS_KEY = Object.freeze({
  DRAFT: "0",
  AVAILABLE: "1",
  BOOKED: "2",
  SOLD: "3"
});

export const TYPE_USER = Object.freeze({
  BUYER: "buyer",
  DEALER: "dealer",
  SUPPLIER: "supplier",
  ADMIN: "admin",
  FINANCE: "finance"
});

export const CAR_STATUS_VALUE = Object.freeze({
  0: "Draft",
  1: "Available",
  2: "Booked",
  3: "Sold"
});

export const CAR_USAGE_TYPE = Object.freeze({
  0: "New",
  1: "Used"
});

export const CAR_USAGE_VALUE = Object.freeze({
  NEW: "0",
  USED: "1"
});

export const CATEGORY_TYPE = Object.freeze({
  CAR_YEAR: "carYear",
  CAR_VARIANT: "carVariant",
  ENGINE: "engine",
  TRANSMISSION: "transmission",
  FUEL_TYPE: "fuelType",
  SEATING_CAPACITY: "seatingCapacity",
  CAR_COLOR: "carColor",
  CAR_FEATURE_CONVENIENCE: "carFeatureConvenience",
  CAR_FEATURE_CABIN: "carFeatureCabin",
  CAR_FEATURE_SAFETY: "carFeatureSafety",
  CAR_FEATURE_LIGHTING: "carFeatureLighting",
  SHIPPING_METHOD: "shippingMethod"
});

export const ACTION_PAGE = Object.freeze({
  CREATE: "create",
  UPDATE: "update"
});

export const TAB_INFO = Object.freeze({
  INFORMATION: "INFORMATION",
  STORE: "STORE"
});

export const TYPE_FILE = Object.freeze({
  CAR: "car"
});

export const PASSPORT_REG_EX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*?]{8,}$/;

export const EMAIL_REG_EX =
  /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;

export const STATUS_DEALER = Object.freeze({
  ALL_DEALERS: "all",
  NEW: "new",
  RESQUESTING_STORE: "requestingStore",
  AVAILABLE: "available",
  STORE_REJECTED: "rejected",
  DELETED: "deleted"
});

export const STATUS_SUPPLIER = Object.freeze({
  ALL_SUPPLIER: "all",
  NEW: "new",
  RESQUESTING_STORE: "requestingStore",
  AVAILABLE: "available",
  STORE_REJECTED: "rejected",
  DELETED: "deleted"
});

export const STATUS_ORDER_BUYER = Object.freeze({
  PENDING_PAYMENT: "pendingPayment",
  VERIFYING_PAYMENT: "verifyingPayment",
  PAID: "paid",
  DELIVERED: "delivered",
  RELEASED_PAYMENT: "releasedPayment",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
});

export const STATUS_ORDER_DEALER = Object.freeze({
  PENDING_PAYMENT: "pendingPayment",
  VERIFYING_PAYMENT: "verifyingPayment",
  PAID_PARTIALLY_PAID: "paid/partiallyPaid",
  DELIVERED: "delivered",
  RELEASED_PAYMENT: "releasedPayment",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
});

export const SHIPPING_METHOD = Object.freeze({
  LOCAL_DELIVERY: "localDelivery",
  IN_STORE_PICKUP: "inStorePickup"
});

export const FINANCE_OPTIONS = Object.freeze({
  PAY_IN_FULL: "payInFull",
  PERSONAL_LOAN: "personalLoan"
});

export const size = {
  xs: 576,
  sm: 576,
  md: 768,
  lg: 1200,
  xxl: 1600
};

export const device = {
  xs: `(max-width: ${size.xs}px)`,
  sm: `(min-width: ${size.sm}px)`,
  md: `(min-width: ${size.md}px)`,
  lg: `(min-width: ${size.lg}px)`,
  xxl: `(min-width: ${size.xxl}px)`
};

export const TYPE_ORDER = Object.freeze({
  BUYER_DEALER: "buyer-dealer",
  DEALER_SUPPLIER: "dealer-supplier"
});

export const TYPE_CHAT_ADMIN1 = Object.freeze({
  DEALER: {
    key: "dealer",
    name: "Dealer"
  },
  SUPPLIER: {
    key: "supplier",
    name: "Supplier"
  },
  FINACE: {
    key: "finance",
    name: "Finance"
  }
});

export const TYPE_CHAT_SUPPLIER = Object.freeze({
  BUYER: {
    key: "buyer",
    name: "Buyer"
  },
  DEALER: {
    key: "dealer",
    name: "Dealer"
  },
  ADMIN: {
    key: "admin",
    name: "Admin"
  },
  FINACE: {
    key: "finance",
    name: "Finance"
  }
});

export const TYPE_CHAT_DEALER = Object.freeze({
  BUYER: {
    key: "buyer",
    name: "Buyer"
  },
  DEALER: {
    key: "dealer",
    name: "Dealer"
  },
  SUPPLIER: {
    key: "supplier",
    name: "Supplier"
  },
  ADMIN: {
    key: "admin",
    name: "Admin"
  },
  FINACE: {
    key: "finance",
    name: "Finance"
  }
});

export const TYPE_CHAT_FINANCE = Object.freeze({
  BUYER: {
    key: "buyer",
    name: "Buyer"
  },
  DEALER: {
    key: "dealer",
    name: "Dealer"
  },
  SUPPLIER: {
    key: "supplier",
    name: "Supplier"
  },
  ADMIN: {
    key: "admin",
    name: "Admin"
  }
});

export const TYPE_CHAT_ADMIN = Object.freeze({
  DEALER: "dealer",
  SUPPLIER: "supplier",
  FINACE: "finance"
});

export const CHAT_TYPE_CREATE = Object.freeze({
  CAR: "car",
  ORDER: "order"
});

// export const TYPE_CHAT_ADMIN = Object.freeze({
//   DEALER_BUYER: {
//     key: "dealer-buyer",
//     name: "Buyer"
//   },
//   DEALER_SUPPLIER: {
//     key: "dealer-supplier",
//     name: "Supplier"
//   },
//   DEALER_ADMIN: {
//     key: "dealer-admin",
//     name: "Admin"
//   },
//   DEALER_FINACE: {
//     key: "dealer-finance",
//     name: "Finance"
//   }
// });

// export const TYPE_CHAT_SUPPLIER = Object.freeze({
//   DEALER_BUYER: {
//     key: "dealer-buyer",
//     name: "Buyer"
//   },
//   DEALER_SUPPLIER: {
//     key: "dealer-supplier",
//     name: "Supplier"
//   },
//   DEALER_ADMIN: {
//     key: "dealer-admin",
//     name: "Admin"
//   },
//   DEALER_FINACE: {
//     key: "dealer-finance",
//     name: "Finance"
//   }
// });
