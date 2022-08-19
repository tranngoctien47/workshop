import styled from "styled-components";

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 350px;
    height: 100%;
`

export const MenuContent = styled.div`
    padding: 24px;
    height: 100%;
    background-color: #F9F9F9;
`;

export const DetailContent = styled.div`
    padding: 24px;
    min-height: 100vh;
    background-color: white;
    border-left: 1px solid #EEEEEE;
    gap: 30px;
    display: flex;
    flex-direction: column;
`