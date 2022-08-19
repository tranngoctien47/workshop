import { Row, Col, Collapse, Divider, Space } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { DeliveryorPickupSvg, InStorePickupSvg, LocationSvg, ShippingMethodSvg } from "../../../../assets/images/blimobil";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../../callbacks/marketplaceCallback";
import UIColor from "../../../../colors";
import { Box, CollapseStyled, IText, ITextBlack, ITitle } from "../../../../components";
import { SHIPPING_METHOD } from "../../../../consts/Enum";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { ContentInformation } from "../MarketplaceBooking.styles";
import Icon from "@ant-design/icons";

const { Panel } = Collapse;

export default function CollapseShippingMethod() {
  // select
  const marketplaceBooking = useSelector(selectMarketBooking());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();

  const shippingMethodPayment = () => {
    if (marketplaceBooking.shippingMethod === SHIPPING_METHOD.LOCAL_DELIVERY) {
      return (
        <Fragment>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Box justify="flex-start" gap={12}>
                <Icon
                  style={{ color: UIColor.gray._10 }}
                  component={DeliveryorPickupSvg}
                />
                <IText strong>Local Delivery</IText>
              </Box>
            </Col>
          </Row>
        </Fragment>
      );
    }
    if (marketplaceBooking.shippingMethod === SHIPPING_METHOD.IN_STORE_PICKUP) {
      return (
        <Fragment>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Box justify="flex-start" gap={12}>
                <Icon
                  style={{ color: UIColor.gray._10, width: 22, height: 22 }}
                  component={InStorePickupSvg}
                />
                <IText strong>In-store Pickup</IText>
              </Box>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "0px" }} dashed />
            </Col>
            <Col span={24}>
              <Box
                justify="space-between"
                items="start"
                gap={12}
                style={{ width: "100%" }}
              >
                <Space align="start" size={14}>
                  <Icon component={LocationSvg} />
                  <Space direction="vertical" size={0}>
                    <ITitle color={UIColor.blue._3}>Maxindo Center</ITitle>
                    <ITextBlack fSize={13}>
                      1090 Adrenaline Street, Maryland District, Jakarta,
                      Indonesia
                    </ITextBlack>
                    <IText fSize={12}>Opens 8:30-18:30 (Mon-Sat)</IText>
                  </Space>
                </Space>
                <IText color={UIColor.blue._6}>~7,1 km</IText>
              </Box>
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
            <Icon component={ShippingMethodSvg} />
            <ITitle fSize={24}>Shipping Method</ITitle>
          </Box>
        }
        key="1"
      >
        <ContentInformation style={{ marginTop: 24 }}>
          {shippingMethodPayment()}
        </ContentInformation>
      </Panel>
    </CollapseStyled>
  );
}
