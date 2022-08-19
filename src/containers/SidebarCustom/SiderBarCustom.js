import React, { Fragment, useCallback } from "react";
import { Layout, Menu, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "@iso/components/utility/customScrollBar";
import { optionDealer, optionAdmin, optionSupplier, optionFinance } from "./options";
import appActions from "@iso/redux/app/actions";
import SidebarMenuCustom from "./SidebarMenuCustom";
import { TYPE_USER } from "../../consts/Enum";
import { Box, ITitle } from "../../components";
import { startCase } from "lodash";
import UIColor from "../../colors";

const { Sider } = Layout;
const { changeCurrent, changeOpenKeys } = appActions;

const styleMenu = {
  background: "#EEEEEE",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function SiderBarCustom() {
  const dispatch = useDispatch();
  const { height, openKeys, current } = useSelector((state) => state.App);
  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
  }

  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      (key) => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }

  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const renderListMenu = (options) =>
    options.map((singleOption) => (
      <SidebarMenuCustom
        key={singleOption.key}
        current={current}
        isOnClick={isLoggedIn === TYPE_USER.DEALER}
        singleOption={singleOption}
        onCallback={(key)=> dispatch(changeCurrent([key]))}
      />
    ));

  const listMenuItem = () => {
    if (isLoggedIn === TYPE_USER.ADMIN) {
      return renderListMenu(optionAdmin);
    }
    if (isLoggedIn === TYPE_USER.SUPPLIER) {
      return renderListMenu(optionSupplier);
    }
    if (isLoggedIn === TYPE_USER.DEALER) {
      return Object.keys(optionDealer).map((key, index) => {
        return (
          <Fragment key={key}>
            <Box style={{ width: "100%" }} direction="column" gap={12}>
              <ITitle style={{ textTransform: "uppercase" }} fSize={11}>
                {startCase(key)}
              </ITitle>
              <div style={{ width: "100%" }}>
                {renderListMenu(optionDealer[key])}
              </div>
              {index < Object.keys(optionDealer).length - 1 && (
                <div style={{ border: "1px dashed #BBBABF", width: "100%" }} />
              )}
            </Box>
          </Fragment>
        );
      });
    }
    if (isLoggedIn === TYPE_USER.FINANCE){
      return renderListMenu(optionFinance);
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible={true}
      width={100}
      style={{
        overflow: "auto",
        height: height - 110,
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 46,
        zIndex: 1,
      }}
    >
      <Scrollbars style={{ height: height - 110 }}>
        <Menu
          onClick={ isLoggedIn !== TYPE_USER.DEALER && handleClick}
          style={{
            ...styleMenu,
            gap: isLoggedIn === TYPE_USER.DEALER ? 24 : 0,
          }}
          openKeys={[]}
          selectedKeys={current}
        //   onOpenChange={onOpenChange}
        >
          {listMenuItem()}
        </Menu>
      </Scrollbars>
    </Sider>
  );
}
