import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import appActions from "@iso/redux/app/actions";
import SiderBarCustom from "../SidebarCustom";
import Topbar from "../Topbar/Topbar";
import DashboardRoutes from "./DashboardRoutes";
import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";
import UIColor from "../../colors";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { RouteHiddenNav } from "../../routeName";
import { size } from "../../consts/Enum";
import DrawerSlidebar from "../SidebarCustom/DrawerSlidebar";
import useDrawer from "../../hooks/useDrawer";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();
  const { pathname } = useLocation();
  const [visibleDrawer, setVisibleDrawer] = useDrawer();

  const styles = {
    layout: { flexDirection: "row", overflowX: "hidden", padding: "64px 0 0" },
    content: {
      background: "#f1f3f6",
      position: "relative",
    },
    footer: {
      background: UIColor.bgHeader,
      textAlign: "center",
      borderTop: "1px solid #ededed",
      color: "white",
      padding: width >= size.sm ? "12px 50px" : "12px",
      fontSize: 12
    },
  };

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  const isSliderBar = React.useMemo(() => {
    return !RouteHiddenNav.some(el => pathname.includes(el));
  }, [pathname]);

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar visibleDrawer={visibleDrawer} setVisibleDrawer={setVisibleDrawer}/>
        <Layout style={styles.layout}>
          <Layout
            style={{
              minHeight: appHeight - 108,
            }}
          >
            {isSliderBar && width >= size.sm && <SiderBarCustom />}
            <Content style={{ ...styles.content, marginLeft: isSliderBar && width >= size.sm ? 102 : 0 }}>
              <DashboardRoutes />
            </Content>
          </Layout>
        </Layout>
        <Footer style={styles.footer}>
          © 2022 Blimobil Company. All rights reserved.
        </Footer>
      </Layout>
      <DrawerSlidebar visibleDrawer={visibleDrawer} setVisibleDrawer={setVisibleDrawer}/>
    </DashboardContainer>
  );
}
