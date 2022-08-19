import { Button, Result } from "antd";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LayoutCenter = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export default function Page403() {
  return (
    <LayoutCenter>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to="/signin">
            <Button type="primary">Back SignIn</Button>
          </Link>
        }
      />
    </LayoutCenter>
  );
}
