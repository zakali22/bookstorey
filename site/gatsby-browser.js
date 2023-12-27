import React from "react"
import AuthContextWrapper from "./src/utils/auth"
import { Toaster } from "react-hot-toast"

export const wrapRootElement = ({element}) => {
    return (
        <AuthContextWrapper>
            <Toaster />
            {element}
        </AuthContextWrapper>
    )
}