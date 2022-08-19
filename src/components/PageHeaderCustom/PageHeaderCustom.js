import Icon from "@ant-design/icons";
import React from "react";
import { BackSvg, CloseSvg } from "../../assets/images/blimobil";
import { PageHeaderStyled } from "./PageHeaderCustom.style";
import { useHistory } from "react-router";
import { TYPE_PAGE } from "../../consts/Enum";
import { Skeleton } from "antd";

function BackIcon({ type }) {
  return type === TYPE_PAGE.DETAIL ? (
    <Icon component={BackSvg} width={10} height={18} />
  ) : (
    <Icon component={CloseSvg} width={20} height={20} />
  );
}

export default function PageHeaderCustom({
  type,
  title = "",
  subTitle = "",
  extra = [],
  loading = false,
  isBack = false,
  onHandleBack = ()=> {},
}) {
  const navigate = useHistory();
  return (
    <PageHeaderStyled
      className="site-page-header"
      onBack={() => isBack ? onHandleBack() : navigate.go(-1)}
      title={loading ? <Skeleton.Input active={true} size="default" /> : title}
      backIcon={<BackIcon type={type} />}
      subTitle={loading ? <Skeleton.Input active={true} size="default" /> :subTitle}
      extra={extra}
    />
  );
}
