import React from "react"
import AuthContextWrapper from "./src/utils/auth"

export const wrapRootElement = ({element}) => {
    return (
        <AuthContextWrapper>
            {element}
        </AuthContextWrapper>
    )
}