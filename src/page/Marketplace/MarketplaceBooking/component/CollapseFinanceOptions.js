import { Row, Col, Collapse, Divider, Space } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { BankOutlineSvg, DeliveryorPickupSvg, InStorePickupSvg, LocationSvg, ShippingMethodSvg } from "../../../../assets/images/blimobil";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../../callbacks/marketplaceCallback";
import UIColor from "../../../../colors";
import { Box, CollapseStyled, IText, ITextBlack, ITitle } from "../../../../components";
import { FINANCE_OPTIONS, SHIPPING_METHOD } from "../../../../consts/Enum";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { ContentInformation } from "../MarketplaceBooking.styles";
import Icon from "@ant-design/icons";

const { Panel } = Collapse;

export default function CollapseFinanceOptions() {
  // select
  const marketplaceBooking = useSelector(selectMarketBooking());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();

  const financeOptionsPayment = () => {
    if (marketplaceBooking.financeOptions === FINANCE_OPTIONS.PERSONAL_LOAN) {
      return (
        <Fragment>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <IText>Finance Company</IText>
                <ITitle>Gaumata</ITitle>
              </Space>
              <Divider style={{ margin: "24px 0px" }} dashed />
              <IText
                style={{ cursor: "pointer" }}
                strong
                color={UIColor.blue._5}
              >
                View Contract
              </IText>
            </Col>
          </Row>
        </Fragment>
      );
    }
    if (marketplaceBooking.financeOptions === FINANCE_OPTIONS.PAY_IN_FULL) {
      return (
        <Fragment>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <ITitle>Pay in Full</ITitle>
                <IText fSize={12} color={UIColor.blue._6}>Pay 100% to Blimobil</IText>
              </Space>
              <Divider style={{ margin: "24px 0px" }} dashed />
              <IText
                style={{ cursor: "pointer" }}
                strong
                color={UIColor.blue._5}
              >
                View Contract
              </IText>
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  return (
    <CollapseStyled defaultActiveKey={[]} expandIconPosition="end" ghost>
      <Panel
        header={
          <Box justify="flex-start" gap={12}>
          <Icon component={BankOutlineSvg} />
          <ITitle fSize={24}>Finance Options</ITitle>
          </Box>
        }
        key="1"
      >
        <ContentInformation style={{ marginTop: 24 }}>
          {financeOptionsPayment()}
        </ContentInformation>
      </Panel>
    </CollapseStyled>
  );
}
