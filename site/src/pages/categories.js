import * as React from "react"
import { navigate } from "gatsby"

export default function Categories(){
    React.useEffect(() => {
        navigate("/categories/art")
    }, [])
}