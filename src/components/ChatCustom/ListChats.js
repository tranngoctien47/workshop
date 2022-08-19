import React, { useCallback, useEffect, useMemo, useState } from "react";
import Scrollbar from "@iso/components/utility/customScrollBar";
import {
  BlockMessageList,
  HeaderMessageList,
  ContentMessage,
  BottomMessageList,
  TagCountArchived
} from "./ChatCustom.styles";
import { Box, ImageCustom, IText, ITitle } from "..";
import {
  Avatar,
  Button,
  Drawer,
  Image,
  List,
  Select,
  Space,
  Typography
} from "antd";
import { ItemFilter } from "../TableCustom/TableRoot.style";
import { data } from "./data";
import { ImageCarousel1 } from "../../assets/images/blimobil";
import {
  CloseOutlined,
  ReloadOutlined,
  RightOutlined
} from "@ant-design/icons";
import DetailChats from "./DetailChats";
import { useSelector } from "react-redux";
import { selectChatList, selectChatParams } from "../../reselects/chatSelector";
import { GetChatListCallback as getChatListCallback } from "../../callbacks/chatCallback";
import { selectFetchingChat } from "../../reselects/fetchingSelector";
import {
  parseDateColumnTable,
  textEmpty,
  timeDifference
} from "../../utils/common";
import moment from "moment";
import UIColor from "../../colors";
import Urls from "../../consts/Urls";
import {
  TYPE_CHAT_ADMIN1,
  TYPE_CHAT_DEALER,
  TYPE_CHAT_FINANCE,
  TYPE_CHAT_SUPPLIER,
  TYPE_USER
} from "../../consts/Enum";

export default function ListChats({
  visible,
  setVisible,
  childrenDrawer,
  setChildrenDrawer
}) {
  const [key, setKey] = useState(TYPE_CHAT_DEALER.BUYER.key);
  const [itemChat, setItemChat] = useState({
    car: {},
    code: ""
  });

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showChildrenDrawer = (data) => {
    setChildrenDrawer(true);
    setItemChat({
      car: data.car,
      code: data._id
    });
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  // select
  const listChat = useSelector(selectChatList());
  const isRule = useSelector((state) => state.Auth.idToken);

  const isFetching = useSelector(selectFetchingChat());
  const params = useSelector(selectChatParams());

  // callback
  const getListChat = getChatListCallback();

  useEffect(() => {
    getListChat && getListChat(Object.assign(params, { chatWith: key }));
  }, [key]);

  const onChangeOptionSelect = (key) => setKey(key);

  const typeChat = useMemo(() => {
    if (isRule === TYPE_USER.ADMIN) {
      return TYPE_CHAT_ADMIN1;
    }
    if (isRule === TYPE_USER.DEALER) {
      return TYPE_CHAT_DEALER;
    }
    if (isRule === TYPE_USER.SUPPLIER) {
      return TYPE_CHAT_SUPPLIER;
    }
    if (isRule === TYPE_USER.FINANCE) {
      return TYPE_CHAT_FINANCE;
    }
  }, [isRule]);

  const optionsTypeChat = () => {
    return Object.keys(typeChat).map((obj, i) => {
      return (
        <Select.Option key={typeChat[obj].key}>
          {typeChat[obj].name}
        </Select.Option>
      );
    });
  };

  const itemsFilter = () => {
    return Object.keys(typeChat).map((obj, i) => {
      return (
        <ItemFilter
          onClick={() => setKey(typeChat[obj].key)}
          active={key === typeChat[obj].key}
        >
          <Typography.Text>{typeChat[obj].name}</Typography.Text>
        </ItemFilter>
      );
    });
  };

  const infoUser = (keyChat, data) => {
    switch (keyChat) {
      case TYPE_CHAT_DEALER.BUYER.key: {
        return textEmpty(data?.user?.[0]?.fullname);
      }
      case TYPE_CHAT_DEALER.SUPPLIER.key: {
        return textEmpty(data?.merchant?.contactName);
      }
      case TYPE_CHAT_DEALER.ADMIN.key: {
        return textEmpty(data.orderCode);
      }
      default: {
        return textEmpty(data?.merchant?.contactName);
      }
    }
  };

  return (
    <Drawer
      title={
        <Box justify="space-between" style={{ width: "100%" }}>
          <ITitle fSize={24}>Chats</ITitle>
          <CloseOutlined onClick={onClose} style={{ fontSize: 18 }} />
        </Box>
      }
      width={350}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <HeaderMessageList>
        <Space size={24} direction="vertical">
          <Space size={0}>{itemsFilter()}</Space>
        </Space>
      </HeaderMessageList>
      <ContentMessage>
        <Box direction="row" justify="space-between">
          <Space
            style={{ cursor: "pointer" }}
            onClick={() => getListChat(params)}
          >
            <ReloadOutlined style={{ color: UIColor.blue._5 }} />
            <IText color={UIColor.blue._5}>Refresh</IText>
          </Space>
          <Select bordered={false} value={key} onChange={onChangeOptionSelect}>
            {optionsTypeChat()}
          </Select>
        </Box>
        <List
          loading={isFetching}
          dataSource={listChat}
          renderItem={(item) => {
            return (
              <List.Item
                onClick={() => showChildrenDrawer(item)}
                style={{ cursor: "pointer" }}
                key={item.email}
              >
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={infoUser(key, item)}
                  description={parseDateColumnTable(item.created)}
                />
                <Space direction="vertical" style={{ textAlign: "right" }}>
                  <IText fSize={11} color="#666666">
                    {timeDifference(item.created)}
                  </IText>
                  <ImageCustom
                    src={
                      item?.car?.photos?.photos?.length
                        ? Urls.URL_FILE +
                          item?.car?.photos?.photos[0]?.path?.width180px
                        : ""
                    }
                    preview={false}
                    style={{
                      marginLeft: 12,
                      border: "1px solid #C4C4C4",
                      padding: 1
                    }}
                    width={55}
                    height={32}
                  />
                </Space>
              </List.Item>
            );
          }}
        />
        <DetailChats
          itemChat={itemChat}
          visible={childrenDrawer}
          onClose={onChildrenDrawerClose}
        />
      </ContentMessage>
    </Drawer>
  );
}
