import { UploadOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Select, Space } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import {
  CompanyRegistrationNoSvg,
  CountrySvg,
  StoreAddressSvg,
} from "../../../assets/images/blimobil";
import UIColor from "../../../colors";
import { ButtonCustom, IText, ITitle, UploadList } from "../../../components";
import SelectForm from "../../../components/Form/SelectForm";
import { BoxTriangle, TextDealer } from "../../Auth/Auth.style";
import { coutries } from "../../Store/data";
import { BlockStore } from "../../Store/Store.styles";
import Icon from "@ant-design/icons";
import TextFieldForm from "../../../components/Form/TextFieldForm";

export default function EditProfilePage() {
  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupRes(schemaSignUp),
  });

  const onSubmit = (data) => {};

  return (
    <BlockStore mWidth={826}>
      <Space size={14}>
        <BoxTriangle />
        <TextDealer>Dealer</TextDealer>
      </Space>
      <Space direction="vertical">
        <ITitle fSize={80}>Set up your account</ITitle>
        <ITitle color={UIColor.gray._5} fSize={16}>
          Tell us more about your company
        </ITitle>
      </Space>
      <Divider dashed />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[40, 24]}>
          <Col span={6}>
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
                width="194px"
                height="194px"
                listFile={[]}
                multiple={false}
                maxLength={1}
              />
            </Space>
          </Col>
          <Col span={18}>
            <Fragment>
              <Row gutter={[14, 14]}>
                <Col span={24}>
                  <TextFieldForm
                    required={true}
                    prefix={
                      <Icon
                        style={{ paddingLeft: 8, paddingRight: 8 }}
                        component={CompanyRegistrationNoSvg}
                      />
                    }
                    name="companyRegistrationNo"
                    label="Company Registration No."
                    placeholder="e.g. CO12345"
                    errors={errors}
                    controlForm={control}
                  />
                </Col>
                <Col span={24}>
                  <SelectForm
                    prefix={
                      <Icon
                        style={{ paddingLeft: 8, paddingRight: 8 }}
                        component={CountrySvg}
                      />
                    }
                    required={true}
                    name="nationality"
                    label="Nationality"
                    placeholder="Select Nationality"
                    errors={errors}
                    dataSelect={coutries}
                    controlForm={control}
                  />
                </Col>
                <Col span={24}>
                  <TextFieldForm
                    addonBefore={
                      <Select defaultValue="ID">
                        {coutries.map((item) => (
                          <Select.Option key={item.key}>
                            {item.emoji}
                          </Select.Option>
                        ))}
                      </Select>
                    }
                    required={true}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="123 4567 8910"
                    errors={errors}
                    controlForm={control}
                  />
                </Col>
                <Col span={24}>
                  <TextFieldForm
                    required={true}
                    prefix={
                      <Icon
                        style={{ paddingLeft: 8, paddingRight: 8 }}
                        component={StoreAddressSvg}
                      />
                    }
                    name="address"
                    label="Address"
                    placeholder="(Optional)"
                    errors={errors}
                    controlForm={control}
                  />
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: 36,
                    }}
                  >
                    <div
                      style={{
                        width: 190,
                        height: 54,
                        background: "#FF8B34",
                        position: "relative",
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
                        marginRight: 20,
                      }}
                      htmlType="submit"
                      width={190}
                    >
                      START PLATFORM
                    </ButtonCustom>
                  </div>
                </Col>
              </Row>
            </Fragment>
          </Col>
        </Row>
      </form>
    </BlockStore>
  );
}
