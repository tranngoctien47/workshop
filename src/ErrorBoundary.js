import { Button, Result } from "antd";
import React from "react";
import styled from "styled-components";

const LayoutCenter = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <LayoutCenter>
          <Result
            status="500"
            title="500"
            subTitle="Loading failed! Please reload."
            extra={
              <Button type="primary" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            }
          />
        </LayoutCenter>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
