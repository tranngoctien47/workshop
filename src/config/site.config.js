export default {
  siteName: "ADMIN",
  siteIcon: "ion-flash",
  footerText: `Admin @ ${new Date().getFullYear()}`,
  enableAnimatedRoute: false,
  apiUrl: process.env.API_URL,
  google: {
    analyticsKey: "UA-xxxxxxxxx-1",
  },
  dashboard: "/dashboard",
};
