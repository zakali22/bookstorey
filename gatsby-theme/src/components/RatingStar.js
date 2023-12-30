import React from "react"
import {useTheme} from "../../../site/src/utils/theme"

export default function RatingStar({rating}){
    const ratingsRef = React.useRef(null)
    const {darkMode} = useTheme()

    React.useEffect(() => {
        const starsList = ratingsRef.current.children
        const sliced = Array.from(starsList).slice(0, parseInt(rating))
        sliced.forEach((star) => {
            star.querySelector("path").setAttribute("style", darkMode ? 'fill:#191177': 'fill:white');
        })
        {/** If its not an integer then add half star */}
    }, [])

    const star = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                <path d="M26.4805 12.4039L21.1953 17.0164L22.7785 23.8836C22.8623 24.2426 22.8384 24.6183 22.7098 24.9638C22.5812 25.3093 22.3536 25.6092 22.0555 25.826C21.7574 26.0429 21.402 26.167 21.0337 26.183C20.6654 26.1989 20.3005 26.1059 19.9848 25.9156L13.9953 22.2828L8.01878 25.9156C7.70304 26.1059 7.33822 26.1989 6.96992 26.183C6.60162 26.167 6.24619 26.0429 5.94807 25.826C5.64994 25.6092 5.42236 25.3093 5.29375 24.9638C5.16515 24.6183 5.14125 24.2426 5.22503 23.8836L6.80589 17.0234L1.51956 12.4039C1.23996 12.1628 1.03778 11.8444 0.938373 11.4889C0.838967 11.1333 0.84676 10.7562 0.960774 10.4051C1.07479 10.0539 1.28995 9.74418 1.57927 9.51479C1.8686 9.28541 2.21921 9.14655 2.58714 9.11563L9.55511 8.51212L12.275 2.02462C12.4171 1.68421 12.6566 1.39343 12.9636 1.18891C13.2706 0.984379 13.6312 0.875244 14 0.875244C14.3689 0.875244 14.7295 0.984379 15.0365 1.18891C15.3434 1.39343 15.583 1.68421 15.725 2.02462L18.4532 8.51212L25.4188 9.11563C25.7867 9.14655 26.1373 9.28541 26.4266 9.51479C26.716 9.74418 26.9311 10.0539 27.0451 10.4051C27.1592 10.7562 27.167 11.1333 27.0675 11.4889C26.9681 11.8444 26.766 12.1628 26.4864 12.4039H26.4805Z" fill="white"/>
            </svg>
        )
    }
    

    const renderStars = () => {
    }

    return (
        <div className="ratings" ref={ratingsRef}>
        {
            Array.from({length: 5}).map(() => star())
        }
        </div>
    )
}