import * as React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../gatsby-theme/src/styles/carousel.scss";

import Slider from "react-slick";

export default function Carousel({children}){
    var settings = {
        dots: true,
        arrows: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 3,
        // slidesToScroll: 1
    };

    return (
        <Slider {...settings}>{children}</Slider>
    );
}