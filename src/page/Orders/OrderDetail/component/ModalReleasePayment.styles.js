import styled from "styled-components";

export const BoxDes = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #E8E8EA;
    border-top: ${props => !props.isHiddenBorderTop ? "1px solid #E8E8EA" : "unset"};
    padding: 12px;
    gap: 12px;
`;