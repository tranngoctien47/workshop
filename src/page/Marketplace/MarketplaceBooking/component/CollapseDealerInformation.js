import { Row, Col, Collapse, Divider, Space } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BankOutlineSvg,
  BriefcaseAltSvg,
  DeliveryorPickupSvg,
  InStorePickupSvg,
  LocationSvg,
  ShippingMethodSvg,
} from "../../../../assets/images/blimobil";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../../callbacks/marketplaceCallback";
import UIColor from "../../../../colors";
import {
  Box,
  CollapseStyled,
  IText,
  ITextBlack,
  ITitle,
} from "../../../../components";
import { FINANCE_OPTIONS, SHIPPING_METHOD } from "../../../../consts/Enum";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { ContentInformation } from "../MarketplaceBooking.styles";
import Icon from "@ant-design/icons";
import DealerInfomation from "./DealerInfomation";

const { Panel } = Collapse;

export default function CollapseDealerInformation() {
  // select
  const marketplaceBooking = useSelector(selectMarketBooking());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();

  return (
    <CollapseStyled defaultActiveKey={[]} expandIconPosition="end" ghost>
      <Panel
        header={
          <Box justify="flex-start" gap={12}>
            <Icon component={BriefcaseAltSvg} />
            <ITitle fSize={24}>Dealer Information</ITitle>
          </Box>
        }
        key="1"
      >
        <ContentInformation style={{ marginTop: 24 }}>
          <DealerInfomation isEdit={false}/>
        </ContentInformation>
      </Panel>
    </CollapseStyled>
  );
}
