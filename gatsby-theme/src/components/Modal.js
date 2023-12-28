import * as React from "react"
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import "../styles/modal.scss"

export default NiceModal.create(({ name, children }) => {
    const modal = useModal();

    return (
        <div className="modal">
            <div className="modal__content">
                {children}
            </div>
            <div className="modal__overlay"></div>
        </div>
    )
})