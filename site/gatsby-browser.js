import React from "react"
import AuthContextWrapper from "./src/utils/auth"
import { Toaster } from "react-hot-toast"
import NiceModal from '@ebay/nice-modal-react';
import Modal from "../gatsby-theme/src/components/Modal";

NiceModal.register('modal-cmp', Modal);

export const wrapRootElement = ({element}) => {
    return (
        <AuthContextWrapper>
            <Toaster />
            <NiceModal.Provider>
                {element}
            </NiceModal.Provider>
        </AuthContextWrapper>
    )
}