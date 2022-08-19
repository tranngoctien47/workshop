import styled from "styled-components";

export const BoxWidget = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #D2D1D4;
    border-color: ${props => props.isCheked ? "#376ED7" : "#D2D1D4"};
    cursor: pointer;
    transition: all 0.35s ease-in-out 0s;
    :hover{
        border-color: ${props => props.brColor ? props.brColor : "#376ED7"};
        background: #e6f7ff;
        span {
            color: ${props => props.brColor ? props.brColor : "#376ED7"};
        }
    }
`;