import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContext from "../store/toast-context";

const CustomToast = () => {
    const toastCtx = useContext(ToastContext);

    return (
        <>
            {toastCtx.showToast && (
                <Container className="d-flex justify-content-end mt-5">
                    <Toast
                        show={toastCtx.showToast}
                        onClose={toastCtx.closeToast}
                        autohide
                        delay={3000}
                        bg={toastCtx.toastStatus}
                    >
                        <Toast.Header>
                            <strong className="me-auto">
                                {toastCtx.toastStatus === "danger"
                                    ? "Error"
                                    : "Success"}
                            </strong>
                        </Toast.Header>
                        <Toast.Body>{toastCtx.toastMessage}</Toast.Body>
                    </Toast>
                </Container>
            )}
        </>
    );
};

export default CustomToast;
