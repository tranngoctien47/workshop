import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  position: relative;
`;

export const BlockHeaderProfile = styled.div`
  width: 100%;
  height: 208px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #0d3e9a;
`;

export const BlockProfile = styled.div`
  z-index: 2;
  position: absolute;
  top: 100px;
  background: transparent;
  width: 100%;
  height: auto;
  width: 100%;
`;

export const BlockProfileAvatar = styled.div`
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  padding: 50px 30px;
  text-align: center;
`;

export const BlockInfomation = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

export const BlockTab = styled.div`
  margin-top: 66px;
`;

export const TabProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 12px 12px;
  gap: 10px;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  clip-path: polygon(0 0, 88% 0, 100% 17%, 100% 100%, 20% 100%, 0 100%, 0% 20%);
  max-width: 145px;
  transition: all 0.35s ease-in-out 0s;
  cursor: pointer;
  .ant-typography {
    color: ${(props) => (props.active ? "white" : "#444444")};
    letter-spacing: 1px;
  }
`;

export const ContentTab = styled.div`
  margin-top: 50px;
  width: 100%;
  height: auto;
`;

export const BoxDescription = styled.div`
  margin-top: 12px;
  background-color: white;
  padding: 15px 30px 30px 30px;
  width: 100%;
`

export const BoxItemDescription = styled.div`
  display: flex;
  flex-direction: column;
`;
