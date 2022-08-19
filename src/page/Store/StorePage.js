import { Col, Divider, Row, Select, Skeleton, Space, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CountrySvg,
  StoreAddressSvg,
  UserSvg,
} from "../../assets/images/blimobil";
import UIColor from "../../colors";
import { ButtonCustom, IText, ITitle } from "../../components";
import SelectForm from "../../components/Form/SelectForm";
import TextFieldForm from "../../components/Form/TextFieldForm";
import { BoxTriangle, TextDealer } from "../Auth/Auth.style";
import { coutries } from "./data";
import { BlockStore } from "./Store.styles";
import Icon, { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectFetchingMerchant } from "../../reselects/fetchingSelector";
import {
  CreateMerchantCallback as createMerchantCallback,
  GetMerchantDetailCallback as getMerchantDetailCallback,
} from "../../callbacks/merchantCallback";
import RouteName from "../../routeName";
import { selectMerchantDetail } from "../../reselects/merchantSelector";
import { isEmpty } from "lodash";
import authAction from "@iso/redux/auth/actions";
import useWindowSize from "../../hooks/useWindowSize";
import { size } from "../../consts/Enum";

const { login } = authAction;

export default function StorePage() {
  const history = useHistory();
  const [phoneCode, setPhoneCode] = useState("+65");
  const windowSize = useWindowSize();

  // select
  const dispatch = useDispatch();
  const idStore = useSelector((state) => state.Auth.idStore);
  const isFetching = useSelector(selectFetchingMerchant());
  const merchantData = useSelector(selectMerchantDetail());

  // callback
  const createMerchant = createMerchantCallback();
  const getMerchantDetail = getMerchantDetailCallback();

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        country:idStore ? merchantData?.country : null,
        phone:idStore ? merchantData?.phone : null,
        contactName:idStore ? merchantData?.contactName : null,
        addressStore:idStore ? merchantData?.addressStore: null,
      };
    }, [merchantData]),
    // resolver: yupRes(schemaSignUp),
  });

  const onSubmit = (data) => {
    createMerchant &&
      createMerchant({ ...data, phoneCode }, () => {
        const tokenLocal = localStorage.getItem("id_token");
        const idStoreLocal = localStorage.getItem("id_store");
        const idUserLocal = localStorage.getItem("id_user");
        dispatch(login(tokenLocal, idStoreLocal, idUserLocal));
      });
  };

  useEffect(() => {
    if (idStore) {
      getMerchantDetail && getMerchantDetail(idStore);
    }
  }, [idStore]);

  useEffect(() => {
    if (!isEmpty(merchantData)) {
      setPhoneCode(merchantData.phoneCode);
    }
    if(idStore){
      reset(merchantData);
    }
  }, [merchantData]);

  const goBack = () => history.goBack();

  const onChangePhoneCode = (key) => setPhoneCode(key);

  return (
    <BlockStore mWidth={826}>
      <Space size={14} style={{ cursor: "pointer" }} onClick={goBack}>
        <ArrowLeftOutlined />
        <TextDealer>Back</TextDealer>
      </Space>
      <Space direction="vertical">
        <ITitle fSize={windowSize.width < size.xs ? 32 : 80}>
          {idStore ? "Store Information" : "Set up your store"}
        </ITitle>
        <ITitle color={UIColor.gray._5} fSize={16}>
          Tell us more about your store
        </ITitle>
      </Space>
      <Divider dashed />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Skeleton loading={isFetching} paragraph={{ rows: 6 }}>
          <Row gutter={[14, 14]}>
            <Col span={24}>
              <SelectForm
                isDetail={idStore}
                prefix={
                  <Icon
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                    component={CountrySvg}
                  />
                }
                required={true}
                name="country"
                label="Country"
                placeholder="Select Country"
                errors={errors}
                dataSelect={coutries}
                controlForm={control}
              />
            </Col>
            <Col span={24}>
              <TextFieldForm
                addonBefore={
                  <Select value={phoneCode} onChange={onChangePhoneCode}>
                    {coutries.map((item) => (
                      <Select.Option key={item.dial_code}>
                        {`${item.flag}  ${item.dial_code}`}
                      </Select.Option>
                    ))}
                  </Select>
                }
                isDetail={idStore}
                required={true}
                name="phone"
                label="Store Phone Number"
                placeholder="123 4567 8910"
                errors={errors}
                controlForm={control}
              />
            </Col>
            <Col span={24}>
              <TextFieldForm
                prefix={
                  <Icon
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                    component={UserSvg}
                  />
                }
                isDetail={idStore}
                required={true}
                name="contactName"
                label="Contact name"
                placeholder="Input Contact name"
                errors={errors}
                controlForm={control}
              />
            </Col>
            <Col span={24}>
              <TextFieldForm
                prefix={
                  <Icon
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                    component={StoreAddressSvg}
                  />
                }
                isDetail={idStore}
                required={true}
                name="addressStore"
                label="Store Address"
                placeholder="Input Store Address"
                errors={errors}
                controlForm={control}
              />
            </Col>
            {!idStore && (
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
                    loading={isFetching}
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
                    REQUEST STORE
                  </ButtonCustom>
                </div>
              </Col>
            )}
          </Row>
        </Skeleton>
      </form>
    </BlockStore>
  );
}
