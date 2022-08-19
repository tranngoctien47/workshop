import styled from "styled-components";

export const ItemFilter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 10px 12px;
    font-weight: ${props => props.active ? 600 : 400};
    background-color: ${props => props.active ? "#0D3E9A" : "transparent"};
    clip-path: polygon(0 0, 88% 0, 100% 17%, 100% 100%, 20% 100%, 0 100%, 0% 20%);
    min-width: 125px;
    transition: all 0.35s ease-in-out 0s;
    cursor: pointer;
    .ant-typography{
        color: ${props => props.active ? "white" : "#444444"};
        letter-spacing: 1px;
    }
`;