import { Button, Space } from "antd";
import React, { Fragment, useState } from "react";
import {
  IconCreditCard,
  IconFileTick,
  IconMakePayment,
  IconPickupDelivery,
  IconReceivePayment,
  IconReleasePayemnt,
} from "../../../../assets/images/blimobil/orderHistory";
import { IconSvgCustom, ITitle, IText } from "../../../../components";
import styled from "styled-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import ModalReleasePayment from "./ModalReleasePayment";

const NextDivider = styled.div`
  width: 2px;
  background-color: ${(props) => (props.bg ? props.bg : "transparent")};
  flex: 1;
`;

const listHistory = [
  {
    icon: IconMakePayment,
    title: "Order Placed",
    des: "25 May 2022",
    isShowNext: true,
    bgStep: "#0D3E9A",
    isPayment: false,
  },
  {
    icon: IconCreditCard,
    title: "Make Payment",
    des: "Unsuccessful payment",
    isShowNext: true,
    bgStep: "#FA9494",
    isPayment: false,
  },
  {
    icon: IconFileTick,
    title: "Verify Payment",
    des: "Blimobil is verifying this payment",
    isShowNext: true,
    bgStep: "#0D3E9A",
    isPayment: false,
  },
  {
    icon: IconPickupDelivery,
    title: "Pick-up/Delivery",
    des: "Order is in delivery process. Please update status to complete order",
    isShowNext: true,
    bgStep: "#0D3E9A",
    isPayment: false,
  },
  {
    icon: IconReceivePayment,
    title: "Release Payment",
    des: "Blimobil is processing on the payment",
    isShowNext: true,
    bgStep: "#0D3E9A",
    isPayment: true,
  },
  {
    icon: IconReceivePayment,
    title: "Receive Payment",
    des: "Please update the payment status to complete the order",
    isShowNext: false,
    bgStep: "#0D3E9A",
    isPayment: false,
  },
];

export default function StepHistoryOrder() {
  const [active, setActive] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const colorStep = (active, isStep, bgStep, keyActive) => {
    if (active) {
      return "#6191EC";
    }
    if (isStep) {
      return bgStep;
    }
    return "#EEEEEE";
  };

  const onHandleReleasePayment = (event) => {
    event.stopPropagation();
    setIsModalVisible(true);
  };

  const itemOrderHistory = ({
    icon,
    title,
    des,
    isShowNext,
    isActive = false,
    id,
    bgStep,
    isPayment,
  }) => (
    <div
      onClick={() => active < 4 && setActive(id)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        gap: 12,
        minHeight: 80,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: 6,
          minHeight: 80,
        }}
      >
        <IconSvgCustom
          component={icon}
          width={15}
          height={15}
          border="unset"
          bg={colorStep(isActive, id === active, bgStep)}
          padding="10"
          radius="0"
        />
        {isShowNext && <NextDivider bg={id < active ? "#6191EC" : "#EEEEEE"} />}
      </div>
      <div>
        <IText strong>{title}</IText>
        <br />
        <IText fSize={11} color="#8E8C94">
          {isActive ? "25 May 2022" : des}
        </IText>
        {isPayment && active === 4 && (
          <Button
            icon={<ArrowRightOutlined style={{ fontSize: 12 }} />}
            onClick={onHandleReleasePayment}
            style={{
              margin: "12px 0px",
              background: "#50BDEA",
              color: "white",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Release Payment
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Fragment>
      <Space size={4} direction="vertical">
        {listHistory.map((item, index) =>
          itemOrderHistory({ ...item, id: index, isActive: index < active })
        )}
      </Space>
      <ModalReleasePayment
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </Fragment>
  );
}
