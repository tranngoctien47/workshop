import styled from "styled-components";
import { device } from "../../consts/Enum";

export const BoxSignin = styled.div`
  max-width: ${props => props.mWidth ? props.mWidth : 536}px;
  width: 100%;
  flex-direction: column;
  display: flex;
`;

export const BoxTriangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 12px solid #ff8b34;
  border-left: 12px solid transparent;
`;

export const TextDealer = styled.span`
  color: #0d3e9a;
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

export const TitleAuth = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 80px;
  line-height: 120%;
  color: #222222;
`;

export const BlockRoot = styled.div`
  filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.1));
  
  @media ${device.xs} { 
    filter: unset;
  }
`

export const BlockForm = styled.div`
  background: white;
  opacity: 0.97;
  padding: 54px 70px;
  width: 100%;
  min-height: ${props => props.mHeight ? props.mHeight : 464}px;
  clip-path: polygon(0 0, 80% 0%, 100% 20%, 100% 100%, 100% 100%, 20% 100%, 0 80%, 0 0);

  @media ${device.xs} { 
    clip-path: unset;
    padding: 30px 0px;
  }
`;
