import styled from "styled-components";

export const BlockMessageList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 360px;
  min-width: 160px;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  cursor: pointer;
  @media only screen and (max-width: 767px) {
    width: 310px;
  }
`;

export const HeaderMessageList = styled.div`
  overflow-x: auto;
`;

export const ContentMessage = styled.div`
  padding: 0px;
`;

export const BottomMessageList = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TagCountArchived = styled.div`
  background: #eeeeee;
  border-radius: 50%;
  width: 21px;
  height: 21px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: #444444;
`;

export const HeaderDetailChat = styled.div`
  width: 100%;
`;

export const ContentHeaderDetailChat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BodyDetailChat = styled.div`
  margin-top: 4px;
  background: #f9f9f9;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
  height: 100%;
  width: 100%;
`;

export const BoxChat = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
`;

export const PopupContentMessage = styled.div`
  border-radius: 14px;
  border-bottom-left-radius: ${props => props.isDealer ? "14px" : "0px"};
  border-bottom-right-radius: ${props => props.isDealer ? "0px" : "14px"};
  padding: 12px;
  background-color: ${props => !props.isDealer ? "#EEEEEE" : "#042970"};
  color: ${props => !props.isDealer ? "#222222" : "white"};
  word-break: break-all;
`;
