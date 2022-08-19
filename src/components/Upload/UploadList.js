import { PlusOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { IText } from "..";
import { parseListImage } from "../../utils/common";
import { UploadStyled, IconUpload, BlockUpload } from "./UploadList.style";

export default function UploadList({
  multiple = true,
  isComponentUpload = false,
  componentUpload = () => {},
  maxLength = 8,
  width,
  height,
  ref,
  onChange,
  fileList,
  onBlur,
  listType = "picture-card"
}) {

  const onChangeUpload = ({ fileList: newFileList }) => {
    onChange(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    // eslint-disable-next-line no-unused-expressions
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = isComponentUpload ? (
    componentUpload()
  ) : (
    <BlockUpload>
      <IconUpload>
        <PlusOutlined style={{ color: "white", fontSize: 13 }} />
      </IconUpload>
      <IText fSize={12} color="#666666">
        Add photo or video
      </IText>
    </BlockUpload>
  );

  const fileListProps = useMemo(()=>{
    return parseListImage(fileList)
  },[fileList])

  return (
    <UploadStyled
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType={listType}
      fileList={(fileListProps || [])}
      width={width}
      height={height}
      onChange={onChangeUpload}
      onPreview={onPreview}
      multiple={multiple}
      ref={ref}
      onBlur={onBlur}
    >
      {(fileList|| []).length < maxLength && uploadButton}
    </UploadStyled>
  );
}
