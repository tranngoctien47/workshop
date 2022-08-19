import styled from "styled-components";

export const BoxCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  position: relative;
`;

export const DividerCustom = styled.div`
  width: 100%;
  height: 1px;
  background-color: #50BDEA;
`;

export const BlockAction = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10;
`;

export const ButtonAction = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0F0D15;
  border-radius: 2px;
  cursor: pointer;
  :hover{
    background-color: #d9d9d9;
  }
`;