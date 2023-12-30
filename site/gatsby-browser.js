import React from "react"
import AuthContextWrapper from "./src/utils/auth"
import ThemeContextWrapper from "./src/utils/theme";
import { Toaster } from "react-hot-toast"
import NiceModal from '@ebay/nice-modal-react';
import Modal from "../gatsby-theme/src/components/Modal";

NiceModal.register('modal-cmp', Modal);

export const wrapRootElement = ({ element }) => {
    return (
        <AuthContextWrapper>
            <ThemeContextWrapper>
                <Toaster />
                <NiceModal.Provider>
                    {element}
                </NiceModal.Provider>
            </ThemeContextWrapper>
        </AuthContextWrapper>
    )
}