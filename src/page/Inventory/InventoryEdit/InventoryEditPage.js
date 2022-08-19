import {
  Col,
  Divider,
  message,
  Modal,
  Radio,
  Row,
  Skeleton,
  Space
} from "antd";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import UIColor from "../../../colors";
import {
  ButtonCustom,
  CardCompetitors,
  IText,
  ITitle,
  PageHeaderCustom,
  UploadList
} from "../../../components";
import * as C from "../../../consts/Enum";
import Icon, { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  BlockIconMenu,
  BoxPlatformFee,
  Content,
  DetailContent,
  MenuContent,
  MenuItemContent
} from "../InventoryDetail/InventoryDetail.style";
import {
  CostEstimateSvg,
  DollarSvg,
  FeatureSvg,
  ImageVideoSvg,
  CompetitorsExtraSvg,
  PublicSvg,
  SaveSvg,
  InfoCircleSvg
} from "../../../assets/images/blimobil";
import BoxCheckboxIcon from "../../../components/BoxCheckboxIcon";
import { isEqual, uniqBy } from "lodash";
import { dataCompetitorsExtra } from "../InventoryDetail/data";
import AddCompetitorsExtra from "./component/AddCompetitorsExtra";
import TextFieldForm from "../../../components/Form/TextFieldForm";
import { useForm, useWatch, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectForm from "../../../components/Form/SelectForm";
import InputColorForm from "../../../components/Form/InputColorForm";
import DatePickerForm from "../../../components/Form/DatePickerForm";
import useCategory from "./hooks/useCategory";
import RadioForm from "../../../components/Form/RadioForm";
import { dataSelectYear, parseListCode } from "../../../utils/common";
import SwitchForm from "../../../components/Form/SwitchForm";
import useLocation from "./hooks/useLocation";
import useBrand from "./hooks/useBrand";
import useModel from "./hooks/useModel";
import {
  CreateInventoryCallback as createInventoryCallback,
  GetInventoryDetailCallback as getInventoryDetailCallback,
  UpdateInventoryCallback as updateInventoryCallback
} from "../../../callbacks/inventoryCallback";
import { selectFetchingInventory } from "../../../reselects/fetchingSelector";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import RouteName from "../../../routeName";
import { selectInventoryDetail } from "../../../reselects/inventorySelector";
import moment from "moment";
import Urls from "../../../consts/Urls";

const styledSubTitle = { textTransform: "uppercase", letterSpacing: 2 };

const dataSelect = [
  {
    name: "Jack",
    key: "jack"
  },
  {
    name: "Lucy",
    key: "lucy"
  }
];

export default function InventoryEditPage() {
  const { action, id } = useParams();
  const [convenienceIds, setConvenienceIds] = useState([]);
  const [cabinIds, setCabinIds] = useState([]);
  const [safetyIds, setSafetyIds] = useState([]);
  const [lightingIds, setLightingIds] = useState([]);

  // selector
  const idStore = useSelector((state) => state.Auth.idStore);
  const isRule = useSelector((state) => state.Auth.idToken);
  const isFetching = useSelector(selectFetchingInventory());
  const dataInventory = useSelector(selectInventoryDetail());

  // callback
  const createInventory = createInventoryCallback();
  const getInventoryDetail = getInventoryDetailCallback();
  const updateInventory = updateInventoryCallback();

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    // resolver: yupRes(schemaSignUp),
    defaultValues: useMemo(() => {
      return {
        usageType: "0",
        plateNumber: "0",
        registrationType: "0",
        showDiscountPercent: false,
        showOriginalPrice: false,
        warrantyAvailability: false,
        serviceBookAvailability: false,
        spareKeyAvailability: false
      };
    }, [dataInventory])
  });

  const history = useHistory();

  const usageType = useWatch({ control, name: "usageType" });
  const isUsageNewCar = usageType === C.CAR_USAGE_VALUE.NEW;
  const usageCardBrand = useWatch({ control, name: "brandId" });

  const refCarDetail = useRef();
  const refPhotoVideo = useRef();
  const refPriceShipping = useRef();
  const refFeature = useRef();
  const refCompetitorsExtra = useRef();
  const [keyMenu, setKeyMenu] = useState(-1);

  const [dataCategory, loading] = useCategory([
    C.CATEGORY_TYPE.CAR_VARIANT,
    C.CATEGORY_TYPE.ENGINE,
    C.CATEGORY_TYPE.TRANSMISSION,
    C.CATEGORY_TYPE.FUEL_TYPE,
    C.CATEGORY_TYPE.SEATING_CAPACITY,
    C.CATEGORY_TYPE.CAR_FEATURE_CONVENIENCE,
    C.CATEGORY_TYPE.CAR_FEATURE_CABIN,
    C.CATEGORY_TYPE.CAR_FEATURE_SAFETY,
    C.CATEGORY_TYPE.CAR_FEATURE_LIGHTING
  ]);

  const [location, loadingLocation] = useLocation();
  const [listBrand, loadingBrand] = useBrand();
  const [listModel, loadingModel, reloadUseModel] = useModel(
    usageCardBrand,
    listBrand
  );

  const listFormItem = [
    {
      name: "vin",
      label: "VIN #",
      required: true,
      placeholder: "Enter VIN number",
      type: "input"
    },
    {
      name: "locationId",
      label: "Location",
      required: true,
      placeholder: "Select Location",
      dataSelect: location,
      type: "select",
      loading: loadingLocation
    },
    {
      name: "brandId",
      label: "Car Brand",
      required: true,
      placeholder: "Select a brand",
      dataSelect: listBrand,
      type: "select",
      loading: loadingBrand,
      callback: () => {
        setValue("modelId", undefined);
      }
    },
    {
      name: "modelId",
      label: "Car Model",
      required: true,
      placeholder: "Select a model",
      dataSelect: listModel,
      type: "select",
      disabled: !usageCardBrand,
      loading: loadingModel
    },
    {
      name: "year",
      label: "Car Year",
      required: true,
      placeholder: "Select car year",
      dataSelect: dataSelectYear(1998),
      type: "select"
    },
    {
      name: "variantId",
      required: true,
      label: "Car Variant",
      placeholder: "Select car variant",
      dataSelect: dataCategory[0],
      type: "select",
      loading: loading
    },
    {
      name: "engineId",
      label: "Engine",
      required: false,
      placeholder: "Select Location",
      dataSelect: dataCategory[1],
      type: "select",
      loading: loading
    },
    {
      name: "transmissionId",
      label: "Transmission",
      required: false,
      placeholder: "Select car variant",
      dataSelect: dataCategory[2],
      type: "select",
      loading: loading
    },
    {
      name: "fuelTypeId",
      required: true,
      label: "Fuel Type",
      placeholder: "Select fuel type",
      dataSelect: dataCategory[3],
      type: "select",
      loading: loading
    },
    {
      name: "seatingCapacityId",
      required: true,
      label: "Seating capacity",
      placeholder: "Select fuel type",
      dataSelect: dataCategory[4],
      type: "select",
      loading: loading
    },
    {
      name: "color",
      required: true,
      label: "Car Color",
      placeholder: "Select primary color",
      type: "color"
    },
    {
      name: "secondaryColor",
      required: true,
      label: "Secondary Color",
      placeholder: "Select secondary color",
      type: "color"
    }
  ];

  const menu = [
    {
      icon: CostEstimateSvg,
      title: "Car Details",
      ref: refCarDetail
    },
    {
      icon: ImageVideoSvg,
      title: "Photos",
      ref: refPhotoVideo
    },
    {
      icon: DollarSvg,
      title: "Price & Shipping",
      ref: refPriceShipping
    },
    {
      icon: FeatureSvg,
      title: "Features",
      ref: refFeature
    }
    // {
    //   icon: CompetitorsExtraSvg,
    //   title: "Competitors Extra",
    //   ref: refCompetitorsExtra,
    // },
  ];

  const onChekedItemFeatures = (key, isChecked, array, callback) => {
    let result = [];
    if (isChecked) {
      result = [...array].filter((el) => el !== key);
    } else {
      result = [...array, key];
    }
    callback(uniqBy(result));
  };

  const executeScroll = (myRef, idx) => {
    myRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    setKeyMenu(idx);
  };

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
            disabled={item.disabled}
            controlForm={control}
            callback={item.callback}
          />
        );
      case "color":
        return (
          <InputColorForm
            required={item.required}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            errors={errors}
            controlForm={control}
          />
        );
    }
  };

  const onSubmit = (data) => {
    if (action === C.ACTION_PAGE.CREATE) {
      const newData = {
        ...data,
        shippingMethodIds: [],
        convenienceIds: convenienceIds,
        cabinIds: cabinIds,
        safetyIds: safetyIds,
        lightingIds: lightingIds,
        color: data.color,
        colorId: "categoryType-000022"
      };
      createInventory &&
        createInventory(newData, () =>
          history.replace(RouteName.inventory.list)
        );
    } else {
      updateInventory &&
        updateInventory(
          {
            usageType: data.usageType,
            vin: data.vin,
            locationId: data.locationId,
            brandId: data.brandId,
            modelId: data.modelId,
            year: data.year,
            variantId: data.variantId,
            fuelTypeId: data.fuelTypeId,
            seatingCapacityId: data.seatingCapacityId,
            color: data.color,
            secondaryColor: data.secondaryColor || "",
            warrantyAvailability: data.warrantyAvailability,
            serviceBookAvailability: data.serviceBookAvailability,
            spareKeyAvailability: data.spareKeyAvailability,
            photos: data.photos || [],
            sellingPrice: data.sellingPrice,
            originalPrice: data.originalPrice,
            showOriginalPrice: data.showOriginalPrice,
            showDiscountPercent: data.showDiscountPercent,
            shippingMethodIds: data.shippingMethodIds,
            convenienceIds: convenienceIds,
            cabinIds: cabinIds,
            safetyIds: safetyIds,
            lightingIds: lightingIds,
            engineId: data.engineId,
            transmissionId: data.transmissionId,
            BPKBDate: data.BPKBDate,
            STNKDate: data.STNKDate,
            milleage: data.milleage,
            registrationDate: data.registrationDate,
            plateNumber: data.plateNumber,
            registrationType: data.registrationType,
            bbnCost: data.bbnCost
          },
          id
        );
    }
  };

  const onSubmitPublic = (data) => {
    const newData = {
      ...data,
      shippingMethodIds: [],
      convenienceIds: convenienceIds,
      cabinIds: cabinIds,
      safetyIds: safetyIds,
      lightingIds: lightingIds,
      color: data.color,
      colorId: "categoryType-000022",
      status: C.CAR_STATUS_KEY.AVAILABLE
    };
    createInventory &&
      createInventory(newData, () => history.replace(RouteName.inventory.list));
  };

  const onBackSubmit = (data) => {
    if (!isEqual(data, dataInventory)) {
      return Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Click save to save",
        okText: "Save",
        cancelText: "Cancel",
        onCancel: (close) => {
          close();
          history.go(-1);
        },
        onOk: (close) => {
          updateInventory &&
            updateInventory(
              {
                usageType: data.usageType,
                vin: data.vin,
                locationId: data.locationId,
                brandId: data.brandId,
                modelId: data.modelId,
                year: data.year,
                variantId: data.variantId,
                fuelTypeId: data.fuelTypeId,
                seatingCapacityId: data.seatingCapacityId,
                color: data.color,
                secondaryColor: data.secondaryColor || "",
                warrantyAvailability: data.warrantyAvailability,
                serviceBookAvailability: data.serviceBookAvailability,
                spareKeyAvailability: data.spareKeyAvailability,
                photos: data.photos || [],
                sellingPrice: data.sellingPrice,
                originalPrice: data.originalPrice,
                showOriginalPrice: data.showOriginalPrice,
                showDiscountPercent: data.showDiscountPercent,
                shippingMethodIds: data.shippingMethodIds,
                convenienceIds: convenienceIds,
                cabinIds: cabinIds,
                safetyIds: safetyIds,
                lightingIds: lightingIds,
                engineId: data.engineId,
                transmissionId: data.transmissionId,
                BPKBDate: data.BPKBDate,
                STNKDate: data.STNKDate,
                milleage: data.milleage,
                registrationDate: data.registrationDate,
                plateNumber: data.plateNumber,
                registrationType: data.registrationType
              },
              id
            );
          close();
        }
      });
    }
    return history.go(-1);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current.valueOf() > moment().subtract(1, "day");
  };

  useEffect(() => {
    if (id) {
      getInventoryDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      reset(dataInventory);
      setCabinIds([...(dataInventory.cabinIds || [])]);
      setConvenienceIds([...(dataInventory.convenienceIds || [])]);
      setSafetyIds([...(dataInventory.safetyIds || [])]);
      setLightingIds([...(dataInventory.lightingIds || [])]);
    }
  }, [dataInventory]);

  const subTitle = `${dataInventory.year} ${
    dataInventory?.brand?.name || "Honda"
  } ${dataInventory?.engine?.name || "Accord"} ${
    dataInventory?.variant?.name || "PREMIUM"
  } ${dataInventory?.seatingCapacity?.name || "2WD 1.8"}`;

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeaderCustom
          isBack={action === C.ACTION_PAGE.UPDATE}
          onHandleBack={handleSubmit(onBackSubmit)}
          type={C.TYPE_PAGE.CREATE}
          title={
            action === C.ACTION_PAGE.CREATE ? "ADD CAR" : dataInventory?.vin
          }
          subTitle={action === C.ACTION_PAGE.CREATE ? "" : subTitle}
          extra={
            <Space size={0}>
              <ButtonCustom
                htmlType="submit"
                type="text"
                height={52}
                rounded={0}
                loading={isFetching}
                bgColor={UIColor.blue._5}
                icon={<Icon component={SaveSvg} width={32} height={32} />}
              >
                {action === C.ACTION_PAGE.CREATE ? "SAVE AS DRAFT" : "SAVE"}
              </ButtonCustom>
              {action === C.ACTION_PAGE.CREATE && idStore && (
                <ButtonCustom
                  onClick={handleSubmit(onSubmitPublic)}
                  type="text"
                  htmlType="submit"
                  height={52}
                  rounded={0}
                  bgColor={UIColor.orange._5}
                  icon={<Icon component={PublicSvg} width={32} height={32} />}
                >
                  SAVE & PUBLISH
                </ButtonCustom>
              )}
            </Space>
          }
        />
        <Content>
          <MenuContent>
            <Skeleton loading={isFetching} paragraph={{ rows: 6 }}>
              <Space size={12} direction="vertical">
                {menu.map((item, idx) => (
                  <MenuItemContent
                    isActive={keyMenu === idx}
                    key={idx}
                    onClick={() => executeScroll(item.ref, idx)}
                  >
                    <BlockIconMenu id="block-icon-menu">
                      <Icon
                        style={{
                          color: keyMenu === idx ? "#0D3E9A" : "#666666"
                        }}
                        component={item.icon}
                      />
                    </BlockIconMenu>
                    <ITitle color={keyMenu === idx ? "#0D3E9A" : "#4A4754"}>
                      {item.title}
                    </ITitle>
                  </MenuItemContent>
                ))}
              </Space>
            </Skeleton>
          </MenuContent>
          <DetailContent>
            <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
              <div id="car-details" ref={refCarDetail}>
                <Space size={12} align="center">
                  <Icon
                    component={CostEstimateSvg}
                    style={{ color: "#666666" }}
                  />
                  <ITitle fSize={24}>Car Details</ITitle>
                </Space>
                <div style={{ marginTop: 24, padding: "0px 24px" }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} xl={20}>
                      <Space direction="vertical" size={20}>
                        <IText fSize={14}>Usage Type</IText>
                        <RadioForm
                          name="usageType"
                          listRadio={
                            isRule === C.TYPE_USER.SUPPLIER
                              ? [
                                  {
                                    label: "New Car",
                                    key: "0"
                                  }
                                ]
                              : [
                                  {
                                    label: "New Car",
                                    key: "0"
                                  },
                                  {
                                    label: "Used Car",
                                    key: "1"
                                  }
                                ]
                          }
                          errors={errors}
                          controlForm={control}
                        />
                      </Space>
                    </Col>
                    {listFormItem.map((item) => (
                      <Col xs={12} xl={10}>
                        {componentFormItem(item.type, item)}
                      </Col>
                    ))}
                  </Row>
                  {isRule === C.TYPE_USER.DEALER && (
                    <div style={{ marginTop: 28 }}>
                      <ITitle style={styledSubTitle}>
                        Used car information
                      </ITitle>
                      <div style={{ margin: "28px 0px" }}>
                        <Row gutter={[20, 16]}>
                          <Col xs={12} xl={10}>
                            <TextFieldForm
                              isNumber={true}
                              disabled={isUsageNewCar}
                              required={!isUsageNewCar}
                              name="milleage"
                              label="Milleage"
                              placeholder="Input milleage range"
                              errors={errors}
                              controlForm={control}
                            />
                          </Col>
                          <Col xs={12} xl={10}>
                            <Space direction="vertical" size={24}>
                              <IText fSize={14}>
                                Plate Number (Odd or Even)
                              </IText>
                              <RadioForm
                                disabled={isUsageNewCar}
                                name="plateNumber"
                                listRadio={[
                                  {
                                    label: "Odd",
                                    key: "0"
                                  },
                                  {
                                    label: "Even",
                                    key: "1"
                                  }
                                ]}
                                errors={errors}
                                controlForm={control}
                              />
                            </Space>
                          </Col>
                          <Col xs={12} xl={10}>
                            <DatePickerForm
                              disabled={isUsageNewCar}
                              required={!isUsageNewCar}
                              name="registrationDate"
                              disabledDate={disabledDate}
                              label="Car Registration Date"
                              placeholder="Select registration date"
                              dataSelect={dataSelect}
                              errors={errors}
                              controlForm={control}
                            />
                          </Col>
                          <Col xs={12} xl={10}>
                            <Space direction="vertical" size={24}>
                              <IText fSize={14}>
                                Car Registration Type (Corporate or Personal)
                              </IText>
                              <RadioForm
                                disabled={isUsageNewCar}
                                name="registrationType"
                                listRadio={[
                                  {
                                    label: "Corporate",
                                    key: "0"
                                  },
                                  {
                                    label: "Personal",
                                    key: "1"
                                  }
                                ]}
                                errors={errors}
                                controlForm={control}
                              />
                            </Space>
                          </Col>
                          <Col xs={12} xl={10}>
                            <DatePickerForm
                              disabled={isUsageNewCar}
                              required={!isUsageNewCar}
                              name="STNKDate"
                              label="Document Expiry Date (STNK and BPKB)"
                              placeholder="Select registration date"
                              errors={errors}
                              controlForm={control}
                            />
                          </Col>
                          <Col xs={12} xl={10}>
                            <DatePickerForm
                              disabled={isUsageNewCar}
                              required={false}
                              name="BPKBDate"
                              label=""
                              placeholder="Select BPKB date"
                              errors={errors}
                              controlForm={control}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: 28 }}>
                    <ITitle style={styledSubTitle}>ADDItional</ITitle>
                    <div style={{ margin: "28px 0px" }}>
                      <Space direction="vertical" size={26}>
                        <Space size={14}>
                          <SwitchForm
                            name="warrantyAvailability"
                            required={false}
                            errors={errors}
                            controlForm={control}
                          />
                          <IText fSize={14}>Warranty availability</IText>
                        </Space>
                        <Space size={14}>
                          <SwitchForm
                            name="serviceBookAvailability"
                            required={false}
                            errors={errors}
                            controlForm={control}
                          />
                          <IText fSize={14}>Service book availability</IText>
                        </Space>
                        <Space size={14}>
                          <SwitchForm
                            name="spareKeyAvailability"
                            required={false}
                            errors={errors}
                            controlForm={control}
                          />
                          <IText fSize={14}>Spare key availability</IText>
                        </Space>
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
              <div id="photos-and-videos" ref={refPhotoVideo}>
                <Divider />
                <Space size={12} align="center">
                  <Icon
                    component={ImageVideoSvg}
                    style={{ color: "#666666", fontSize: 18 }}
                  />
                  <ITitle fSize={24}>Photos</ITitle>
                </Space>
                <div style={{ padding: "0px 24px" }}>
                  <div style={{ margin: "10px 0px 30px 0px" }}>
                    <IText>
                      Upload 8 photos of car is recommended (Ideal size is
                      1024x1024px and Max 1MB each){" "}
                    </IText>
                  </div>
                  <div style={{ margin: "28px 0px" }}>
                    <Row gutter={[20, 16]}>
                      <Col xs={24} xl={20}>
                        <Fragment>
                          <Row gutter={[20, 20]}>
                            <Controller
                              rules={{
                                required: false
                              }}
                              name="photos"
                              control={control}
                              render={({
                                field: { onChange, onBlur, value, ref }
                              }) => (
                                <UploadList
                                  maxLength={8}
                                  ref={ref}
                                  fileList={value}
                                  onBlur={onBlur}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </Row>
                        </Fragment>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div id="price-shipping" ref={refPriceShipping}>
                <Divider />
                <Space size={12} align="center">
                  <Icon component={DollarSvg} style={{ color: "#666666" }} />
                  <ITitle fSize={24}>Price & Shipping</ITitle>
                </Space>
                <div style={{ marginTop: 24, padding: "0px 24px" }}>
                  <div style={{ margin: "28px 0px" }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={12} xl={10}>
                        <TextFieldForm
                          addonBefore="IDR"
                          required={true}
                          name="sellingPrice"
                          isNumber={true}
                          label="Selling Price"
                          placeholder="Amount buyer will pay"
                          errors={errors}
                          controlForm={control}
                        />
                      </Col>
                      <Col xs={12} xl={10}>
                        {isRule === C.TYPE_USER.SUPPLIER && (
                          <TextFieldForm
                            addonBefore="IDR"
                            required={true}
                            name="bbnCost"
                            isNumber={true}
                            label="BBN Cost"
                            placeholder="Amount buyer will pay"
                            errors={errors}
                            controlForm={control}
                          />
                        )}
                      </Col>
                      <Col xs={12} xl={10}>
                        <TextFieldForm
                          addonBefore="IDR"
                          required={false}
                          isNumber={true}
                          name="originalPrice"
                          label="Original Price"
                          placeholder="Amount before sale (Optional)"
                          errors={errors}
                          controlForm={control}
                        />
                        <br />
                        <Space size={14}>
                          <SwitchForm
                            name="showOriginalPrice"
                            required={false}
                            errors={errors}
                            controlForm={control}
                          />
                          <IText fSize={14}>
                            Show Original Price on Listing
                          </IText>
                        </Space>
                      </Col>
                      <Col xs={12} xl={10}>
                        <TextFieldForm
                          addonBefore="%"
                          required={false}
                          isNumber={true}
                          name="discountPercent"
                          label="Discount (auto-calculation)"
                          placeholder=""
                          errors={errors}
                          controlForm={control}
                        />
                        <br />
                        <Space size={14}>
                          <SwitchForm
                            name="showDiscountPercent"
                            required={false}
                            errors={errors}
                            controlForm={control}
                          />
                          <IText fSize={14}>
                            Show Discount Percentage on Listing
                          </IText>
                        </Space>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Divider dashed={true} style={{ height: 2 }} />
                <div style={{ marginTop: 24, padding: "0px 24px" }}>
                  <Fragment>
                    <Space size={10} direction="vertical">
                      <IText fSize={14}>Platform Fee</IText>
                      <ITitle>IDR 3,000</ITitle>
                    </Space>
                    <div style={{ margin: "28px 0px" }}>
                      <Row gutter={[0, 16]}>
                        <Col xs={24} xl={20}>
                          <BoxPlatformFee>
                            <Space direction="vertical">
                              <Space align="baseline">
                                <Icon component={InfoCircleSvg} />
                                <ITitle>PLATFORM FEE</ITitle>
                              </Space>
                              <IText color="black">
                                <IText strong>{`3% `}</IText>of the total
                                selling price will be paid to Blimobil as a
                                Platform fee
                              </IText>
                              <IText>
                                E.g: If you create a Selling Price of IDR
                                100,000 for the car. When buyer create a
                                transaction of IDR 100,000 for Blimobil, IDR
                                97,000 will be transferred to your account,
                                while IDR 3,000 will paid for management/admin
                                fee.
                              </IText>
                            </Space>
                          </BoxPlatformFee>
                        </Col>
                      </Row>
                    </div>
                  </Fragment>
                </div>
              </div>
              <div id="features" ref={refFeature}>
                <Divider />
                <Space size={12} align="center">
                  <Icon component={FeatureSvg} style={{ color: "#666666" }} />
                  <ITitle fSize={24}>Features</ITitle>
                </Space>
                <div style={{ padding: "0px 24px" }}>
                  <div style={{ margin: "10px 0px 30px 0px" }}>
                    <IText>
                      Select features to get more attractive from buyers
                    </IText>
                  </div>
                  <Fragment>
                    <ITitle style={styledSubTitle}>Convenience</ITitle>
                    <div style={{ margin: "28px 0px" }}>
                      <Row gutter={[20, 16]}>
                        {(dataCategory[5] || []).map((item, idx) => (
                          <Col xs={12} xl={10} key={item.code}>
                            {loading ? (
                              <Skeleton.Input active />
                            ) : (
                              <BoxCheckboxIcon
                                onClick={(isActive) =>
                                  onChekedItemFeatures(
                                    item.code,
                                    isActive,
                                    convenienceIds,
                                    setConvenienceIds
                                  )
                                }
                                isCheked={convenienceIds.includes(item.code)}
                                icon={item.icon}
                                name={item.name}
                              />
                            )}
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Fragment>
                  <Fragment>
                    <ITitle style={styledSubTitle}>Cabin</ITitle>
                    <div style={{ margin: "28px 0px" }}>
                      <Row gutter={[20, 16]}>
                        {(dataCategory[6] || []).map((item, idx) => (
                          <Col xs={12} xl={10} key={item.code}>
                            <BoxCheckboxIcon
                              onClick={(isActive) =>
                                onChekedItemFeatures(
                                  item.code,
                                  isActive,
                                  cabinIds,
                                  setCabinIds
                                )
                              }
                              isCheked={cabinIds.includes(item.code)}
                              icon={item.icon}
                              name={item.name}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Fragment>
                  <Fragment>
                    <ITitle style={styledSubTitle}>Safety</ITitle>
                    <div style={{ margin: "28px 0px" }}>
                      <Row gutter={[20, 16]}>
                        {(dataCategory[7] || []).map((item, idx) => (
                          <Col xs={12} xl={10} key={item.code}>
                            <BoxCheckboxIcon
                              onClick={(isActive) =>
                                onChekedItemFeatures(
                                  item.code,
                                  isActive,
                                  safetyIds,
                                  setSafetyIds
                                )
                              }
                              isCheked={safetyIds.includes(item.code)}
                              icon={item.icon}
                              name={item.name}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Fragment>
                  <Fragment>
                    <ITitle style={styledSubTitle}>Lighting</ITitle>
                    <div style={{ margin: "28px 0px" }}>
                      <Row gutter={[20, 16]}>
                        {(dataCategory[8] || []).map((item, idx) => (
                          <Col xs={12} xl={10} key={item.code}>
                            <BoxCheckboxIcon
                              onClick={(isActive) =>
                                onChekedItemFeatures(
                                  item.code,
                                  isActive,
                                  lightingIds,
                                  setLightingIds
                                )
                              }
                              isCheked={lightingIds.includes(item.code)}
                              icon={item.icon}
                              name={item.name}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Fragment>
                </div>
              </div>
              <div
                style={{ display: "none" }}
                id="competitors-extra"
                ref={refCompetitorsExtra}
              >
                <Divider />
                <Space size={12} align="center">
                  <Icon
                    component={CompetitorsExtraSvg}
                    style={{ color: "#666666" }}
                  />
                  <ITitle fSize={24}>Competitors Extra</ITitle>
                </Space>
                <div style={{ marginTop: 24, padding: "0px 24px" }}>
                  <Row gutter={[20, 20]}>
                    <Col span={8}>
                      <AddCompetitorsExtra />
                    </Col>
                    {dataCompetitorsExtra.map((item) => (
                      <Col span={8}>
                        <CardCompetitors isAction={true} {...item} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Skeleton>
          </DetailContent>
        </Content>
      </form>
    </Fragment>
  );
}
