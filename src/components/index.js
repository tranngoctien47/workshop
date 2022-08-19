import React from "react";
import notification from "./Notification";
import ColorChoser from "./ColorChoser";
import EditableComponent from "./EditableComponent";
import styled from "styled-components";
import { Avatar, Button, Collapse, Image, List, Typography } from "antd";
import PageHeaderCustom from "./PageHeaderCustom";
import DescriptionsTable from "./DescriptionsTable";
import CarouselCustom from "./CarouselCustom";
import CardCompetitors from "./CardCompetitors";
import UploadList from "./Upload/UploadList";
import Icon, { UserOutlined } from "@ant-design/icons";
import { ListChats } from "./ChatCustom";
import { ImageError } from "../assets/images/blimobil";

export const ButtonCustom = styled(Button)`
  &.ant-btn {
    background-color: ${(props) => (props.bgColor ? props.bgColor : "#50BDEA")};
    color: ${(props) => (props.color ? props.color : "white")} !important;
    text-transform: uppercase;
    height: ${(props) => (props.height ? props.height : 42)}px;
    width: ${(props) => (props.width ? `${props.width}px` : "100%")};
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: ${(props) => (props.rounded ? props.rounded : 0)}px;
    clip-path: ${(props) =>
      props.isClipPath
        ? "polygon(0 0, 95% 0%, 100% 25%, 100% 50%, 100% 100%, 8% 100%, 0% 80%, 0% 20%)"
        : "unset"};
    border: ${(props) => (!props.hiddenBorder ? "" : "unset")};
    :hover {
      background-color: ${(props) =>
        props.bgColor ? props.bgColor : "#50BDEA"};
      border-color: ${(props) => (props.bgColor ? props.bgColor : "#50BDEA")};
      color: white;
      opacity: 0.5;
    }
    :focus {
      background-color: ${(props) =>
        props.bgColor ? props.bgColor : "#50BDEA"};
      border-color: ${(props) => (props.bgColor ? props.bgColor : "#50BDEA")};
      color: white;
      opacity: 0.5;
    }
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.items ? props.items : "center")};
  gap: ${(props) => (props.gap ? props.gap : 8)}px;
`;

export const IText = styled(Typography.Text)`
  &.ant-typography {
    color: ${(props) => (props.color ? props.color : "#444444")} !important;
  }
  font-size: ${(props) => (props.fSize ? props.fSize : 12)}px;
  opacity: ${(props) => (props.enable ? 0 : 1)};
  font-family: "Poppins";
  font-weight: 400;
`;

export const ITextBlack = styled(IText)`
  &.ant-typography {
    color: black !important;
  }
`;

export const ITitle = styled(Typography.Text)`
  &.ant-typography {
    color: ${(props) => (props.color ? props.color : "#222222")};
  }
  font-size: ${(props) => (props.fSize ? props.fSize : 13)}px;
  font-weight: 600;
  opacity: ${(props) => (props.enable ? 0 : 1)};
  font-family: "Poppins";
`;

export const IconSvgCustom = styled(Icon)`
  padding: ${(props) => (props.padding ? props.padding : "5")}px;
  background-color: ${(props) => (props.bg ? props.bg : "transparent")};
  cursor: pointer;
  border: ${(props) => (props.border ? props.border : "1px dashed #a8aabd")};
  border-radius: ${(props) => (props.radius ? props.radius : "5px")};
  vertical-align: middle;
`;

export const ImageCustom = (props) =>
  props?.src ? <Image {...props} /> : <Image {...props} src={ImageError} />;

export const AvatarCustom = (props) => (
  <Avatar {...props} icon={<UserOutlined />} />
);

export const ListCustom = styled(List)`
  &.ant-list-grid .ant-col > .ant-list-item {
    margin-bottom: 0px !important;
  }
`;

export const CollapseStyled = styled(Collapse)`
  &.ant-collapse-icon-position-end > .ant-collapse-item > .ant-collapse-header {
    padding: 0px !important;
  }
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0px !important;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px !important;
  }
`;

export const LineCar = styled.div`
  height: 2px;
  background: -webkit-linear-gradient(
    left,
    rgb(80, 189, 234) 0%,
    rgb(80, 189, 234) 10%,
    rgb(80, 189, 234) 50%,
    rgba(0, 0, 0, 0) 95%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
`;

export {
  notification,
  ColorChoser,
  EditableComponent,
  PageHeaderCustom,
  DescriptionsTable,
  CarouselCustom,
  CardCompetitors,
  UploadList,
  ListChats
};
