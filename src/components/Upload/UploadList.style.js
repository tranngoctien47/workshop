import { Upload } from "antd";
import styled from "styled-components";

export const UploadStyled = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    border: 1px dashed #d2d1d4;
    border-radius: 2px;
    background: white;
    width: ${props => props.width ? props.width : "152px"};
    height: ${props => props.height ? props.height : "152px"};

  }
  .ant-upload-list-picture-card-container{
    width: ${props => props.width ? props.width : "152px"};
    height: ${props => props.height ? props.height : "152px"};
    border-radius: 2px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
      padding: 0px;
      border: unset;
  }
`;

export const BlockUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const IconUpload = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #295ec2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
