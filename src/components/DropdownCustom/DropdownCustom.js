import { Menu } from "antd";
import styled from "styled-components";

export const MenuCustom = styled(Menu)`
  &.ant-dropdown-menu {
    padding: 16px 0px;
  }
`;

export const DividerCustom = styled.div`
  margin: 0px 30px;
  border: 1px dashed #c1d5fb;
  border-color: ${props => props.borderColor ? props.borderColor : "#c1d5fb" };
`;

export const MenuItemCustom = styled(Menu.Item)`
  &.ant-dropdown-menu-item {
    padding: 12px 28px;
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => (props.color ? props.color : "#222222")};
  }
`;