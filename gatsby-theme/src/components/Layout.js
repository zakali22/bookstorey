import React from "react"

export default function Layout({ children }){
    return (
        <>
            <div>Navigation</div>
            <main>{children}</main>
            <footer>Footer</footer>
        </>
    )
}