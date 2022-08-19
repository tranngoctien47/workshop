const RouteName = {
    inventory:{
        list: "/dashboard/inventory",
        detail : "/dashboard/inventory/card-details",
        create: "/dashboard/inventory",
        update: "/dashboard/inventory"
    },
    user:{
        list: "/dashboard/users",
        detail: "/dashboard/user-dealer/detail"
    },
    order:{
        list: "/dashboard/orders",
        detail: "/dashboard/order/details"
    },
    apts:{
        list: "/dashboard/appts",
    },
    profile:{
        profile: `/dashboard/profile`,
    },
    marketplace:{
        list: "/dashboard/marketplace",
        detail: "/dashboard/marketplace/card-details",
        booking: "/dashboard/marketplace/booking"
    },
    purchase:{
        list: "/dashboard/purchase",
        detail: "/dashboard/purchase/details"
    },
    requests: {
        list: "/dashboard/requests",
        detail: "/dashboard/requests/details"
    }
}

export const RouteHiddenNav = [RouteName.profile.profile, RouteName.marketplace.booking];

export const RouteHiddenBreadcrum = [ RouteName.marketplace.booking ];

export default RouteName;