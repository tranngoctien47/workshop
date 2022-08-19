import { Col, Divider, Image, Row, Space } from "antd";
import React, { useState } from "react";
import Icon, { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  CartSvg,
  DeliveryorPickupSvg,
  ImageCarousel,
  LocationSvg,
  OrderPlacedSvg,
  ReservartionTimeSvg,
  SecureYourCarSvg,
  StopwatchSvg,
} from "../../../../assets/images/blimobil";
import {
  Box,
  ButtonCustom,
  ImageCustom,
  IText,
  ITextBlack,
  ITitle,
} from "../../../../components";
import UIColor from "../../../../colors";
import { ContentInformation } from "../MarketplaceBooking.styles";
import {
  CreateMarketplaceBookingCallback as createMarketplaceBookingCallback,
  UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback,
} from "../../../../callbacks/marketplaceCallback";
import {
  selectMarketBooking,
  selectMarketplaceDetail,
  selectMarketplaceInfoOrder,
} from "../../../../reselects/marketplaceSelector";
import { useSelector } from "react-redux";
import CollapseShippingMethod from "./CollapseShippingMethod";
import CollapseFinanceOptions from "./CollapseFinanceOptions";
import CollapseDealerInformation from "./CollapseDealerInformation";
import { useHistory } from "react-router";
import RouteName from "../../../../routeName";
import { formatCurrency, nameCar, textEmpty } from "../../../../utils/common";
import { selectFetchingMarketplace } from "../../../../reselects/fetchingSelector";
import { FINANCE_OPTIONS } from "../../../../consts/Enum";

