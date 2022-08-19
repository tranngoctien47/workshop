import styled from "styled-components";

export const BlockAddCompetitorProduct = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px dashed #D2D1D4;
    border-radius: 2px;
    flex-direction: column;
    gap: 12px;
    :hover{
        border: 1px dashed #376ED7;
        span{
            color: #376ED7;
        }
    }
`;

export const ButtonPlus = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #295EC2;
`

export const ContentModal = styled.div`

`

export const HeaderModal = styled.div`
    width: 100%;
    text-align: center;
`