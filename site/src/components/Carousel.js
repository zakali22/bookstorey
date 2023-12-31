import * as React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../gatsby-theme/src/styles/carousel.scss";

import Slider from "react-slick";
import { useTheme } from "../utils/theme";

function Arrow({onClick, type}){
    const {darkMode} = useTheme()
    return (
        <button onClick={onClick} style={{marginLeft: type === 'next' ? '12px' : '0', marginRight: type === 'prev' ? '12px' : '0'}}>
            <svg width="14" height="24" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: type === 'prev' ? 'scaleX(-1)' : 'scaleX(1)' }}>
                <path d="M3.74007 33.6668C2.90007 33.6668 2.06007 33.2501 1.64007 32.8334C0.380068 31.5834 0.380068 29.5001 1.64007 28.2501L12.9801 17.0001L1.64007 5.75008C0.380068 4.50008 0.380068 2.41675 1.64007 1.16675C2.90007 -0.0832521 5.00007 -0.0832521 6.26007 1.16675L20.1201 14.5001C21.3801 15.7501 21.3801 17.8334 20.1201 19.0834L6.26007 32.4168C5.42007 33.2501 4.58007 33.6668 3.74007 33.6668Z" fill={darkMode ? '#fff' : '#191177'}/>
            </svg>
        </button>
    )
}

export default function Carousel({children, categoryIndex = null, maxWidth = '100%', layout = 'default', slidesToShow = 4, desktopSlidesToShow, tabletSlidesToShow = 2, mobileSlidesToShow = 1, hasBackground, backgroundColor, alignStart}){
    const slideRef = React.useRef(null)
    const {darkMode} = useTheme()

    var settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: layout === 'grid' ? 1 : desktopSlidesToShow || slidesToShow || 4,
        rows: layout === 'grid' ? 2 : 1,
        slidesPerRow: layout === 'grid' ? 2 : 1,
        prevArrow: null,
        nextArrow: null,
        slidesToScroll: layout === 'grid' ? 1 : slidesToShow,
        appendDots: (dots) => (
            <div className="carousel-custom-controls">
                <Arrow type="prev" onClick={slickPrev}/>
                <ul className={`${darkMode ? 'dark-mode' : ''}`}>{dots}</ul>
                <Arrow type="next" onClick={slickNext}/>
          </div>
        ),
        responsive: [
            {
              breakpoint: 1500,
              settings: {
                slidesToShow: layout === 'grid' ? 1 : desktopSlidesToShow || slidesToShow || 3,
              }
            },
            {
                breakpoint: 1400,
                settings: {
                  slidesToShow: layout === 'grid' ? 1 : desktopSlidesToShow || slidesToShow,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                  slidesToShow: layout === 'grid' ? 1 : 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: layout === 'grid' ? 2 : tabletSlidesToShow || 1,
                    slidesToScroll: tabletSlidesToShow,
                    rows: 1,
                    slidesPerRow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: mobileSlidesToShow || 1,
                    slidesToScroll: mobileSlidesToShow,
                    rows: 1,
                    slidesPerRow: 1,
                }
            },
        ]
    };

    function slickPrev(){
        slideRef.current.slickPrev()
    }

    function slickNext(){
        slideRef.current.slickNext()
    }

    function slideToCategoryIndex(){
        slideRef.current.slickGoTo(categoryIndex)
    }

    React.useEffect(() => {
        if(!categoryIndex) return
        slideToCategoryIndex()
    }, [categoryIndex])

    return (
        <Slider ref={slideRef} style={{maxWidth, marginLeft: 'auto', marginRight: 'auto'}} className={`${alignStart ? 'slick-align-start' : ''}  ${layout === 'grid' ? 'slick-grid' : ''} ${hasBackground ? 'slick-background' : ''} ${backgroundColor && hasBackground ? `slick-background--${backgroundColor}` : ''}`} {...settings}>{children}</Slider>
    );
}