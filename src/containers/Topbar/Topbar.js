import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Space, Tooltip } from "antd";
import appActions from "@iso/redux/app/actions";
import TopbarUser from "./TopbarUser";
import TopbarWrapper, { TagSituation } from "./Topbar.styles";
import UIColor from "../../colors";
import { IconSvg } from "@iso/components/ScrumBoard/IconSvg/IconSvg";
import { IconBlomobil } from "../../assets/images/blimobil";
import { useHistory } from "react-router";
import { toUpper } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import { size } from "../../consts/Enum";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar({ visibleDrawer, setVisibleDrawer }) {
  const navigate = useHistory();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const screenWindow = useWindowSize();
  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.topbarTheme
  );
  const { collapsed, openDrawer } = useSelector((state) => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(
    () => dispatch(toggleCollapsed()),
    [dispatch]
  );
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: UIColor.bgHeader,
    position: "fixed",
    width: "100%",
    height: 64,
  };

  const ButtonCollapsed = () => (
    <div className="isoLeft">
      <button
        className={
          isCollapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
        }
        style={{ color: customizedTheme.textColor }}
        onClick={handleToggle}
      />
    </div>
  );

  const WidgetLeftHeader = () => (
    <Space size={18}>
      <Tooltip title="Trang chủ">
        <IconSvg
          onClick={() => navigate.replace("/dashboard")}
          width={screenWindow < size.xs ? 106 : 123}
          border="unset"
          mr="0"
          ml="0"
          padding="0"
          height={30}
          src={IconBlomobil}
        />
      </Tooltip>
      {screenWindow.width >= size.sm && (
        <TagSituation>
          <span>{toUpper(isLoggedIn)}</span>
        </TagSituation>
      )}
    </Space>
  );

  return (
    <TopbarWrapper>
      <Header style={styling} className="isomorphicTopbar">
        <WidgetLeftHeader />
        <Space>
          <TopbarUser
            visibleDrawer={visibleDrawer}
            setVisibleDrawer={setVisibleDrawer}
          />
        </Space>
      </Header>
    </TopbarWrapper>
  );
}
