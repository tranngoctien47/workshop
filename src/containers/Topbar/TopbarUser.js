import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import userpic from "@iso/assets/images/user1.png";
import authAction from "@iso/redux/auth/actions";
import {
  Avatar,
  Space,
  Dropdown,
  Typography,
  Badge,
  Menu,
} from "antd";
import { DownOutlined, MenuOutlined, UpOutlined } from "@ant-design/icons";
import { IconSvg } from "../../components/ScrumBoard/IconSvg/IconSvg";
import {
  IconChat,
  IconNotification,
  IconShop,
} from "../../assets/images/blimobil";
import styled from "styled-components";
import { useHistory } from "react-router";
import RouteName from "../../routeName";
import useModalChangePassword from "../../page/Profile/Detail/hooks/useModalChangePassword";
import ModalChangePassword from "../../page/Profile/Detail/component/ModalChangePassword";
import storage from "../../utils/localStorage";
import { ListChats } from "../../components";
import useWindowSize from "../../hooks/useWindowSize";
import { size, TYPE_USER } from "../../consts/Enum";
import useDrawerChat from "../../hooks/useDrawerChat";

const MenuProfile = styled(Menu)`
  &.ant-dropdown-menu {
    padding: 16px 0px;
  }
`;

const DividerCustom = styled.div`
  margin: 0px 30px;
  border: 1px dashed #c1d5fb;
`;

const MenuItemProfile = styled(Menu.Item)`
  &.ant-dropdown-menu-item {
    padding: 12px 28px;
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => (props.color ? props.color : "#222222")};
  }
`;

const { logout } = authAction;
const { Text } = Typography;

export default function TopbarUser({ visibleDrawer, setVisibleDrawer }) {
  const screenWindow = useWindowSize();
  const idToken = useSelector((state) => state.Auth.idToken);
  const idStore = useSelector((state) => state.Auth.idStore);

  const [visibleChat, setVisibleChat, childrenDrawer, setChildrenDrawer] =
    useDrawerChat();
  const [visible, setVisibility] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useModalChangePassword();
  const dispatch = useDispatch();

  function handleVisibleChange(newVisible) {
    setVisibility(newVisible);
  }

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const hide = () => {
    setVisibility(false);
  };

  const navigate = useHistory();

  const onOpenChangePassword = () => setIsModalVisible(true);

  const onHandleMenu = ({ key }) => {
    hide();
    switch (key) {
      case "companyProfile":
        return navigate.push(RouteName.profile.profile);
      case "changePassowrd":
        return onOpenChangePassword();
      case "setUpStore":
        return navigate.push("/set-up-store");
      case "store":
        return navigate.push("/store");
      case "signOut": {
        storage.removeAccessToken();
        dispatch(logout());
        return;
      }
    }
  };

  const content = (
    <MenuProfile onClick={onHandleMenu}>
      {idToken !== TYPE_USER.ADMIN && <MenuItemProfile key="companyProfile">Company Profile</MenuItemProfile>}
      <MenuItemProfile key="changePassowrd">Change Password</MenuItemProfile>
      <DividerCustom />
      {idToken !== "admin" && (
        <Fragment>
          <MenuItemProfile
            key={idStore ? "store" : "setUpStore"}
            color={idStore ? "unset" : "#FF8B34"}
          >
            <Space>
              <IconSvg
                src={IconShop}
                width={15}
                height={15}
                border="unset"
                mr="0"
                ml="0"
                padding="0"
              />
              {idStore ? "Store" : "Setup a store"}
            </Space>
          </MenuItemProfile>
          <DividerCustom />
        </Fragment>
      )}
      <MenuItemProfile key="signOut">Sign Out</MenuItemProfile>
    </MenuProfile>
  );

  return (
    <Space size={screenWindow.width < size.xs ? 24 : 36}>
      <Space size={24}>
        <Badge size="small" dot>
          <IconSvg
            onClick={() => setVisibleChat(true)}
            width={17}
            height={17}
            border="unset"
            mr="0"
            ml="0"
            padding="0"
            src={IconChat}
          />
        </Badge>

        <Badge size="small" count={2}>
          <IconSvg
            width={16}
            height={17}
            border="unset"
            mr="0"
            ml="0"
            padding="0"
            src={IconNotification}
          />
        </Badge>
      </Space>
      <Dropdown
        overlay={content}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="bottom"
      >
        <Space size={12} style={{ cursor: "pointer" }}>
          <Avatar src={userpic} />
          {screenWindow.width >= size.xs && (
            <Fragment>
              <Text style={{ color: "white" }}>{storage.getEmailSigin()}</Text>
              {visible ? (
                <UpOutlined style={{ color: "#8c8c8c", fontSize: 12 }} />
              ) : (
                <DownOutlined style={{ color: "#8c8c8c", fontSize: 12 }} />
              )}
            </Fragment>
          )}
        </Space>
      </Dropdown>
      {screenWindow.width < size.xs && (
        <Badge size="small" dot>
          <MenuOutlined
            onClick={showDrawer}
            style={{ color: "#8c8c8c", fontSize: 16 }}
          />
        </Badge>
      )}
      <ModalChangePassword
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
      <ListChats
        visible={visibleChat}
        setVisible={setVisibleChat}
        childrenDrawer={childrenDrawer}
        setChildrenDrawer={setChildrenDrawer}
      />
    </Space>
  );
}
