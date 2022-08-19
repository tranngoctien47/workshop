import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Menu from "@iso/components/uielements/menu";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Typography } from "antd";
import styled from "styled-components";
import Icon from "@ant-design/icons";
import { IText } from "../../components";
import { useDispatch } from "react-redux";
import appActions from "@iso/redux/app/actions";
import { device } from "../../consts/Enum";

const SubMenu = Menu.SubMenu;
const { Text } = Typography;
const { Item } = Menu;

const BoxItemMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 8px;

  @media ${device.xs} {
    justify-content: start;
    align-items: center;
    flex-direction: row;
    gap: 12px;
    padding: 0px;
  }
`;
const MenuItem = styled(Item)`
  height: 72px !important;
  width: 100%;
  &.ant-menu-item-selected {
    background-color: #0d3e9a !important;
  }
  @media ${device.xs} {
    height: 40px !important;
  }
`;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};

const { changeCurrent } = appActions;

export default React.memo(function SidebarMenuCustom({
  singleOption,
  submenuStyle,
  submenuColor,
  current,
  isOnClick = false,
  onCallback,
  ...rest
}) {
  let match = useRouteMatch();
  const dispatch = useDispatch();
  const { key, label, icon, children } = singleOption;
  const url = stripTrailingSlash(match.url);

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={icon} />
            <span className="nav-text">
              <IntlMessages id={label} />
            </span>
          </span>
        }
        {...rest}
      >
        {children.map((child) => {
          const linkTo = child.withoutDashboard
            ? `/${child.key}`
            : `${url}/${child.key}`;
          return (
            <Menu.Item style={submenuStyle} key={child.key}>
              <Link style={submenuColor} to={linkTo}>
                <IntlMessages id={child.label} />
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  }

  return (
    <MenuItem
      onClick={() => isOnClick && onCallback(key)}
      key={key}
      {...rest}
      style={{
        background: current[0] === key ? "#0D3E9A" : "unset",
      }}
    >
      <Link to={`${url}/${key}`}>
        <BoxItemMenu>
          <Icon
            component={icon}
            width={18}
            height={18}
            style={{ color: current[0] === key ? "white" : "#555555" }}
          />
          <IText
            fSize={9}
            color={current[0] === key ? "white" : "#8E8C94"}
            style={{ lineHeight: "normal", marginLeft: 0 }}
          >
            {label}
          </IText>
        </BoxItemMenu>
      </Link>
    </MenuItem>
  );
});
