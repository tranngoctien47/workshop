import { UploadOutlined } from "@ant-design/icons";
import { Col, Divider, Modal, Row, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ButtonCustom,
  IText,
  ITitle,
  UploadList,
} from "../../../../components";
import SelectForm from "../../../../components/Form/SelectForm";
import TextFieldForm from "../../../../components/Form/TextFieldForm";
import { dataSelect, listFormModalExtrar } from "../data";
import { ContentModal, HeaderModal } from "./component.style";

export default function ModalCompetiorsExtra({
  onCancel = () => {},
  visible = false,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupRes(schemaSignUp),
    defaultValues: {},
  });

  const componentFormItem = (key, item) => {
    // eslint-disable-next-line default-case
    switch (key) {
      case "input":
        return (
          <TextFieldForm
            required={item.required}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            errors={errors}
            controlForm={control}
          />
        );
      case "select":
        return (
          <SelectForm
            required={item.required}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            dataSelect={item.dataSelect}
            errors={errors}
            controlForm={control}
          />
        );
    }
  };

  return (
    <Modal
      getContainer={false}
      footer={false}
      onCancel={onCancel}
      visible={visible}
      width={700}
    >
      <ContentModal>
        <HeaderModal>
          <ITitle fSize={24}>Add A Competitor’s Car</ITitle>
        </HeaderModal>
        <Divider dashed />
        <form>
          <Row gutter={[24, 14]}>
            {listFormModalExtrar.map((item) => (
              <Col span={12}>{componentFormItem(item.type, item)}</Col>
            ))}
            <Col span={24}>
              <TextFieldForm
                required={true}
                name="competitorsName"
                label={`Competitor’s Name`}
                placeholder="e.g. Carsome"
                errors={errors}
                controlForm={control}
              />
            </Col>
            <Col span={24} style={{ width: "100%" }}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <IText fSize={14}>Car Photo</IText>
                <UploadList
                  isComponentUpload={true}
                  componentUpload={() => (
                    <Space>
                      <UploadOutlined />
                      <IText>Upload</IText>
                    </Space>
                  )}
                  width="100%"
                  height="194px"
                  listFile={[]}
                  multiple={false}
                  maxLength={1}
                />
              </Space>
            </Col>

            <Col span={24} style={{ textAlign: "center", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  marginTop:12
                }}
              >
                <div
                  style={{
                    width: 190,
                    height: 54,
                    background: "#FF8B34",
                    position: 'relative',
                  }}
                />
                <ButtonCustom
                  height={54}
                  style={{
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    zIndex: 2,
                    position: "absolute",
                    bottom: 10,
                    marginRight: 20
                  }}
                  width={190}
                >
                  Add
                </ButtonCustom>
              </div>
            </Col>
          </Row>
        </form>
      </ContentModal>
    </Modal>
  );
}
