import { createContext, useState } from "react";

const ToastContext = createContext({
    showToast: false,
    toastMessage: "",
    openToast: () => {},
    setToastMessage: (msg) => {},
    closeToast: () => {},
    toastStatus: "",
    setToastStatus: (status) => {},
});

export function ToastContextProvider(props) {
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastStatus, setToastStatus] = useState("");

    function openToastHandler(user) {
        setShowToast(true);
    }

    function closeToastHandler() {
        setShowToast(false);
        setToastStatus("");
    }

    function setToastMessageHandler(message) {
        setToastMessage(message);
    }

    function setToastStatusHandler(status) {
        setToastStatus(status);
    }

    const context = {
        showToast,
        toastMessage,
        toastStatus,
        openToast: openToastHandler,
        setToastMessage: setToastMessageHandler,
        closeToast: closeToastHandler,
        setToastStatus: setToastStatusHandler,
    };

    return (
        <ToastContext.Provider value={context}>
            {props.children}
        </ToastContext.Provider>
    );
}

export default ToastContext;
