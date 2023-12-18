import * as React from "react"
import Section from "../../../../gatsby-theme/src/components/Section";

export default function AccountLanding({user, logout}){
    return (
        <Section>
            <h2>Welcome <span style={{borderBottom: "2px solid #191177", padding: 0, lineHeight: 1}}></span> to your account</h2>
            <a href="#logout" onClick={(e) => {
                logout()
                e.preventDefault()
            }}>Logout</a>
        </Section>
    )
}