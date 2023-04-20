import React, { ReactNode } from 'react'
import Slider from 'react-slick'

interface Props {
  dots: boolean
  infinite: boolean
  speed: number
  slideToShow: number
  slideToScroll: number
  children: ReactNode
}

export const Carousel: React.FC<Props> = ({
  dots,
  infinite,
  speed,
  slideToShow,
  slideToScroll,
  children
}) => {
  const settings = {
    dots: dots,
    infinite: infinite,
    speed: speed,
    slidesToShow: slideToShow,
    slidesToScroll: slideToScroll
  }
  return <Slider {...settings}>{children}</Slider>
}
