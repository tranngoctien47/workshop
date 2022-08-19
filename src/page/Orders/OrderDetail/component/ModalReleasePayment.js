import { Col, Modal, Row, Space } from "antd";
import React from "react";
import UIColor from "../../../../colors";
import { ButtonCustom, IText, ITitle } from "../../../../components";
import { DividerCustom } from "../../../../components/DropdownCustom/DropdownCustom";
import { BoxDes } from "./ModalReleasePayment.styles";
import Icon from "@ant-design/icons";
import { BankSvg } from "../../../../assets/images/blimobil";

export default function ModalReleasePayment({ visible, setVisible }) {
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      footer={null}
      width={560}
      onCancel={handleCancel}
    >
      <div style={{ padding: 24, width: "100%", margin: "24px 0px" }}>
        <Row gutter={[12, 12]}>
          <Col span={24} style={{ textAlign: "center", width: "100%" }}>
            <ITitle fSize={24}>Release Payment</ITitle>
          </Col>
          <Col span={24} style={{ textAlign: "center", width: "100%" }}>
            <IText fSize={14}>
              Please send the amount shown to the banking details below.
              <br />
              Once it’s done, please click on “Paid Already” to confirm.
            </IText>
          </Col>
        </Row>
        <div style={{ marginTop: "32px" }}>
          <Row gutter={[12, 20]}>
            <Col span={24}>
              <ITitle
                style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}
                copyable={{ text: "PO12345699" }}
              >
                Order ID: PO12345699
              </ITitle>
            </Col>
            <Col span={24}>
              <BoxDes>
                <IText>Amount</IText>
                <ITitle fSize={24} color={UIColor.orange._5}>
                  IDR 63,700
                </ITitle>
              </BoxDes>
            </Col>
            <Col span={24}>
              <DividerCustom borderColor="#D2D1D4" style={{ margin: 0 }} />
            </Col>
            <Col span={24}>
              <BoxDes>
                <Space size={24}>
                  <Icon style={{width: 38, height: 38}} component={BankSvg} />
                  <Space size={0} direction="vertical">
                    <ITitle>Bank Transfer</ITitle>
                    <IText color="#A5A3A9">It can take 2-5 business days</IText>
                  </Space>
                </Space>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: "5px solid #295EC2",
                    borderRadius: "50%",
                  }}
                />
              </BoxDes>
            </Col>
            <Col span={24}>
              <ITitle
                style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                Bank Account
              </ITitle>
            </Col>
            <Col span={24}>
              <BoxDes>
                <IText>Account Holder</IText>
                <ITitle>Dealer Name</ITitle>
              </BoxDes>
              <BoxDes isHiddenBorderTop={true}>
                <IText>Bank Name</IText>
                <ITitle>International Bank of Indonesia</ITitle>
              </BoxDes>
              <BoxDes isHiddenBorderTop={true}>
                <IText>City</IText>
                <ITitle>Jakarta</ITitle>
              </BoxDes>
              <BoxDes isHiddenBorderTop={true}>
                <IText>Bank Account No.</IText>
                <ITitle copyable={{ text: "IDB1232085455555" }}>
                  IDB1232085455555
                </ITitle>
              </BoxDes>
            </Col>
            <Col span={24} style={{ textAlign: "center", width: "100%" }}>
              <IText fSize={12} color="red">
                Remember to check the numbers carefully and include the{" "}
                <strong>Order ID</strong> in your transfer’s note.
              </IText>
            </Col>
            <Col span={10} offset={2}>
              <ButtonCustom onClick={handleCancel} bgColor={UIColor.primary} isClipPath={true}>
                PAID ALREADY
              </ButtonCustom>
            </Col>
            <Col span={10}>
              <ButtonCustom
                color={UIColor.primary}
                hiddenBorder={true}
                bgColor="#EEEEEE"
                isClipPath={true}
                onClick={handleCancel}
              >
                CANCEL
              </ButtonCustom>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}
