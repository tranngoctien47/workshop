  import { Col, Row, Space, Image, Divider } from "antd";
import React from "react";
import { DeliveryorPickupSvg, ImageCarousel, LocationSvg, StopwatchSvg } from "../../../../assets/images/blimobil";
import { Box, ImageCustom, IText, ITextBlack, ITitle } from "../../../../components";
import Icon from "@ant-design/icons";
import UIColor from "../../../../colors";
import { nameCar, formatCurrency } from "../../../../utils/common";

export default function OrderDetail({data}) {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Box justify="space-between" gap={12}>
          <Space>
            <ImageCustom
              style={{ border: "1px solid #D2D1D4", padding: 12 }}
              src={data?.car?.thumb}
              width={120}
              height={80}
            />
            <Space size={6} direction="vertical">
              <ITitle fSize={16}>{nameCar(data)}</ITitle>
              <Space size={12}>
                <ITextBlack fSize={12}>
                  Store: <span style={{ fontWeight: 600 }}>MAXINDO</span>
                </ITextBlack>
                <Box gap={2}>
                  <Icon component={LocationSvg} />
                  <ITextBlack fSize={12}>{data.location}</ITextBlack>
                </Box>
              </Space>
            </Space>
          </Space>
          <div style={{ width: 100, textAlign: "right" }}>
            <IText style={{ width: 100 }} color="black" fSize={14}>
              {`IDR ${formatCurrency(data.sellingPrice)}`}
            </IText>
          </div>
        </Box>
      </Col>
      <Col span={24}>
        <div style={{ border: "1px solid #D2D1D4" }}>
          <Box
            style={{ padding: "8px", borderBottom: "1px solid #D2D1D4" }}
            justify="space-between"
            items="center"
          >
            <ITextBlack>Subtotal</ITextBlack>
            <ITextBlack strong fSize={14}>
              {`IDR ${formatCurrency(data.sellingPrice)}`}
            </ITextBlack>
          </Box>
          <Box
            style={{ padding: "8px" }}
            justify="space-between"
            items="center"
          >
            <ITextBlack>Total</ITextBlack>
            <ITitle color={UIColor.orange._4} fSize={24}>
              {`IDR ${formatCurrency(data.sellingPrice)}`}
            </ITitle>
          </Box>
        </div>
      </Col>
      <Col span={24}>
        <Divider style={{ margin: 0 }} dashed />
      </Col>
      <Col span={24}>
        <Space size={12} direction="vertical">
          <Box gap={14} justify="flex-start">
            <Icon
              style={{ color: UIColor.blue._3 }}
              component={DeliveryorPickupSvg}
            />
            <Space direction="vertical" size={0}>
              <IText strong color={UIColor.blue._3}>
                Delivery or Pickup
              </IText>
              <ITextBlack fSize={12}>
                Track the progress of your order in real time.
              </ITextBlack>
            </Space>
          </Box>
          <Box gap={14} justify="flex-start">
            <Icon component={StopwatchSvg} />
            <Space direction="vertical" size={0}>
              <IText strong color={UIColor.blue._3}>
                Reservation Time
              </IText>
              <ITextBlack fSize={12}>
                Within <strong>48 hours</strong> after your booking has been
                confirmed.
              </ITextBlack>
            </Space>
          </Box>
        </Space>
      </Col>
    </Row>
  );
}
