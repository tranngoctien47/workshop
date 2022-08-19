import React, { useEffect, useMemo, useRef, useState, Fragment } from "react";
import {
  ButtonCustom,
  CarouselCustom,
  DescriptionsTable,
  IText,
  ITitle,
  PageHeaderCustom,
  CardCompetitors,
} from "../../../components";
import Icon, {
  LoadingOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  EditSvg,
  CostEstimateSvg,
  DollarSvg,
  InfoCircleSvg,
  FeatureSvg,
  CheckedSvg,
  ImageVideoSvg,
  CompetitorsExtraSvg,
} from "../../../assets/images/blimobil";
import UIColor from "../../../colors";
import {
  Badge,
  Col,
  Divider,
  Row,
  Skeleton,
  Space,
  Dropdown,
  Modal,
  Spin,
} from "antd";
import {
  BlockIconMenu,
  BoxPlatformFee,
  Content,
  DetailContent,
  MenuContent,
  MenuItemContent,
  TextStatus,
} from "./InventoryDetail.style";
import { dataCompetitorsExtra, priceShipping1 } from "./data";
import { useHistory, useParams } from "react-router";
import RouteName from "../../../routeName";
import {
  ACTION_PAGE,
  CAR_STATUS_KEY,
  CAR_STATUS_VALUE,
  TYPE_PAGE,
} from "../../../consts/Enum";
import { useSelector } from "react-redux";
import {
  selectFetchingChat,
  selectFetchingInventory,
} from "../../../reselects/fetchingSelector";
import { selectInventoryDetail } from "../../../reselects/inventorySelector";
import {
  GetInventoryDetailCallback as getInventoryDetailCallback,
  InventoryDeleteCallback as inventoryDeleteCallback,
  UpdateInventoryCallback as updateInventoryCallback,
} from "../../../callbacks/inventoryCallback";
import { camelCase } from "lodash";
import useData from "./hooks/useData";
import {
  DividerCustom,
  MenuCustom,
  MenuItemCustom,
} from "../../../components/DropdownCustom/DropdownCustom";
import {
  disabledActionCar,
  nameButtonActionCar,
  listImageURL,
  nameCar,
} from "../../../utils/common";
import storage from "../../../utils/localStorage";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";
import DetailChats from "../../../components/ChatCustom/DetailChats";

let widthCarouselRoot = 0;

