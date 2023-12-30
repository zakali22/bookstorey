import React from "react"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { useTheme } from "../../../site/src/utils/theme"

export default function Layout({ children }){
    const {darkMode} = useTheme()

    return (
        <>
            <Navigation />
            <main className={`${darkMode ? 'dark-mode' : ''}`}>{children}</main>
            <Footer />
        </>
    )
}