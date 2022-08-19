import styled from "styled-components";
import { palette } from "styled-theme";
import {
  transition,
  borderRadius,
  boxShadow,
} from "@iso/lib/helpers/style_utils";
import WithDirection from "@iso/lib/helpers/rtl";
import UIColor from "../../colors";
import { device } from "../../consts/Enum";

export const TagSituation = styled.span`
  text-align: center;
  padding: ${(props) => (props.padding ? props.padding : "8px 16px")};
  background-color: ${(props) => (props.bg ? props.bg : UIColor.primaryHeader)};
  color: ${(props) => (props.color ? props.color : "white")};
  font-size: ${(props) => (props.fSize ? props.fSize : 11)}px;
  font-weight: 600;
  clip-path: polygon(0 0, 90% 0, 100% 10%, 100% 100%, 11% 100%, 0 90%, 0% 20%);
`;

const TopbarWrapper = styled.div`
  .isomorphicTopbar {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    /* padding: ${(props) =>
      props["data-rtl"] === "rtl" ? "0 265px 0 31px" : "0 31px 0 265px"}; */
    z-index: 1000;
    padding: 0px 32px;
    ${transition()};

    @media ${device.xs} {
      padding: 0px 16px;
    }
  }
`;

export default WithDirection(TopbarWrapper);
