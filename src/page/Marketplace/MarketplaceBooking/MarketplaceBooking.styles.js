import styled from "styled-components";

export const Content = styled.div`
    padding: 32px 24px;
    width: 100%;
`;

export const DotStep = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${props => props.active ? "white" : "#666666"};
    background-color: ${props => props.active ? "#0D3E9A" : "#EEEEEE"};
    position: absolute;
    top: -12px;
    left: -15px;
`;

export const ContentInformation = styled.div`
    padding: 30px;
    background-color: white;
`;

export const CardSelected = styled.div`
    padding: 16px;
    border: ${props => props.isActive ? "1px solid #0D3E9A" : "1px solid #D2D1D4"};
    cursor: pointer;
    width: 100%;
`;


export const CheckCard = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: ${props => props.isActive ? "5px solid #295EC2" : "2px solid #D2D1D4"}
`;