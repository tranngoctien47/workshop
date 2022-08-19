import { Button, Col, Divider, Image, List, Row, Select, Space } from "antd";
import React, { Fragment, useState } from "react";
import {
  Box,
  ButtonCustom,
  IText,
  ITextBlack,
  ITitle,
  ListCustom,
  UploadList,
} from "../../../../components";
import Icon, { CaretDownOutlined, PaperClipOutlined } from "@ant-design/icons";
import {
  DeliveryorPickupSvg,
  ImageCarousel,
  InStorePickupSvg,
  LocationSvg,
  OrderDetailMarketplaceSvg,
  ShippingMethodSvg,
  StopwatchSvg,
  LocalDeliveryCheckedSvg,
  BankSvg,
  BankOutlineSvg,
  BriefcaseAltSvg,
  MapBooking,
} from "../../../../assets/images/blimobil";
import {
  CardSelected,
  CheckCard,
  ContentInformation,
} from "../MarketplaceBooking.styles";
import { textEmpty, validateIsBorderBottom } from "../../../../utils/common";
import UIColor from "../../../../colors";
import { SelectField } from "../../../../components/Form/form.style";
import { useSelector } from "react-redux";
import { selectMarketBooking } from "../../../../reselects/marketplaceSelector";
import { UpdateMarketplaceBookingCallback as updateMarketplaceBookingCallback } from "../../../../callbacks/marketplaceCallback";
import { FINANCE_OPTIONS, SHIPPING_METHOD } from "../../../../consts/Enum";
import ShippingMethod from "./ShippingMethod";
import FinanceOptions from "./FinanceOptions";
import OrderDetail from "./OrderDetail";
import DealerInfomation from "./DealerInfomation";

const data1 = [
  {
    lable: "Subtotal",
    value: "IDR 90.100",
  },
  {
    lable: "Total",
    value: "IDR 90.100",
  },
];

export default function MarketplaceBookingInformation({car}) {
  // select
  const marketplaceBooking = useSelector(selectMarketBooking());

  // callback
  const updateMarketplaceBooking = updateMarketplaceBookingCallback();

  const updateBooking = (data) => updateMarketplaceBooking({ ...data });

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
          <OrderDetail data={car}/>
        </ContentInformation>
      </Col>
      <Col xl={12}>
        <div style={{ margin: "24px 0px" }}>
          <Box justify="flex-start" gap={12}>
            <Icon component={ShippingMethodSvg} />
            <ITitle fSize={24}>Shipping Method</ITitle>
          </Box>
        </div>
        <ContentInformation>
          <ShippingMethod />
        </ContentInformation>
        <div style={{ margin: "24px 0px" }}>
          <Box justify="flex-start" gap={12}>
            <Icon component={BankOutlineSvg} />
            <ITitle fSize={24}>Finance Options</ITitle>
          </Box>
        </div>
        <ContentInformation>
          <FinanceOptions />
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 24,
          }}
        >
          <ButtonCustom
            height={52}
            width={192}
            bgColor={UIColor.primary}
            isClipPath={true}
            onClick={()=>updateBooking({step: 1})}
          >
            CONTINUE
          </ButtonCustom>
        </div>
      </Col>
    </Row>
  );
}
