import React, { Fragment, useState } from "react";
import { Drawer, Menu } from "antd";
import { TagSituation } from "../Topbar/Topbar.styles";
import { toUpper, startCase } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Box, ITitle } from "../../components";
import { CloseOutlined } from "@ant-design/icons";
import { device, size, TYPE_USER } from "../../consts/Enum";
import appActions from "@iso/redux/app/actions";
import SidebarMenuCustom from "./SidebarMenuCustom";
import { optionAdmin, optionDealer, optionFinance, optionSupplier } from "./options";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

const { changeCurrent, changeOpenKeys } = appActions;

const MenuStyled = styled(Menu)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media ${device.xs} {
    &.ant-menu-vertical {
      border: unset;
    }
  }
`;

export default function DrawerSlidebar({ visibleDrawer, setVisibleDrawer }) {
  const windowScreen = useWindowSize();
  const { current } = useSelector((state) => state.App);
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();

  const onClose = () => {
    setVisibleDrawer(false);
  };

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    setVisibleDrawer(false);
  }

  const renderListMenu = (options) =>
    options.map((singleOption) => (
      <SidebarMenuCustom
        key={singleOption.key}
        current={current}
        isOnClick={isLoggedIn === TYPE_USER.DEALER}
        singleOption={singleOption}
        onCallback={(key) => {
          dispatch(changeCurrent([key]));
          setVisibleDrawer(false);
        }}
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
            <Box
              style={{ width: "100%" }}
              items={windowScreen.width < size.xs ? "start" : "center"}
              direction="column"
              gap={12}
            >
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
    <Drawer
      title={
        <Box justify="space-between" style={{ width: "100%" }}>
          <TagSituation>
            <span>{toUpper(isLoggedIn)}</span>
          </TagSituation>
          <CloseOutlined onClick={onClose} style={{ fontSize: 18 }} />
        </Box>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visibleDrawer}
      getContainer={false}
    >
      <MenuStyled
        onClick={isLoggedIn !== TYPE_USER.DEALER && handleClick}
        style={{
          gap: isLoggedIn === TYPE_USER.DEALER ? 24 : 0,
        }}
        openKeys={[]}
        selectedKeys={current}
      >
        {listMenuItem()}
      </MenuStyled>
    </Drawer>
  );
}
