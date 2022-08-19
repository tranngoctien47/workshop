import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space } from "antd";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import UIColor from "../../../../colors";
import { ButtonCustom, IText, ITitle } from "../../../../components";
import TextFieldForm from "../../../../components/Form/TextFieldForm";
import { BoxPasswordContain } from "./component.style";
import useWindowSize from "../../../../hooks/useWindowSize";
import { size } from "../../../../consts/Enum";

export default function ModalChangePassword({ visible, setVisible }) {
  const sizeWindow = useWindowSize();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupRes(schemaSignUp),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    },
  });


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
      width={800}
      onCancel={handleCancel}
    >
      <div style={{ padding: 24, width: "100%", margin: "24px 0px" }}>
        <Row gutter={[12, 24]}>
          <Col xs={24} xl={12}>
            <IText fSize={sizeWindow.width < size.xs ? 24 : 32 }>Change Password</IText>
            <BoxPasswordContain>
              <IText fSize={14}>Password must contain:</IText>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Space>
                  <CheckOutlined />
                  <IText>At least 8 characters.</IText>
                </Space>
                <Space>
                  <CheckOutlined />
                  <IText>Contains a number.</IText>
                </Space>
              </div>
            </BoxPasswordContain>
          </Col>
          <Col xs={24} xl={12}>
            <form>
              <Row gutter={[12, 24]}>
                <Col span={24}>
                  <TextFieldForm
                    required={true}
                    name="oldPassword"
                    label="Password"
                    placeholder="Inupt password"
                    errors={errors}
                    controlForm={control}
                  />
                </Col>
                <Col span={24}>
                  <TextFieldForm
                    required={true}
                    name="newPassword"
                    label="Change Password"
                    placeholder="Inupt change password"
                    errors={errors}
                    controlForm={control}
                  />
                </Col>
                <Col span={24}>
                  <ButtonCustom
                    style={{marginTop: 8}}
                    bgColor={UIColor.primaryBtnSuccess}
                    isClipPath={true}
                  >
                    Save
                  </ButtonCustom>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
