import { EllipsisOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Tag } from "antd";
import { startCase } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableRoot from "../../../components/TableCustom";
import { selectFetchingpRequest } from "../../../reselects/fetchingSelector";
import { parseDateColumnTable, formatCurrency } from "../../../utils/common";
import {
  BlockEmptyInventory,
  BoxEllipsis
} from "../../Inventory/InventoryList/InventoryList.style";
import RouteName from "../../../routeName";
import { useHistory } from "react-router";
import {
  selectRequestList,
  selectRequestParams
} from "../../../reselects/requestSelector";
import { GetRequestListCallback as getRequestListCallback } from "../../../callbacks/requestCallback";
import { IText, ITitle } from "../../../components";
import Icon from "@ant-design/icons";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";
import {
  MenuCustom,
  MenuItemCustom
} from "../../../components/DropdownCustom/DropdownCustom";
import { CHAT_TYPE_CREATE, TYPE_CHAT_FINANCE } from "../../../consts/Enum";
import DetailChats from "../../../components/ChatCustom/DetailChats";

const OderSvgEmpty = () => (
  <svg
    width="98"
    height="104"
    viewBox="0 0 98 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 1H1V2V32C1 41.757 8.90964 49.6667 18.6667 49.6667C28.4237 49.6667 36.3333 41.757 36.3333 32V12C36.3333 5.92487 31.4085 1 25.3333 1C19.2582 1 14.3333 5.92487 14.3333 12V35.3333V36.3333H15.3333H22H23V35.3333V12C23 10.7113 24.0447 9.66667 25.3333 9.66667C26.622 9.66667 27.6667 10.7113 27.6667 12V32C27.6667 36.9706 23.6372 41 18.6667 41C13.6961 41 9.66667 36.9706 9.66667 32V2V1H8.66667H2ZM42 1H41V2V32C41 44.3344 31.001 54.3333 18.6667 54.3333H8.66667H7.66667V55.3333V92C7.66667 98.0751 12.5915 103 18.6667 103H85.3333C91.4085 103 96.3333 98.0751 96.3333 92V12C96.3333 5.92487 91.4085 1 85.3333 1H42ZM49.6667 34.3333V29.6667H74.3333V34.3333H49.6667ZM49.6667 54.3333V49.6667H74.3333V54.3333H49.6667ZM29.6667 69.6667H74.3333V74.3333H29.6667V69.6667Z"
      fill="#E9F1FE"
      stroke="#295EC2"
      stroke-width="2"
    />
  </svg>
);

function colorStatus(status) {
  switch (status) {
    case "new":
      return {
        bgColor: "#CAEBF9",
        color: "#50BDEA",
        value: "new"
      };
    case "pendingPayment":
      return {
        bgColor: "#CAEBF9",
        color: "#50BDEA",
        value: "pendingPayment"
      };
    case "verifyingPayment":
      return {
        bgColor: "#FFE2CC",
        color: "#FF9A4D",
        value: "verifyingPayment"
      };
    case "paid":
      return {
        bgColor: "#A5F6E2",
        color: "#1BD2A4",
        value: "paid"
      };
    case "payment":
      return {
        bgColor: "#A5F6E2",
        color: "#1BD2A4",
        value: "Payment"
      };
    case "delivered":
      return {
        color: "#666666",
        bgColor: "#D2D1D4",
        value: "delivered"
      };
    case "completed":
      return {
        color: "#376ED7",
        bgColor: "#C1D5FB",
        value: "completed"
      };
    case "cancelLed":
      return {
        color: "#F76969",
        bgColor: "#FCBFBF",
        value: "cancelLed"
      };
    default:
      return {
        bgColor: "#CAEBF9",
        color: "#50BDEA",
        value: "new"
      };
  }
}

