import React from "react";
import Button from "./Button";

const CHAR_LIMIT = 616;
export default function SynopsisBioDescription({description}){
    // // console.log(description)
    const [renderRevealBtn, setRenderRevealBtn] = React.useState(false)
    const [descriptionLimit, setDescriptionLimit] = React.useState(CHAR_LIMIT)
    
    React.useEffect(() => {
        const isLong = description?.length > CHAR_LIMIT
        setRenderRevealBtn(isLong)

    }, [description])

    if(renderRevealBtn){
        return (
            <div className="section__synopsis-wrapper">
                <p>{description.substring(0, descriptionLimit)}{descriptionLimit !== CHAR_LIMIT ? '' : '...'}</p>
                <Button onClick={() => setDescriptionLimit(descriptionLimit !== CHAR_LIMIT ? CHAR_LIMIT : description.length)}>Read {descriptionLimit !== CHAR_LIMIT ? 'less' : 'more'}</Button>
            </div>
        )
    }

    return <p>{description}</p>
}