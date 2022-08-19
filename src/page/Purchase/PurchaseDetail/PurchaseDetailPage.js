import Icon, {
  CaretDownOutlined,
  MessageOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Badge,
  Col,
  Dropdown,
  Row,
  Space,
  Image,
  Divider,
  Tag,
  Checkbox,
  Skeleton
} from "antd";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import UIColor from "../../../colors";
import {
  ButtonCustom,
  ImageCustom,
  IText,
  ITitle,
  PageHeaderCustom
} from "../../../components";
import {
  DividerCustom,
  MenuCustom,
  MenuItemCustom
} from "../../../components/DropdownCustom/DropdownCustom";
import * as C from "../../../consts/Enum";
import { Content, DetailContent, MenuContent } from "./PurchaseDetail.style";
import {
  CarSvg,
  HistorySvg,
  ImageCarousel
} from "../../../assets/images/blimobil";
import { startCase, upperCase } from "lodash";
import StepHistoryOrder from "../../Orders/OrderDetail/component/StepHistoryOrder";
import {
  GetOrderDetailAdminCallback as getOrderDetailAdminCallback,
  GetOrderDetailCallback as getOrderDetailCallback
} from "../../../callbacks/orderCallback";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectOrderDetail } from "../../../reselects/orderSelector";
import {
  selectFetchingOrder,
  selectFetchingpPurchase
} from "../../../reselects/fetchingSelector";
import { formatCurrency, nameCar, textEmpty } from "../../../utils/common";
import storage from "../../../utils/localStorage";
import Urls from "../../../consts/Urls";
import { selectPurchaseDetail } from "../../../reselects/purchaseSelector";
import { GetPurchaseDetailCallback as getPurchaseDetailCallback } from "../../../callbacks/purchaseCallback";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";
import DetailChats from "../../../components/ChatCustom/DetailChats";

