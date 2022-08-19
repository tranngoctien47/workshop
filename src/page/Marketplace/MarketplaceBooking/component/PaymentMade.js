import { Col, Divider, Image, Row, Space } from "antd";
import React, { useState } from "react";
import Icon, {
  DownOutlined,
  PaperClipOutlined,
  UpOutlined,
} from "@ant-design/icons";
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
  UploadList,
} from "../../../../components";
import UIColor from "../../../../colors";
import { ContentInformation } from "../MarketplaceBooking.styles";
import {
  CreateMarketplaceBookingCallback as createMarketplaceBookingCallback,
  UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback,
} from "../../../../callbacks/marketplaceCallback";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { useSelector } from "react-redux";
import CollapseShippingMethod from "./CollapseShippingMethod";
import CollapseFinanceOptions from "./CollapseFinanceOptions";
import CollapseDealerInformation from "./CollapseDealerInformation";
import { useHistory } from "react-router";
import RouteName from "../../../../routeName";
import { formatCurrency } from "../../../../utils/common";
import { selectFetchingMarketplace } from "../../../../reselects/fetchingSelector";
import { FINANCE_OPTIONS } from "../../../../consts/Enum";

export default function PaymentMade({ car }) {
  const history = useHistory();
  const [collapseAmout, setCollapseAmout] = useState(false);

  // select
  const marketplaceBooking = useSelector(selectMarketBooking());
  const isFetching = useSelector(selectFetchingMarketplace());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();
  const createMarketplaceBooking = createMarketplaceBookingCallback();

  const updateBooking = (data) => updateMarketplaceBooking({ ...data });

  const onHandleColapseAmout = () => setCollapseAmout(!collapseAmout);

  const componentUpload = () => (
    <ButtonCustom
      color={UIColor.gray._5}
      bgColor={UIColor.gray._11}
      icon={<PaperClipOutlined style={{ color: UIColor.gray._2 }} />}
    >
      UPLOAD
    </ButtonCustom>
  );

  const onHandleManagePurchase = () =>
    createMarketplaceBooking(
      {
        car: car,
        paymentOption:
          marketplaceBooking.financeOptions === FINANCE_OPTIONS.PAY_IN_FULL
            ? "1"
            : "2",
        financeCode: marketplaceBooking?.financeCode
      },
      () => history.push(RouteName.marketplace.list)
    );

  return (
    <Row gutter={[24, 24]}>
      <Col xl={24}>
        <Box direction="column" gap={12}>
          <Icon component={OrderPlacedSvg} />
          <ITitle fSize={24}>Payment Made</ITitle>
        </Box>
      </Col>
      <Col xl={24} style={{ textAlign: "center" }}>
        <ITextBlack>
          It might take a several time to verify the payment.
          <br />
          Please upload proof to help the process faster
        </ITextBlack>
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
                CONTACT US
              </IText>
              <ITextBlack>
                Email: contact@blimobil.co.id
                <br />
                Phone: +81-800-12-3456 | Indonesia{" "}
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
                    <ITitle fSize={16}>{car?.car?.name}</ITitle>
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
                    {`IDR ${formatCurrency(car.sellingPrice)}`}
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
                      {`IDR ${formatCurrency(car.sellingPrice)}`}
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
              <Box
                gap={24}
                direction="column"
                items="start"
                justify="flex-start"
              >
                <ITitle fSize={14} style={{ letterSpacing: 2 }}>
                  Proof Upload
                </ITitle>
                <UploadList
                  fileList={marketplaceBooking.mediaConact}
                  maxLength={1}
                  onChange={(newFileList) =>
                    updateBooking({ mediaConact: newFileList })
                  }
                  componentUpload={componentUpload}
                  isComponentUpload={true}
                  listType="text"
                />
              </Box>
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
            loading={isFetching}
            onClick={onHandleManagePurchase}
          >
            MANAGE MY CAR
          </ButtonCustom>
        </Box>
      </Col>
    </Row>
  );
}