export default function OrderPlaced({ car }) {
  const history = useHistory();
  const [collapseAmout, setCollapseAmout] = useState(false);

  // select
  const marketplaceBooking = useSelector(selectMarketBooking());
  const isFetching = useSelector(selectFetchingMarketplace());
  const infoOrder = useSelector(selectMarketplaceInfoOrder());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();
  const createMarketplaceBooking = createMarketplaceBookingCallback();

  const updateBooking = (data) => updateMarketplaceBooking({ ...data });

  const onHandleColapseAmout = () => setCollapseAmout(!collapseAmout);

  const onHandleManagePurchase = () => history.push(RouteName.purchase.list);

  return (
    <Row gutter={[24, 24]}>
      <Col xl={24}>
        <Box direction="column" gap={12}>
          <Icon component={OrderPlacedSvg} />
          <ITitle fSize={24}>Order Placed</ITitle>
        </Box>
      </Col>
      <Col xl={24} style={{ textAlign: "center" }}>
        <ITextBlack>Your booking has been reserved!</ITextBlack>
      </Col>
      <Col xl={24}>
        <Divider dashed style={{ margin: "0px" }} />
      </Col>
      <Col xl={24}>
        <Box direction="column" justify="flex-start" items="start" gap={14}>
          <Box justify="flex-start" items="start" gap={16}>
            <Icon component={ReservartionTimeSvg} />
            <Space direction="vertical" size={0}>
              <IText strong color={UIColor.blue._3}>
                RESERVATION TIME
              </IText>
              <ITextBlack>
                Please complete transferring the amount within 47:59:39. After
                that time, your booking will be cancelled automatically.
              </ITextBlack>
            </Space>
          </Box>
          <Box justify="flex-start" items="start" gap={16}>
            <Icon component={SecureYourCarSvg} />
            <Space direction="vertical" size={0}>
              <IText strong color={UIColor.blue._3}>
                SECURE YOUR CAR
              </IText>
              <ITextBlack>
                If you’ve already transferred money, please click on “I’ve Paid
                Already!” button below to notify us to secure your car
              </ITextBlack>
            </Space>
          </Box>
        </Box>
      </Col>
      <Col xl={24}>
        <ContentInformation>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Box justify="space-between" gap={12}>
                <Space>
                  <ImageCustom
                    style={{ border: "1px solid #D2D1D4", padding: 12 }}
                    src={car?.car?.thumb}
                    width={120}
                    height={80}
                  />
                  <Space size={6} direction="vertical">
                    <ITitle fSize={16}>{nameCar(car)}</ITitle>
                    <Space size={12}>
                      <ITextBlack fSize={12}>
                        Store: <span style={{ fontWeight: 600 }}>MAXINDO</span>
                      </ITextBlack>
                      <Box gap={2}>
                        <Icon component={LocationSvg} />
                        <ITextBlack fSize={12}>{car.location}</ITextBlack>
                      </Box>
                    </Space>
                  </Space>
                </Space>
                <div style={{ width: 100, textAlign: "right" }}>
                  <IText style={{ width: 100 }} color="black" fSize={14}>
                    {`IDR ${formatCurrency(infoOrder?.preOrderInfo?.sellingPrice)}`}
                  </IText>
                </div>
              </Box>
            </Col>
            <Col span={24}>
              <div style={{ border: "1px solid #D2D1D4" }}>
                <Box
                  style={{ padding: "8px" }}
                  justify="space-between"
                  items="center"
                >
                  <ITextBlack>Total Amount</ITextBlack>
                  <Space>
                    <ITitle color={UIColor.orange._4} fSize={24}>
                      {`IDR ${formatCurrency(infoOrder?.preOrderInfo?.offRoadPrice)}`}
                    </ITitle>
                    {collapseAmout ? (
                      <UpOutlined onClick={onHandleColapseAmout} />
                    ) : (
                      <DownOutlined onClick={onHandleColapseAmout} />
                    )}
                  </Space>
                </Box>
                {collapseAmout && (
                  <Box
                    style={{ padding: "8px", borderTop: "1px solid #D2D1D4" }}
                    justify="space-between"
                    items="center"
                  >
                    <ITextBlack>Date</ITextBlack>
                    <ITitle fSize={14}>13 June 2022</ITitle>
                  </Box>
                )}
              </div>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: 0 }} dashed />
            </Col>
            <Col span={24}>
              <div style={{ border: "1px solid #D2D1D4" }}>
                <Box
                  style={{ padding: "8px" }}
                  justify="space-between"
                  items="center"
                >
                  <ITextBlack>Account Holder</ITextBlack>
                  <ITitle fSize={14}>{textEmpty(infoOrder?.bankInfo?.accountHolder)}</ITitle>
                </Box>
                <Box
                  style={{
                    padding: "8px",
                    borderTop: "1px solid #D2D1D4",
                    borderBottom: "1px solid #D2D1D4",
                  }}
                  justify="space-between"
                  items="center"
                >
                  <ITextBlack>Bank Name</ITextBlack>
                  <ITitle fSize={14}>{textEmpty(infoOrder?.bankInfo?.bankName)}</ITitle>
                </Box>
                <Box
                  style={{ padding: "8px" }}
                  justify="space-between"
                  items="center"
                >
                  <ITextBlack>City</ITextBlack>
                  <ITitle fSize={14}>{textEmpty(infoOrder?.bankInfo?.city)}</ITitle>
                </Box>
                <Box
                  style={{ padding: "8px", borderTop: "1px solid #D2D1D4" }}
                  justify="space-between"
                  items="center"
                >
                  <ITextBlack>Bank Account No.</ITextBlack>
                  <ITitle fSize={14} copyable>
                    {textEmpty(infoOrder?.bankInfo?.bankAccountNo)}
                  </ITitle>
                </Box>
              </div>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <IText color="red">
                Remember to check the numbers carefully and include the{" "}
                <strong>Order ID</strong> in your transfer’s note.
              </IText>
            </Col>
          </Row>
        </ContentInformation>
      </Col>
      <Col xl={24}>
        <CollapseShippingMethod />
      </Col>
      <Col xl={24}>
        <CollapseFinanceOptions />
      </Col>
      <Col xl={24}>
        <CollapseDealerInformation />
      </Col>
      <Col xl={24}>
        <Box gap={12}>
          <ButtonCustom
            height={52}
            width={192}
            bgColor={UIColor.primary}
            isClipPath={true}
            onClick={() => updateBooking({ step: 3 })}
          >
            I’VE PAID ALREADY!
          </ButtonCustom>
          <ButtonCustom
            height={52}
            width={192}
            isClipPath={true}
            hiddenBorder={true}
            bgColor={UIColor.gray._11}
            color={UIColor.blue._3}
            onClick={onHandleManagePurchase}
            loading={isFetching}
          >
            MANAGE PURCHASE
          </ButtonCustom>
        </Box>
      </Col>
    </Row>
  );
}
