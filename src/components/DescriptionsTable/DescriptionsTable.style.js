import styled from "styled-components";

export const HeaderBox = styled.div`
  border: 1px solid #eeeeee;
  border-bottom: unset;
  padding: 6px 12px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#D7F1FC")};
`;

export const BoxRoot = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columns ? props.columns : "1fr 1fr"};
`;

export const BoxDescription = styled.div`
  border: 1px solid #eeeeee;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  border-left: ${(props) =>
    props.isBorderLeft ? "1px solid #EEEEEE" : "unset"};
border-right: ${(props) =>
    props.isBorderRight ? "1px solid #EEEEEE" : "unset"};`;

export const ItemRowDescription = styled.div`
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) =>
    props.isBorderBottom ? "1px solid #EEEEEE" : "unset"};
`;
