import * as React from "react"
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import "../styles/modal.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default NiceModal.create(({ name, children }) => {
    const modal = useModal();
    const {darkMode} = useTheme()
    
    return (
        <div className={`modal ${darkMode ? 'dark-mode': ''}`}>
            <div className="modal__content">
                {children}
            </div>
            <div className="modal__overlay"></div>
        </div>
    )
})