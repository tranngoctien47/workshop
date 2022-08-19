import styled from "styled-components";

export const BlockEditProfile = styled.div`
  max-width: ${(props) => (props.mWidth ? props.mWidth : 536)}px;
  width: 100%;
  flex-direction: column;
  display: flex;
`;