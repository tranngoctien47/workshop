import { Avatar, Drawer, Input, List, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Box, IText } from "..";
import { ImageCarouse2, LocationSvg } from "../../assets/images/blimobil";
import {
  BlockMessageList,
  BodyDetailChat,
  BoxChat,
  ContentHeaderDetailChat,
  HeaderDetailChat,
  PopupContentMessage,
} from "./ChatCustom.styles";
import Icon, {
  CloseOutlined,
  LoadingOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UIColor from "../../colors";
import Scrollbar from "@iso/components/utility/customScrollBar";
import { TextField } from "../Form/form.style";
import {
  CreateChatSendMessageCallback as createChatSendMessageCallback,
  GetChatDetailCallback as getChatDetailCallback,
} from "../../callbacks/chatCallback";
import { useSelector } from "react-redux";
import { selectChatDetail } from "../../reselects/chatSelector";
import styled from "styled-components";
import {
  selectFetchingChat,
  selectFetchingChatDetail,
  selectFetchingSendMessageChat,
} from "../../reselects/fetchingSelector";
import storage from "../../utils/localStorage";
import { timeDifference, nameCar } from "../../utils/common";
import Urls from "../../consts/Urls";

const DrawerStyled = styled(Drawer)`
  .ant-drawer-header,
  .ant-drawer-footer {
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

export default function DetailChats({ itemChat, onClose, visible }) {
  let interval;
  // state
  const [content, setContent] = useState("");

  // select
  const chatDetail = useSelector(selectChatDetail());
  const isFetching = useSelector(selectFetchingChatDetail());
  const isFetchingSendMessage = useSelector(selectFetchingSendMessageChat());

  // callback
  const getChatDetail = getChatDetailCallback();
  const createSendMessage = createChatSendMessageCallback();

  useEffect(() => {
    if (itemChat.code) {
      getChatDetail && getChatDetail(itemChat.code);
      interval = setInterval(() => {
        getChatDetail && getChatDetail(itemChat.code);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [itemChat.code]);

  const onSendMessage = () =>
    content &&
    createSendMessage &&
    createSendMessage(itemChat.code, { content: content }, () => {
      setContent("");
    });

  const contentMesseage = (item) => {
    const isDealer = item.createBy.merchantCode === storage.getIdStore();
    return (
      <Box
        style={{ marginBottom: 12 }}
        justify={isDealer ? "flex-end" : "flex-start"}
        items="end"
      >
        {!isDealer && <div style={{width: 40}}>
          <Avatar icon={<UserOutlined />}/>
        </div>}
        <PopupContentMessage isDealer={isDealer}>
          {item.content}
          <br />
          <div style={{ width: "100%", textAlign: "right" }}>
            <IText fSize={8} color={isDealer ? "white" : UIColor.primary}>
              {timeDifference(item.created)}
            </IText>
          </div>
        </PopupContentMessage>
      </Box>
    );
  };

  const onHandleClose = () => {
    clearInterval(interval);
    onClose();
  };

  return (
    <DrawerStyled
      title={
        <HeaderDetailChat>
          <ContentHeaderDetailChat>
            <Space size={12}>
              <Avatar
                style={{ objectFit: "contain"}}
                src={
                  itemChat?.car?.photos?.photos?.length
                    ? Urls.URL_FILE +
                      itemChat?.car?.photos?.photos[0]?.path?.width180px
                    : ""
                }
                size={46}
              />
              <Space direction="vertical" size={0}>
                <IText color="#333333" fSize={14}>
                  {itemChat?.car?._text}
                </IText>
                <Box justify="start">
                  <Icon component={LocationSvg} />
                  <IText fSize={12} color={UIColor.sky._3}>
                    Jakarta
                  </IText>
                </Box>
              </Space>
            </Space>
            <CloseOutlined onClick={onHandleClose} />
          </ContentHeaderDetailChat>
        </HeaderDetailChat>
      }
      width={300}
      closable={false}
      onClose={onHandleClose}
      visible={visible}
      footer={
        <Input.Group>
          <BoxChat>
            <TextField.TextArea
              autoSize={{
                minRows: 2,
                maxRows: 3,
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type here..."
              allowClear
            />
            {isFetchingSendMessage ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              <SendOutlined
                onClick={onSendMessage}
                style={{ color: "#0D3E9A", cursor: "pointer" }}
              />
            )}
          </BoxChat>
        </Input.Group>
      }
    >
      <List
        dataSource={chatDetail}
        // loading={isFetching}
        renderItem={contentMesseage}
      />
    </DrawerStyled>
  );
}