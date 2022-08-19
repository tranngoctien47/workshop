import React from "react";
import {
  BlockAction,
  BoxCard,
  ButtonAction,
  DividerCustom,
} from "./CardCompetitors.style";
import { Image, Space, Typography } from "antd";
import { CompetitorsExtra1 } from "../../assets/images/blimobil";
import { IText, ITitle } from "..";
import UIColor from "../../colors";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function CardCompetitors({
  image = "",
  name = "",
  subName = "",
  automatic = "",
  price = "",
  link = "",
  isAction = false
}) {
  return (
    <BoxCard>
      {isAction && <BlockAction>
        <Space>
          <ButtonAction>
            <DeleteOutlined style={{ color: "white", fontSize: 16 }} />
          </ButtonAction>
          <ButtonAction>
            <EditOutlined style={{ color: "white", fontSize: 16 }} />
          </ButtonAction>
        </Space>
      </BlockAction> }
      <Image src={image} width="100%" height={168} />
      <Space direction="vertical" size={0}>
        <IText fSize={14} color="black">
          {name}
        </IText>
        <IText fSize={14} color="black">
          {subName}
        </IText>
      </Space>
      <DividerCustom />
      <IText fSize={12} color={UIColor.gray}>
        {automatic}
      </IText>
      <ITitle fSize={16}>{price}</ITitle>
      <Typography.Link strong style={{ fontSize: 12 }}>
        {link}
      </Typography.Link>
    </BoxCard>
  );
}
