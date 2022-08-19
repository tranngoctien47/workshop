import React, { Suspense, lazy, useMemo } from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { InventorySvg, OrderSvg, AppsSvg, UserSliderSvg, MarketplaceSvg, PurchaseSvg } from "../../assets/images/blimobil";
import BreadcrumbDashboard from "./BreadcrumbDashboard";
import Loader from "@iso/components/utility/loader";
import RouteName, { RouteHiddenBreadcrum } from "../../routeName";
import { BackTop } from "antd";
import { useSelector } from "react-redux";
import { TYPE_USER } from "../../consts/Enum";

const routesDelear = [
  {
    path: RouteName.inventory.list,
    component: lazy(() => import("../../page/Inventory/InventoryList")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory",
  },
  {
    path: `${RouteName.inventory.detail}/:id`,
    component: lazy(() => import("../../page/Inventory/InventoryDetail")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory/card-details",
  },
  {
    path: `${RouteName.inventory.create}/:action`,
    component: lazy(() => import("../../page/Inventory/InventoryEdit")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory/card-create",
  },
  {
    path: `${RouteName.inventory.update}/:action/:id`,
    component: lazy(() => import("../../page/Inventory/InventoryEdit")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory/card-update",
  },
  {
    path: RouteName.order.list,
    component: lazy(() => import("../../page/Orders/OrderList")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "orders",
  },
  {
    path: `${RouteName.order.detail}/:id`,
    component: lazy(() => import("../../page/Orders/OrderDetail")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "orders/order-details",
  },
  {
    path: RouteName.apts.list,
    component: lazy(() => import("../../page/Appts")),
    exact: true,
    iconRoot: AppsSvg ,
    breadcrumb: "appts",
  },
  {
    path: RouteName.profile.profile,
    component: lazy(() => import("../../page/Profile/Detail")),
    exact: true,
    iconRoot: "" ,
    breadcrumb: "myProfile",
  },
  {
    path: RouteName.marketplace.list,
    component: lazy(() => import("../../page/Marketplace/MarketplaceList")),
    exact: true,
    iconRoot: MarketplaceSvg ,
    breadcrumb: "Marketplace",
  },
  {
    path: `${RouteName.marketplace.detail}/:id`,
    component: lazy(() => import("../../page/Marketplace/MarketplaceDetail")),
    exact: true,
    iconRoot: MarketplaceSvg ,
    breadcrumb: "marketplace/car-details",
  },
  {
    path: `${RouteName.marketplace.booking}/:id`,
    component: lazy(() => import("../../page/Marketplace/MarketplaceBooking")),
    exact: true,
    iconRoot: MarketplaceSvg ,
    breadcrumb: "marketplace/booking",
  },
  {
    path: `${RouteName.purchase.list}`,
    component: lazy(() => import("../../page/Purchase/PurchaseList")),
    exact: true,
    iconRoot: PurchaseSvg ,
    breadcrumb: "purchaseOrders",
  },
  {
    path: `${RouteName.purchase.detail}/:id`,
    component: lazy(() => import("../../page/Purchase/PurchaseDetail")),
    exact: true,
    iconRoot: PurchaseSvg ,
    breadcrumb: "purchaseOrders/order-details",
  },
];

const routesSupplier = [
  {
    path: RouteName.inventory.list,
    component: lazy(() => import("../../page/Inventory/InventoryList")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory",
  },
  {
    path: `${RouteName.inventory.detail}/:id`,
    component: lazy(() => import("../../page/Inventory/InventoryDetail")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory/card-details",
  },
  {
    path: `${RouteName.inventory.create}/:action`,
    component: lazy(() => import("../../page/Inventory/InventoryEdit")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory/card-create",
  },
  {
    path: `${RouteName.inventory.update}/:action/:id`,
    component: lazy(() => import("../../page/Inventory/InventoryEdit")),
    exact: true,
    iconRoot: InventorySvg ,
    breadcrumb: "inventory/card-update",
  },
  {
    path: RouteName.order.list,
    component: lazy(() => import("../../page/Orders/OrderList")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "orders",
  },
  {
    path: `${RouteName.order.detail}/:id`,
    component: lazy(() => import("../../page/Orders/OrderDetail")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "orders/order-details",
  },
  {
    path: RouteName.apts.list,
    component: lazy(() => import("../../page/Appts")),
    exact: true,
    iconRoot: AppsSvg ,
    breadcrumb: "appts",
  },
  {
    path: RouteName.profile.profile,
    component: lazy(() => import("../../page/Profile/Detail")),
    exact: true,
    iconRoot: "" ,
    breadcrumb: "myProfile",
  },
];

const routesAdmin = [
  {
    path: RouteName.user.list,
    component: lazy(() => import("../../page/Admin/User/UserList")),
    exact: true,
    iconRoot: UserSliderSvg ,
    breadcrumb: "usersManagement",
  },
  {
    path: RouteName.order.list,
    component: lazy(() => import("../../page/Orders/OrderList")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "orders",
  },
  {
    path: `${RouteName.order.detail}/:id`,
    component: lazy(() => import("../../page/Orders/OrderDetail")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "orders/order-details",
  },
  {
    path: RouteName.profile.profile,
    component: lazy(() => import("../../page/Profile/Detail")),
    exact: true,
    iconRoot: "" ,
    breadcrumb: "myProfile",
  },
  {
    path: `${RouteName.user.detail}/:id`,
    component: lazy(() => import("../../page/Admin/User/UserDetailDealer")),
    exact: true,
    iconRoot: UserSliderSvg ,
    breadcrumb: "usersManagement/dealers/dealer-profile",
  },
];

const routesFinance = [
  {
    path: RouteName.requests.list,
    component: lazy(() => import("../../page/Request/RequestList")),
    exact: true,
    iconRoot: OrderSvg ,
    breadcrumb: "requests",
  },
  {
    path: RouteName.profile.profile,
    component: lazy(() => import("../../page/Profile/Detail")),
    exact: true,
    iconRoot: "" ,
    breadcrumb: "myProfile",
  },
]

export default function AppRouter() {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const { pathname } = useLocation();

  const routerRoot = useMemo(()=>{
    if(isLoggedIn === TYPE_USER.ADMIN){
      return routesAdmin;
    }
    if(isLoggedIn === TYPE_USER.SUPPLIER){
      return routesSupplier;
    }
    if(isLoggedIn === TYPE_USER.DEALER){
      return routesDelear;
    }
    if(isLoggedIn === TYPE_USER.FINANCE){
      return routesFinance
    }
  }, [isLoggedIn])

  const isHiddenBreadcrum = React.useMemo(() => {
    return !RouteHiddenBreadcrum.some(el => pathname.includes(el));
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routerRoot.map((route, idx) => (
            <Route exact={route.exact} key={route.path} path={route.path}>
              {isHiddenBreadcrum && <BreadcrumbDashboard icon={route.iconRoot} breadcrumb={route.breadcrumb} />}
              <route.component />
              <BackTop/>
            </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
