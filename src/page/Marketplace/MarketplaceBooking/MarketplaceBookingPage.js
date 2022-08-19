import { CheckOutlined } from "@ant-design/icons";
import { Col, Popover, Row, Steps } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../callbacks/marketplaceCallback";
import UIColor from "../../../colors";
import { Box, IText, PageHeaderCustom } from "../../../components";
import {
  FINANCE_OPTIONS,
  SHIPPING_METHOD,
  TYPE_PAGE,
} from "../../../consts/Enum";
import { selectMarketBooking } from "../../../reselects/marketplaceSelector";
import MarketplaceBookingInformation from "./component/MarketplaceBookingInformation";
import MarketplacePayment from "./component/MarketplacePayment";
import OrderPlaced from "./component/OrderPlaced";
import PaymentMade from "./component/PaymentMade";
import { Content, DotStep } from "./MarketplaceBooking.styles";

const { Step } = Steps;

export default function MarketplaceBookingPage() {
  const location = useLocation();
  const { car } = location.state;
  // select
  const marketplaceBooking = useSelector(selectMarketBooking());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();

  const customDot = (dot, { status, index }) => (
    <DotStep active={index <= marketplaceBooking.step}>
      {index < marketplaceBooking.step ? <CheckOutlined /> : index + 1}
    </DotStep>
  );

  const content = (key) => {
    if (key === 0) {
      return <MarketplaceBookingInformation car={car} />;
    }
    if (key === 1) {
      return <MarketplacePayment car={car} />;
    }
    if (key === 2) {
      return <OrderPlaced car={car} />;
    }
    if (key === 3) {
      return <PaymentMade car={car} />;
    }
  };

  useEffect(() => {
    return ()=> updateMarketplaceBooking({
      step: 0,
      shippingMethod: SHIPPING_METHOD.LOCAL_DELIVERY,
      financeOptions: FINANCE_OPTIONS.PAY_IN_FULL,
      mediaConact: [],
    });
  }, []);

  return (
    <div>
      <PageHeaderCustom type={TYPE_PAGE.DETAIL} title="MAKE ORDER" />
      <Content>
        <Row gutter={[24, 24]}>
          <Col
            offset={2}
            xl={20}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box style={{ maxWidth: 480, padding: "0px 24px", width: "100%" }}>
              <Steps
                // onChange={(idx) => updateMarketplaceBooking({ step: idx })}
                current={marketplaceBooking.step}
                progressDot={customDot}
              >
                <Step
                  title={
                    <IText strong fSize={11} color={UIColor.gray._4}>
                      Information
                    </IText>
                  }
                />
                <Step
                  title={
                    <IText strong fSize={11} color={UIColor.gray._4}>
                      Make Payment
                    </IText>
                  }
                />
                <Step
                  title={
                    <IText strong fSize={11} color={UIColor.gray._4}>
                      Order Placed
                    </IText>
                  }
                />
              </Steps>
            </Box>
          </Col>
          <Col
            offset={marketplaceBooking.step >= 2 ? 6 : 2}
            xl={marketplaceBooking.step >= 2 ? 12 : 20}
          >
            <Fragment>{content(marketplaceBooking.step)}</Fragment>
          </Col>
        </Row>
      </Content>
    </div>
  );
}
