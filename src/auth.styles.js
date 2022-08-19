import styled from "styled-components";
import { BlimobiGraphicAuth } from "./assets/images/blimobil";
import { device } from "./consts/Enum";

export const BackgroundAuth = styled.div`
  width: 100%;
  min-height: calc(100vh - 72px);
  height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${BlimobiGraphicAuth}) no-repeat center center;
  background-size: unset;
  background-position: top;

  @media ${device.xs} {
    justify-content: flex-start;
    background-color: white !important;
    background: unset;
    padding: 30px 40px;
    height: auto;
    min-height: auto;
  }
`;

export const HeaderAuth = styled.div`
  width: 100vw;
  height: 72px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  @media ${device.xs} {
    background-color: #333333;
    justify-content: center;
    padding-left: 0px;
    height: 58px;
  }
`;

export const BlockAuth = styled.div`
  display: flex;
  flex-direction: column;
`;
