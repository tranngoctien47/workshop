import { EllipsisOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Tag } from "antd";
import { startCase } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { GetPurchaseListCallback as getPurchaseListCallback } from "../../../callbacks/purchaseCallback";
import TableRoot from "../../../components/TableCustom";
import { selectFetchingpPurchase } from "../../../reselects/fetchingSelector";
import {
  selectPurchaseList,
  selectPurchaseParams
} from "../../../reselects/purchaseSelector";
import {
  parseDateColumnTable,
  formatCurrency,
  textEmpty
} from "../../../utils/common";
import { BoxEllipsis } from "../../Inventory/InventoryList/InventoryList.style";
import RouteName from "../../../routeName";
import { useHistory } from "react-router";
import {
  MenuCustom,
  MenuItemCustom
} from "../../../components/DropdownCustom/DropdownCustom";
import { CreateChatCallback as createChatCallback } from "../../../callbacks/chatCallback";
import { useState } from "react";
import DetailChats from "../../../components/ChatCustom/DetailChats";
import { CHAT_TYPE_CREATE, TYPE_CHAT_DEALER } from "../../../consts/Enum";
import { Box, IText, ITextBlack } from "../../../components";
import styled from "styled-components";
import UIColor from "../../../colors";

const BoxLoan = styled.span`
  font-size: 11px;
  color: white;
  padding: 1px 6px;
  font-weight: 600;
  background: #18ba92;
  border-radius: 2px;
`;

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

export default function PurchaseListPage() {
  const navigate = useHistory();
  const dataColumns = [
    "order",
    "status",
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
  const isFetching = useSelector(selectFetchingpPurchase());
  const purchaseParams = useSelector(selectPurchaseParams());
  const purchaseData = useSelector(selectPurchaseList());

  //callback
  const getPurchase = getPurchaseListCallback();
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

  const onClose = () =>
    setChatParams({
      ...chatParams,
      visible: false
    });

  const content = (record) => (
    <MenuCustom
      onClick={({ item, key, keyPath, domEvent }) =>
        onCreateChat({ item, key, keyPath, domEvent }, record)
      }
    >
      <MenuItemCustom key={TYPE_CHAT_DEALER.SUPPLIER.key}>
        Chat with Supplier
      </MenuItemCustom>
      {record.financeCode && (
        <MenuItemCustom key={TYPE_CHAT_DEALER.FINACE.key}>
          Chat with Finance
        </MenuItemCustom>
      )}
      <MenuItemCustom key={TYPE_CHAT_DEALER.ADMIN.key}>
        Chat with Admin
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
    dealer: {
      dataIndex: "dealer",
      title: "Supplier"
    },
    company: {
      dataIndex: "company"
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
      render: (value, record) => {
        return record.financeCode ? (
          <Space size={4} direction="vertical">
            <Space align="baseline" size={4}>
              <ITextBlack>{`IDR ${formatCurrency(value)}`}</ITextBlack>
              <BoxLoan>L</BoxLoan>
            </Space>
            <IText fSize={11} color={UIColor.gray._8}>
              {textEmpty(record?.finance)}
            </IText>
          </Space>
        ) : (
          `IDR ${formatCurrency(value)}`
        );
      }
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
          <Badge dot>
            <MessageOutlined style={{ fontSize: 16 }} />
          </Badge>
          <Dropdown
            trigger={["click"]}
            overlay={content(record)}
            placement="bottomLeft"
          >
            <Box
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: UIColor.gray._11
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <EllipsisOutlined />
            </Box>
          </Dropdown>
        </Space>
      )
    }
  };

  useEffect(() => {
    getPurchase && getPurchase(Object.assign(purchaseParams, { page: 1 }));
  }, []);

  const onChangeTable = (params) => {
    getPurchase(Object.assign(purchaseParams, params));
  };

  const onClickRow = (id) =>
    navigate.push(`${RouteName.purchase.detail}/${id}`);

  return (
    <div>
      <TableRoot
        gridColumns="2fr 1fr"
        onClickRow={onClickRow}
        dataColumns={dataColumns}
        columnConfig={columnConfig}
        dataSource={purchaseData}
        loading={isFetching}
        listStatus={[]}
        pagination={purchaseParams}
        // componentFilter={componentFilter}
        onChange={onChangeTable}
        isComponentFilter={true}
        isFilter={false}
      />
      <DetailChats
        itemChat={chatParams.itemChat}
        onClose={onClose}
        visible={chatParams.visible}
      />
    </div>
  );
}
