import { Button, Col, Collapse, Divider, Row, Space } from "antd";
import React, { Fragment } from "react";
import {
  Box,
  ButtonCustom,
  CollapseStyled,
  IText,
  ITextBlack,
  ITitle,
} from "../../../../components";
import Icon from "@ant-design/icons";
import {
  BankOutlineSvg,
  BankSvg,
  BriefcaseAltSvg,
  DeliveryorPickupSvg,
  InStorePickupSvg,
  LocationSvg,
  OrderDetailMarketplaceSvg,
  ShippingMethodSvg,
} from "../../../../assets/images/blimobil";
import {
  CardSelected,
  CheckCard,
  ContentInformation,
} from "../MarketplaceBooking.styles";
import OrderDetail from "./OrderDetail";
import UIColor from "../../../../colors";
import DealerInfomation from "./DealerInfomation";
import MakePaymentSvg from "../../../../assets/images/blimobil/orderHistory/MakePaymentSvg";
import { useSelector } from "react-redux";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import {
  CreateMarketplaceBookingCallback as createMarketplaceBookingCallback,
  UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback,
} from "../../../../callbacks/marketplaceCallback";
import { FINANCE_OPTIONS, SHIPPING_METHOD } from "../../../../consts/Enum";
import { selectFetchingMarketplace } from "../../../../reselects/fetchingSelector";

const { Panel } = Collapse;

export default function MarketplacePayment({ car }) {
  // select
  const marketplaceBooking = useSelector(selectMarketBooking());
  const isFetching = useSelector(selectFetchingMarketplace());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();
  const createMarketplaceBooking = createMarketplaceBookingCallback();

  const updateBooking = (data) => updateMarketplaceBooking({ ...data });

  const shippingMethodPayment = () => {
    if (marketplaceBooking.shippingMethod === SHIPPING_METHOD.LOCAL_DELIVERY) {
      return (
        <Fragment>
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              style={{
                fontSize: 13,
                color: UIColor.blue._3,
                fontWeight: 600,
              }}
              type="text"
            >
              EDIT
            </Button>
          </div>
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
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              style={{
                fontSize: 13,
                color: UIColor.blue._3,
                fontWeight: 600,
              }}
              type="text"
            >
              EDIT
            </Button>
          </div>
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

  const onHandleManagePurchase = () =>
    createMarketplaceBooking(
      {
        car: car,
        paymentOption:
          marketplaceBooking.financeOptions === FINANCE_OPTIONS.PAY_IN_FULL
            ? "1"
            : "2",
        platformFee: 0,
        financeCode: marketplaceBooking?.financeCode
      },
      () => updateBooking({ step: 2 })
    );

  const financeOptionsPayment = () => {
    if (marketplaceBooking.financeOptions === FINANCE_OPTIONS.PERSONAL_LOAN) {
      return (
        <Fragment>
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              style={{
                fontSize: 13,
                color: UIColor.blue._3,
                fontWeight: 600,
              }}
              type="text"
            >
              EDIT
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <IText>Finance Company</IText>
                <ITitle>{marketplaceBooking.financeLabel}</ITitle>
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
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              style={{
                fontSize: 13,
                color: UIColor.blue._3,
                fontWeight: 600,
              }}
              type="text"
            >
              EDIT
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <ITitle>Pay in Full</ITitle>
                <IText fSize={12} color={UIColor.blue._6}>
                  Pay 100% to Blimobil
                </IText>
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
    <Row gutter={[24, 24]}>
      <Col xl={12}>
        <div style={{ margin: "24px 0px" }}>
          <Box justify="flex-start" gap={12}>
            <Icon component={OrderDetailMarketplaceSvg} />
            <ITitle fSize={24}>Order Details</ITitle>
          </Box>
        </div>
        <ContentInformation>
          <OrderDetail data={car} />
        </ContentInformation>
      </Col>
      <Col xl={12}>
        <div style={{ margin: "24px 0px" }}>
          <Box justify="flex-start" gap={12}>
            <Icon
              style={{ color: UIColor.gray._5 }}
              component={MakePaymentSvg}
            />
            <ITitle fSize={24}>Payment Method</ITitle>
          </Box>
        </div>
        <ContentInformation>
          <Row>
            <Col span={24}>
              <CardSelected isActive={true}>
                <Box justify="space-between" items="center">
                  <Space size={12}>
                    <Icon
                      style={{
                        color: UIColor.blue._12,
                        width: 36,
                        height: 36,
                      }}
                      component={BankSvg}
                    />
                    <Space size={0} direction="vertical">
                      <ITitle>Bank Transfer</ITitle>
                      <IText fSize={12} color={UIColor.gray._8}>
                        It can take 2-5 business days
                      </IText>
                    </Space>
                  </Space>
                  <CheckCard isActive={true} />
                </Box>
              </CardSelected>
            </Col>
          </Row>
        </ContentInformation>
        <div style={{ margin: "24px 0px" }}>
          <CollapseStyled
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            ghost
          >
            <Panel
              header={
                <Box justify="flex-start" gap={12}>
                  <Icon component={ShippingMethodSvg} />
                  <ITitle fSize={24}>Shipping Method</ITitle>
                </Box>
              }
              key="1"
            >
              <ContentInformation style={{ paddingTop: 10, marginTop: 24 }}>
                {shippingMethodPayment()}
              </ContentInformation>
            </Panel>
          </CollapseStyled>
        </div>
        <div style={{ margin: "24px 0px" }}>
          <Box justify="flex-start" gap={12}>
            <Icon component={BankOutlineSvg} />
            <ITitle fSize={24}>Finance Options</ITitle>
          </Box>
        </div>
        <ContentInformation style={{ paddingTop: 10, marginTop: 24 }}>
          {financeOptionsPayment()}
        </ContentInformation>
        <div style={{ margin: "24px 0px" }}>
          <Box justify="flex-start" gap={12}>
            <Icon component={BriefcaseAltSvg} />
            <ITitle fSize={24}>Dealer Information</ITitle>
          </Box>
        </div>
        <ContentInformation style={{ padding: "15px 30px 30px 30px" }}>
          <DealerInfomation />
        </ContentInformation>
      </Col>
      <Col span={24}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <ButtonCustom
            height={52}
            color={UIColor.primary}
            width={192}
            bgColor={UIColor.gray._11}
            isClipPath={true}
            hiddenBorder={true}
            onClick={() => updateBooking({ step: 0 })}
          >
            BACK
          </ButtonCustom>
          <ButtonCustom
            height={52}
            width={192}
            loading={isFetching}
            bgColor={UIColor.primary}
            isClipPath={true}
            onClick={onHandleManagePurchase}
          >
            MAKE PAYMENT
          </ButtonCustom>
        </div>
      </Col>
    </Row>
  );
}
