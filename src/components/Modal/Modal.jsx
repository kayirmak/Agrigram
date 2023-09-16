import { useEffect } from "react";
import CloseModalImg from "../../assets/imgs/modal/close-modal.svg";

import './modal.scss';

function Modal({isActive, setIsActive, children}) {
    return (
        <div className={isActive ? "back-modal active" : "back-modal"} onClick={() => setIsActive(false)}>
            <div className={isActive ? "modal active" : "modal"} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-header-close" onClick={() => setIsActive(false)}>
                        <img src={CloseModalImg} />
                    </div>
                </div>

                <div className="modal-content">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Modal;
