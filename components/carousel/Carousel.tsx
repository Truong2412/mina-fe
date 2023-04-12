import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

interface Props {
  dots: boolean
  infinite: boolean
  speed: number
  slideToShow: number
  slideToScroll: number
}

export const Carousel: React.FC<Props> = ({
  dots,
  infinite,
  speed,
  slideToShow,
  slideToScroll
}) => {
  const settings = {
    dots: dots,
    infinite: infinite,
    speed: speed,
    slidesToShow: slideToShow,
    slidesToScroll: slideToScroll
  }
  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  )
}
