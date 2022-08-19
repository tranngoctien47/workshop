import { Button, Col, Row, Space } from "antd";
import React, { Fragment } from "react";
import UIColor from "../../../../colors";
import { ITextBlack } from "../../../../components";

export default function DealerInfomation({ isEdit= true}) {
  return (
    <Fragment>
      {isEdit && <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          style={{ fontSize: 13, color: UIColor.blue._3, fontWeight: 600 }}
          type="text"
        >
          EDIT
        </Button>
      </div>}
      <Row gutter={[16, 16]}>
        <Col xl={24}>
          <Space direction="vertical" size={4}>
            <ITextBlack>Name</ITextBlack>
            <ITextBlack strong fSize={14}>
              Johnathan K. Low
            </ITextBlack>
          </Space>
        </Col>
        <Col xl={24}>
          <Space direction="vertical" size={4}>
            <ITextBlack>Phone Number</ITextBlack>
            <ITextBlack strong fSize={14}>
              +81 012345678
            </ITextBlack>
          </Space>
        </Col>
        <Col xl={12}>
          <Space direction="vertical" size={4}>
            <ITextBlack>City</ITextBlack>
            <ITextBlack strong fSize={14}>
              Jakarta
            </ITextBlack>
          </Space>
        </Col>
        <Col xl={12}>
          <Space direction="vertical" size={4}>
            <ITextBlack>ZIP Code</ITextBlack>
            <ITextBlack strong fSize={14}>
              70000{" "}
            </ITextBlack>
          </Space>
        </Col>
        <Col xl={24}>
          <Space direction="vertical" size={4}>
            <ITextBlack>Address</ITextBlack>
            <ITextBlack strong fSize={14}>
              678 Katherin Street, Downtown, Jakarta, Indonesia{" "}
            </ITextBlack>
          </Space>
        </Col>
      </Row>
    </Fragment>
  );
}
