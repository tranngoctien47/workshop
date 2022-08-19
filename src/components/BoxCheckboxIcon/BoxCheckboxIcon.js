import { Space, Image, Checkbox } from 'antd'
import React from 'react'
import { IText } from '..'
import { BoxWidget } from './BoxCheckboxIcon.style'

export default function BoxCheckboxIcon({
    isCheked = false,
    onClick = ()=> {},
    name = "",
    icon
}) {
  return (
    <BoxWidget isCheked={isCheked} onClick={()=> onClick(isCheked)}>
        <Space>
            <Image src={icon} width={30} height={30} preview={false}/>
            <IText color="#444444" fSize={12}>{name}</IText>
        </Space>
        <Checkbox checked={isCheked} />
    </BoxWidget>
  )
}
