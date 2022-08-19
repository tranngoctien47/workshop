import React, { Fragment, useEffect, useRef, useState } from "react";
import { Carousel, Image } from "antd";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.css"

const CarouselStyled = styled(Carousel)`
`;

const carouselSettings = {
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false
};

const carouselSettings2 = {
  arrows: true,
  slidesToShow: 8,
  swipeToSlide: true,
  focusOnSelect:true,
  dots: false,
  infinite: false,
};

export default function CarouselCustom({ listFile = [], isBorder }) {
  const refCarousel = useRef();
  const refCarousel2 = useRef();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(()=>{
    setNav1(refCarousel.current);
    setNav2(refCarousel2.current);
  },[])

  return (
    <Fragment>
      <div style={{
        padding: isBorder? "24px" : 0,
        border: isBorder ? "1px solid #C4C4C4" : "unser",
        marginBottom:isBorder ? 24 : 0
      }}>
        <CarouselStyled
          {...carouselSettings}
          style={{ width: "100%" }}
          nextArrow={<ArrowRightOutlined/>}
          prevArrow={<ArrowLeftOutlined/>}
          ref={refCarousel}
          asNavFor={nav2}
        >
          {listFile.map((item) => (
            <div>
              <Image width="100%" src={item} />
            </div>
          ))}
        </CarouselStyled>
      </div>
      <Carousel
        {...carouselSettings2}
        asNavFor={nav1}
        className="secondaryCarouse"
        style={{ width: "100%" }}
        ref={refCarousel2}
        nextArrow={<RightOutlined/>}
        prevArrow={<LeftOutlined/>}
      >
        {[...listFile].map((item) => (
          <div key={item} style={{cursor:"pointer"}}>
            <Image preview={false} style={{border: "1px solid #C4C4C4"}} width="90%" height="auto" src={item} />
          </div>
        ))}
      </Carousel>
    </Fragment>
  );
}