export default function InventoryDetailPage() {
  const { id } = useParams();
  const refCarDetail = useRef();
  const refPhotoVideo = useRef();
  const refPriceShipping = useRef();
  const refFeature = useRef();
  const refCompetitorsExtra = useRef();
  const [keyMenu, setKeyMenu] = useState(-1);
  const navigate = useHistory();
  const [visible, setVisible] = useState(false);
  const [chatParams, setChatParams] = useState({
    itemChat: {
      car: "",
      code: ""
    },
    visible: false,
  });

  // select
  const isFetching = useSelector(selectFetchingInventory());
  const data = useSelector(selectInventoryDetail());
  const isFetchingChat = useSelector(selectFetchingChat());

  const [
    dataDescriptionsRow1,
    dataDescriptionsRow2,
    dataPriceShippingFirst,
    dataPriceShippingSecond,
    dataConvenience,
    dataCabin,
    dataSafety,
    dataLighting,
  ] = useData(data);

  // callback
  const getInventoryDetail = getInventoryDetailCallback();
  const deleteInventory = inventoryDeleteCallback();
  const updateInventory = updateInventoryCallback();
  const createChat = createChatCallback();

  const onNavigate = () =>
    navigate.push(`${RouteName.inventory.update}/${ACTION_PAGE.UPDATE}/${id}`);

  const menu = [
    {
      icon: CostEstimateSvg,
      title: "Car Details",
      ref: refCarDetail,
    },
    {
      icon: ImageVideoSvg,
      title: "Photos",
      ref: refPhotoVideo,
    },
    {
      icon: DollarSvg,
      title: "Price & Shipping",
      ref: refPriceShipping,
    },
    {
      icon: FeatureSvg,
      title: "Features",
      ref: refFeature,
    },
    // {
    //   icon: CompetitorsExtraSvg,
    //   title: "Competitors Extra",
    //   ref: refCompetitorsExtra,
    // },
  ];

  const executeScroll = (myRef, idx) => {
    myRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    setKeyMenu(idx);
  };

  useEffect(() => {
    getInventoryDetail && getInventoryDetail(id);
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const widthCarousel = useMemo(() => {
    if (refPriceShipping?.current?.clientWidth) {
      widthCarouselRoot = refPriceShipping?.current?.clientWidth - 48;
    }
    return widthCarouselRoot;
  }, [refPriceShipping?.current?.clientWidth]);

  const onConfrim = () => {
    hideModal();
    deleteInventory(id, null, () => navigate.push(RouteName.inventory.list));
  };

  const onClickMenuDropdown = ({ item, key, keyPath, domEvent }, record) => {
    domEvent.stopPropagation();
    if (key === "delete") {
      showModal();
      return;
    }
    if (key === "booked") {
      updateInventory({ status: CAR_STATUS_KEY.BOOKED }, record.code, () =>
        getInventoryDetail(id)
      );
      return;
    }
    if (key === "sold") {
      updateInventory({ status: CAR_STATUS_KEY.SOLD }, record.code, () =>
        getInventoryDetail(id)
      );
      return;
    }
    if (key === "releaseReservation") {
      updateInventory({ status: CAR_STATUS_KEY.AVAILABLE }, record.code, () =>
        getInventoryDetail(id)
      );
      return;
    }
  };

  const onChangeStatus = (e, record) => {
    e.stopPropagation();
    let status;
    if (record.status === CAR_STATUS_KEY.DRAFT) {
      status = CAR_STATUS_KEY.AVAILABLE;
    } else {
      status = CAR_STATUS_KEY.DRAFT;
    }
    updateInventory({ status: status }, record.code, () =>
      getInventoryDetail(id)
    );
  };

  const content = () => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onClickMenuDropdown({ item, key, keyPath, domEvent }, data)
      }
    >
      <MenuItemCustom>
        <ButtonCustom
          width={172}
          height={34}
          onClick={(e) => onChangeStatus(e, data)}
          disabled={disabledActionCar(data.status)}
          bgColor={
            data.status === CAR_STATUS_KEY.DRAFT
              ? UIColor.primaryBtnSuccess
              : UIColor.primaryBtnUnpublish
          }
          color={disabledActionCar(data.status) ? "black" : "white"}
        >
          {nameButtonActionCar(data.status)}
        </ButtonCustom>
      </MenuItemCustom>
      <DividerCustom />
      {data.status !== CAR_STATUS_KEY.DRAFT && (
        <Fragment>
          <MenuItemCustom
            key={
              data.status === CAR_STATUS_KEY.AVAILABLE
                ? "booked"
                : "releaseReservation"
            }
          >
            {data.status === CAR_STATUS_KEY.AVAILABLE
              ? "Booked"
              : "Release Reservation"}
          </MenuItemCustom>
          <MenuItemCustom key="sold">Sold</MenuItemCustom>
          <DividerCustom />
        </Fragment>
      )}
      <MenuItemCustom key="delete" color="red">
        Delete
      </MenuItemCustom>
    </MenuCustom>
  );

  const onCreateChat = () => {
    createChat &&
      createChat(
        {
          supplierCode: storage.getIdStore(),
          car: id,
        },
        (result) => {
          setChatParams({
            itemChat:{
              code: result._id,
              car: data
            },
            visible: true,
          });
        }
      );
  };

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false,
    });

  return (
    <div>
      <PageHeaderCustom
        type={TYPE_PAGE.DETAIL}
        title={data.vin}
        subTitle={nameCar(data)}
        loading={isFetching}
        extra={
          <Space size={8}>
            <ButtonCustom
              type="text"
              height={52}
              rounded={0}
              bgColor={UIColor.blue._5}
              onClick={onNavigate}
              icon={<Icon component={EditSvg} width={32} height={32} />}
            >
              EDIT
            </ButtonCustom>
            {isFetching ? (
              <Skeleton.Button active={true}></Skeleton.Button>
            ) : (
              <Space>
                {data.status === CAR_STATUS_KEY.DRAFT ? (
                  <TextStatus style={{ color: "#8E8C94" }}>
                    {CAR_STATUS_VALUE[data.status]}
                  </TextStatus>
                ) : (
                  <Space>
                    <Badge
                      color={
                        UIColor.status[camelCase(CAR_STATUS_VALUE[data.status])]
                      }
                    />
                    <TextStatus style={{ color: "white" }}>
                      {CAR_STATUS_VALUE[data.status]}
                    </TextStatus>
                  </Space>
                )}
              </Space>
            )}
            <Dropdown
              trigger={["click"]}
              overlay={content()}
              placement="bottomLeft"
            >
              <MoreOutlined
                style={{ fontSize: 24, color: "white", marginRight: 12 }}
              />
            </Dropdown>
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
                      style={{ color: keyMenu === idx ? "#0D3E9A" : "#666666" }}
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
                <Row gutter={[0, 16]}>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      columns={2}
                      data={dataDescriptionsRow1}
                    />
                  </Col>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      isHeader={true}
                      titleHeader="Used car information"
                      columns={2}
                      data={dataDescriptionsRow2}
                    />
                  </Col>
                </Row>
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
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} xl={22} sm={24} style={{ width: "100%" }}>
                    <div
                      style={{
                        padding: "24px",
                        border: "1px solid #EEEEEE",
                        width: widthCarousel || "50vw",
                      }}
                    >
                      <CarouselCustom listFile={listImageURL(data.photos)} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div id="price-shipping" ref={refPriceShipping}>
              <Divider />
              <Space size={12} align="center">
                <Icon component={DollarSvg} style={{ color: "#666666" }} />
                <ITitle fSize={24}>Price & Shipping</ITitle>
              </Space>
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[0, 16]}>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      columns={2}
                      data={dataPriceShippingFirst}
                    />
                  </Col>
                  <Divider style={{ margin: 0 }} dashed={true} />
                  <Col xs={12} xl={10}>
                    <DescriptionsTable
                      columns={1}
                      data={[[{ label: "Platform Fee", value: "IDR 3,000" }]]}
                    />
                  </Col>
                  <Col xs={24} xl={22} sm={24}>
                    <BoxPlatformFee>
                      <Space direction="vertical">
                        <Space align="baseline">
                          <Icon component={InfoCircleSvg} />
                          <ITitle>PLATFORM FEE</ITitle>
                        </Space>
                        <IText color="black">
                          <IText strong>{`3% `}</IText>of the total selling
                          price will be paid to Blimobil as a Platform fee
                        </IText>
                        <IText>
                          E.g: If you create a Selling Price of IDR 100,000 for
                          the car. When buyer create a transaction of IDR
                          100,000 for Blimobil, IDR 97,000 will be transferred
                          to your account, while IDR 3,000 will paid for
                          management/admin fee.
                        </IText>
                      </Space>
                    </BoxPlatformFee>
                  </Col>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      isHeader={true}
                      titleHeader="Shipping Method Availability"
                      columns={2}
                      data={dataPriceShippingSecond}
                    />
                  </Col>
                </Row>
              </div>
            </div>
            <div id="features" ref={refFeature}>
              <Divider />
              <Space size={12} align="center">
                <Icon component={FeatureSvg} style={{ color: "#666666" }} />
                <ITitle fSize={24}>Features</ITitle>
              </Space>
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[0, 16]}>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      isHeader={true}
                      isBoard={false}
                      titleHeader="Convenience"
                      componentItem={(el) => (
                        <Space align="center" size={24}>
                          {el.value && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <Icon
                                width={20}
                                height={20}
                                component={CheckedSvg}
                              />
                            </div>
                          )}
                          <IText>{el.value}</IText>
                        </Space>
                      )}
                      columns={2}
                      data={dataConvenience}
                    />
                  </Col>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      isHeader={true}
                      isBoard={false}
                      titleHeader="Cabin"
                      componentItem={(el) => (
                        <Space align="center" size={24}>
                          {el.value && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <Icon
                                width={20}
                                height={20}
                                component={CheckedSvg}
                              />
                            </div>
                          )}
                          <IText>{el.value}</IText>
                        </Space>
                      )}
                      columns={2}
                      data={dataCabin}
                    />
                  </Col>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      isHeader={true}
                      isBoard={false}
                      titleHeader="Safety"
                      componentItem={(el) => (
                        <Space align="center" size={24}>
                          {el.value && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <Icon
                                width={20}
                                height={20}
                                component={CheckedSvg}
                              />
                            </div>
                          )}
                          <IText>{el.value}</IText>
                        </Space>
                      )}
                      columns={2}
                      data={dataSafety}
                    />
                  </Col>
                  <Col xs={24} xl={22} sm={24}>
                    <DescriptionsTable
                      isHeader={true}
                      isBoard={false}
                      titleHeader="Lighting"
                      componentItem={(el) => (
                        <Space align="center" size={24}>
                          {el.value && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <Icon
                                width={20}
                                height={20}
                                component={CheckedSvg}
                              />
                            </div>
                          )}
                          <IText>{el.value}</IText>
                        </Space>
                      )}
                      columns={2}
                      data={dataLighting}
                    />
                  </Col>
                </Row>
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
                <Row gutter={[20]}>
                  {dataCompetitorsExtra.map((item) => (
                    <Col span={8}>
                      <CardCompetitors {...item} />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Skeleton>
        </DetailContent>
      </Content>
      <DetailChats
        itemChat={chatParams.itemChat}
        onClose={onClose}
        visible={chatParams.visible}
      />
      <Modal
        title="Notification"
        visible={visible}
        onOk={onConfrim}
        onCancel={hideModal}
        confirmLoading={isFetching}
        okText="Yes"
        cancelText="Cancel"
      >
        <p>
          Do you want to delete this{" "}
          <IText fSize={14} strong>
            {data.vin}
          </IText>
          . Click{" "}
          <IText fSize={14} strong>
            Yes to delete!
          </IText>
        </p>
      </Modal>
    </div>
  );
}
