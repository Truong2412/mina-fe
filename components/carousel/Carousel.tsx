import React, { ReactNode } from 'react'
import Slider from 'react-slick'

interface Props {
  dots?: boolean
  infinite?: boolean
  speed?: number
  slideToShow?: number
  slideToScroll?: number
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
    dots: dots ?? false,
    infinite: infinite ?? true,
    speed: speed ?? 500,
    slidesToShow: slideToShow ?? 4,
    slidesToScroll: slideToScroll ?? 1
  }
  return (
    <Slider className="w-carousel" {...settings}>
      {children}
    </Slider>
  )
}