export default function RequestListPage() {
  const navigate = useHistory();
  const dataColumns = [
    "order",
    "status",
    "product",
    "dealer",
    "date",
    "totalAmount",
    "totalFee",
    "action"
  ];
  const [chatParams, setChatParams] = useState({
    itemChat: {
      car: "",
      code: ""
    },
    visible: false
  });

  //selector
  const isFetching = useSelector(selectFetchingpRequest());
  const requestParams = useSelector(selectRequestParams());
  const requestData = useSelector(selectRequestList());

  //callback
  const getRequest = getRequestListCallback();
  const createChat = createChatCallback();

  const onCreateChat = ({ item, key, keyPath, domEvent }, record) => {
    domEvent.stopPropagation();
    createChat &&
      createChat(
        {
          orderCode: record.order
        },
        (result) => {
          setChatParams({
            itemChat: {
              code: result._id,
              car: record.car
            },
            visible: true
          });
        },
        CHAT_TYPE_CREATE.ORDER,
        key
      );
  };

  const contentChat = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onCreateChat({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom key={TYPE_CHAT_FINANCE.BUYER.key}>
        Chat with Buyer
      </MenuItemCustom>
      <MenuItemCustom key={TYPE_CHAT_FINANCE.DEALER.key}>
        Chat with Dealer
      </MenuItemCustom>
      <MenuItemCustom key={TYPE_CHAT_FINANCE.ADMIN.key}>
        Chat with Admin
      </MenuItemCustom>
      <MenuItemCustom key={TYPE_CHAT_FINANCE.SUPPLIER.key}>
        Chat with Supplier
      </MenuItemCustom>
    </MenuCustom>
  );

  const columnConfig = {
    order: {
      dataIndex: "order",
      title: "Order #"
    },
    status: {
      dataIndex: "status",
      render: (value) =>
        !value ? (
          "-"
        ) : (
          <Tag
            color={colorStatus(value).bgColor}
            style={{
              color: colorStatus(value).color,
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: 10,
              border: `0.5px solid ${colorStatus(value).color}`
            }}
          >
            {startCase(colorStatus(value).value)}
          </Tag>
        )
    },
    product: {
      dataIndex: "product"
    },
    company: {
      dataIndex: "company"
    },
    dealer: {
      dataIndex: "dealer"
    },
    buyer: {
      dataIndex: "buyer"
    },
    date: {
      title: "Date Created",
      dataIndex: "date",
      render: (value) => parseDateColumnTable(value)
    },
    totalAmount: {
      dataIndex: "totalAmount",
      render: (value) => `IDR ${formatCurrency(value)}`,
      align: "right"
    },
    totalFee: {
      dataIndex: "totalFee",
      render: (value) => (!value ? `-` : `IDR ${formatCurrency(value)}`),
      align: "right"
    },
    action: {
      dataIndex: "action",
      render: (value, record) => (
        <Space size={16}>
          <Dropdown
            trigger={["click"]}
            overlay={contentChat(record)}
            placement="bottomLeft"
          >
            <Badge
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              dot
            >
              <MessageOutlined style={{ fontSize: 16 }} />
            </Badge>
          </Dropdown>
        </Space>
      )
    }
  };

  useEffect(() => {
    getRequest && getRequest(Object.assign(requestParams, { page: 1 }));
  }, []);

  const onChangeTable = (params) => {
    getRequest(Object.assign(requestParams, params));
  };

  const onClickRow = (id) =>
    navigate.push(`${RouteName.purchase.detail}/${id}`);

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false
    });

  return (
    <div>
      {requestData?.length ? (
        <TableRoot
          gridColumns="2fr 1fr"
          onClickRow={onClickRow}
          dataColumns={dataColumns}
          columnConfig={columnConfig}
          dataSource={requestData}
          loading={isFetching}
          listStatus={[]}
          pagination={requestParams}
          // componentFilter={componentFilter}
          onChange={onChangeTable}
          isComponentFilter={true}
          isFilter={false}
        />
      ) : (
        <BlockEmptyInventory>
          <Icon component={OderSvgEmpty} />
          <ITitle color="#222222" fSize={24}>
            No items in Requests
          </ITitle>
          <IText fSize={14}>
            The request list will be displayed here when you received request
            from the dealers.
          </IText>
        </BlockEmptyInventory>
      )}
      <DetailChats
        itemChat={chatParams.itemChat}
        onClose={onClose}
        visible={chatParams.visible}
      />
    </div>
  );
}
