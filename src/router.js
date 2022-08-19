import React, { Fragment, lazy, Suspense } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorBoundary from "./ErrorBoundary";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "./route.constants";
import Loader from "@iso/components/utility/loader";
import { BackgroundAuth, BlockAuth, HeaderAuth } from "./auth.styles";
import { IconSvg } from "./components/ScrumBoard/IconSvg/IconSvg";
import { IconBlomobilWhite, IconBlomobilAuth } from "./assets/images/blimobil";
import useWindowSize from "./hooks/useWindowSize";
import { size } from "./consts/Enum";
import { Layout } from "antd";
import UIColor from "./colors";
import Scrollbar from "./components/utility/customScrollBar";
import styled from "styled-components";

const ScrollbarStyled = styled(Scrollbar)`
  height: calc(100vh - 58px - 47px);
`;

const { Footer } = Layout;

const styles = {
  footer: {
    background: UIColor.bgHeader,
    textAlign: "center",
    borderTop: "1px solid #ededed",
    color: "white",
    padding: "12px",
    position: "fixed",
    bottom: 0,
    width: "100%",
    fontSize: 12,
  },
};

const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));
const StorePage = lazy(() => import("./page/Store"));
const EditProfilePage = lazy(() => import("./page/Profile/Edit"));
const SignInPage = lazy(() => import("../src/page/Auth/SignIn"));

const authRoutes = [
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("../src/page/Auth/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import("../src/page/Auth/SignUp")),
  },
  {
    path: PUBLIC_ROUTE.VERIFY_EMAIL,
    component: lazy(() => import("../src/page/Auth/Verify")),
  },
];

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import("@iso/containers/Pages/404/404")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_403,
    component: lazy(() => import("../src/page/403")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import("@iso/containers/Pages/500/500")),
  },
  {
    path: PUBLIC_ROUTE.AUTH0_CALLBACK,
    component: lazy(() =>
      import("@iso/containers/Authentication/Auth0/Auth0Callback")
    ),
  },
];
function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  const sizeWindow = useWindowSize();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            <Route key={1} path={PUBLIC_ROUTE.LANDING} exact={true}>
              <BlockAuth>
                <HeaderAuth>
                  <IconSvg
                    width={123}
                    border="unset"
                    mr="0"
                    ml="0"
                    padding="0"
                    height={30}
                    src={IconBlomobilAuth}
                  />
                </HeaderAuth>
                <BackgroundAuth>
                  <SignInPage />
                </BackgroundAuth>
              </BlockAuth>
            </Route>
          </Switch>
          <Switch>
            {authRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <BlockAuth>
                  <HeaderAuth>
                    {sizeWindow.width <= size.xs ? (
                      <IconSvg
                        width={123}
                        border="unset"
                        mr="0"
                        ml="0"
                        padding="0"
                        height={30}
                        src={IconBlomobilWhite}
                      />
                    ) : (
                      <IconSvg
                        width={123}
                        border="unset"
                        mr="0"
                        ml="0"
                        padding="0"
                        height={30}
                        src={IconBlomobilAuth}
                      />
                    )}
                  </HeaderAuth>
                  <BackgroundAuth>
                    <route.component />
                  </BackgroundAuth>
                  {sizeWindow.width <= size.xs && (
                    <Footer style={styles.footer}>
                      © 2022 Blimobil Company. All rights reserved.
                    </Footer>
                  )}
                </BlockAuth>
              </Route>
            ))}
          </Switch>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path={PRIVATE_ROUTE.SET_UP_STORE}>
              <BlockAuth>
                <HeaderAuth>
                  <IconSvg
                    width={123}
                    border="unset"
                    mr="0"
                    ml="0"
                    padding="0"
                    height={30}
                    src={IconBlomobilAuth}
                  />
                </HeaderAuth>
                <BackgroundAuth>
                  <StorePage />
                </BackgroundAuth>
              </BlockAuth>
            </PrivateRoute>
            <PrivateRoute path={PRIVATE_ROUTE.SET_UP_ACCOUNT}>
              <BlockAuth>
                <HeaderAuth>
                  <IconSvg
                    width={123}
                    border="unset"
                    mr="0"
                    ml="0"
                    padding="0"
                    height={30}
                    src={IconBlomobilAuth}
                  />
                </HeaderAuth>
                <BackgroundAuth>
                  <EditProfilePage />
                </BackgroundAuth>
              </BlockAuth>
            </PrivateRoute>
            <PrivateRoute path={PRIVATE_ROUTE.STORE}>
              <BlockAuth>
                <HeaderAuth>
                  {sizeWindow.width <= size.xs ? (
                    <IconSvg
                      width={123}
                      border="unset"
                      mr="0"
                      ml="0"
                      padding="0"
                      height={30}
                      src={IconBlomobilWhite}
                    />
                  ) : (
                    <IconSvg
                      width={123}
                      border="unset"
                      mr="0"
                      ml="0"
                      padding="0"
                      height={30}
                      src={IconBlomobilAuth}
                    />
                  )}
                </HeaderAuth>
                <BackgroundAuth>
                  <StorePage />
                </BackgroundAuth>
              </BlockAuth>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