export default function PurchaseDetailPage() {
  const { id } = useParams();
  const [chatParams, setChatParams] = useState({
    itemChat: {
      car: "",
      code: ""
    },
    visible: false
  });

  // select
  const purchaseDetail = useSelector(selectPurchaseDetail());
  const isFetching = useSelector(selectFetchingpPurchase());

  // callback
  const getPurchaseDetail = getPurchaseDetailCallback();
  const createChat = createChatCallback();

  const configColumn = useMemo(() => {
    return purchaseDetail.paymentOption === "2" ? 6 : 8;
  }, [purchaseDetail]);

  useEffect(() => {
    getPurchaseDetail && getPurchaseDetail(id);
  }, [id]);

  const content = (
    <MenuCustom>
      <MenuItemCustom>Delivered Order</MenuItemCustom>
      <MenuItemCustom>Received Payment</MenuItemCustom>
      <DividerCustom />
      <MenuItemCustom>Chat with Blimobil</MenuItemCustom>
    </MenuCustom>
  );

  const contentChat = () => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onCreateChat({ item, key, keyPath, domEvent })
      }
    >
      <MenuItemCustom key={C.TYPE_CHAT_DEALER.SUPPLIER.key}>
        Chat with Supplier
      </MenuItemCustom>
      {purchaseDetail.financeCode && (
        <MenuItemCustom key={C.TYPE_CHAT_DEALER.FINACE.key}>
          Chat with Finance
        </MenuItemCustom>
      )}
      <MenuItemCustom key={C.TYPE_CHAT_DEALER.ADMIN.key}>
        Chat with Admin
      </MenuItemCustom>
    </MenuCustom>
  );

  const onCreateChat = ({ item, key, keyPath, domEvent }) => {
    domEvent.stopPropagation();
    createChat &&
      createChat(
        {
          orderCode: id
        },
        (result) => {
          setChatParams({
            itemChat: {
              code: result._id,
              car: purchaseDetail.car
            },
            visible: true
          });
        },
        C.CHAT_TYPE_CREATE.ORDER,
        key
      );
  };

  const itemDescriptions = (label, value) => (
    <Fragment>
      <IText>{label}</IText>
      <br />
      <ITitle>{value}</ITitle>
    </Fragment>
  );

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false
    });

  return (
    <div>
      <PageHeaderCustom
        type={C.TYPE_PAGE.DETAIL}
        title={`#${upperCase(id)}`}
        // subTitle="This order is cancelled"
        extra={
          <Space size={32}>
            <Space>
              <Dropdown overlay={contentChat} placement="bottomLeft">
                <Badge size="small" dot>
                  <MessageOutlined
                    style={{ fontSize: 16, color: "white", cursor: "pointer" }}
                  />
                </Badge>
              </Dropdown>
            </Space>
            <Dropdown overlay={content} placement="bottomLeft">
              <ButtonCustom
                type="text"
                height={52}
                rounded={0}
                bgColor={UIColor.orange._5}
                //   onClick={onNavigate}
                //   icon={<Icon component={EditSvg} width={32} height={32} />}
              >
                ACTION
                <CaretDownOutlined />
              </ButtonCustom>
            </Dropdown>
          </Space>
        }
      />
      <Content>
        <DetailContent>
          <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
            <div id="car-information">
              <Space size={12} align="center">
                <Icon component={CarSvg} />
                <ITitle fSize={24}>Car Information</ITitle>
              </Space>
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[32, 16]}>
                  <Col span={6}>
                    <ImageCustom
                      height={156}
                      src={
                        purchaseDetail?.car?.photos?.length
                          ? Urls.URL_FILE +
                            purchaseDetail?.car?.photos[0]?.path?.origin
                          : ""
                      }
                    />
                  </Col>
                  <Col span={18}>
                    <ITitle style={{ letterSpacing: "0.15em" }}>
                      {nameCar(purchaseDetail?.car)}
                    </ITitle>
                    <Divider dashed />
                    <Row gutter={[12, 12]}>
                      <Col span={configColumn}>
                        <IText>Status</IText>
                        <br />
                        <ITitle>
                          <Tag
                            color="#FFE2CC"
                            style={{
                              color: "#FF9A4D",
                              textTransform: "uppercase",
                              fontWeight: 600,
                              fontSize: 10,
                              border: `0.5px solid #FF9A4D`
                            }}
                          >
                            {startCase(purchaseDetail.status)}
                          </Tag>
                        </ITitle>
                      </Col>
                      <Col span={configColumn}>
                        <IText>Booking ID</IText>
                        <br />
                        <ITitle>
                          {upperCase(textEmpty(purchaseDetail?.code))}
                        </ITitle>
                      </Col>
                      <Col span={configColumn}>
                        <IText>Total Amount</IText>
                        <br />
                        <ITitle>
                          IDR{" "}
                          {formatCurrency(purchaseDetail?.car?.sellingPrice)}
                        </ITitle>
                      </Col>
                      {purchaseDetail.paymentOption === "2" && (
                        <Col span={6}>
                          <IText>Loan Amount (70%)</IText>
                          <br />
                          <ITitle>
                            IDR{" "}
                            {formatCurrency(
                              (purchaseDetail?.car?.sellingPrice * 0.7).toFixed(
                                0
                              )
                            )}
                          </ITitle>
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Divider />
                </Row>
              </div>
            </div>
            <div id="car-information">
              <Space size={12} align="center">
                <UserOutlined
                  style={{
                    fontSize: 16,
                    border: "1px solid #666666",
                    borderRadius: 2
                  }}
                />
                <ITitle fSize={24}>Company Information</ITitle>
              </Space>
              <div style={{ marginTop: 24, padding: "0px 24px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    {itemDescriptions(
                      "Your Name",
                      textEmpty(purchaseDetail?.personalInfo?.name)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "Phone Number",
                      textEmpty(purchaseDetail?.personalInfo?.phone)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "Email",
                      textEmpty(purchaseDetail?.buyer?.email)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "City",
                      textEmpty(purchaseDetail?.personalInfo?.city)
                    )}
                  </Col>
                  <Col span={12}>
                    {itemDescriptions(
                      "ZIP Code",
                      textEmpty(purchaseDetail?.personalInfo?.zip_code)
                    )}
                  </Col>
                  <Col span={24}>
                    {itemDescriptions(
                      "Address",
                      textEmpty(purchaseDetail?.personalInfo?.address)
                    )}
                  </Col>
                </Row>
              </div>
            </div>
            <Divider />
            <Checkbox>Billing Address is the same delivery address</Checkbox>
          </Skeleton>
        </DetailContent>
        <MenuContent>
          <Skeleton loading={isFetching} paragraph={{ rows: 6 }}>
            <Space size={12} align="center">
              <Icon component={HistorySvg} />
              <ITitle fSize={24}>Order History</ITitle>
            </Space>
            <div style={{ marginTop: 24, padding: "0px 24px" }}>
              <StepHistoryOrder />
            </div>
          </Skeleton>
        </MenuContent>
        <DetailChats
          itemChat={chatParams.itemChat}
          onClose={onClose}
          visible={chatParams.visible}
        />
      </Content>
    </div>
  );
}
