import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal/Modal";
import { persistor } from "../../store/store";
import { useTranslation } from "react-i18next";

import SadSmileImg from "../../assets/imgs/profile/sad-smile.svg";
import QuestionImg from "../../assets/imgs/modal/question.svg";

import { deleteAccount } from "../../store/auth/authApi";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

import './deleteAccount.scss';

function DeleteAccount() {
    const user = useSelector(state => state.auth.currentUser);
    const loading = useSelector(state => state.auth.loading);

    const [isActiveModal, setIsActiveModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

		const { t } = useTranslation();
		const deleteAccountTr = t("deleteAccount", { returnObjects: true });

    const delAccFromLS = () => {
        persistor.pause();
        persistor.flush().then(() => {
            navigate("/auth");
            return persistor.purge();
        })
        persistor.persist();
    }

    const onDeleteAccount = (userId) => {
        deleteAccount(dispatch, delAccFromLS, userId);
    } 

    return (
        <div className="delete-account sm:px-[4rem] xb:px-0">
						<h2 className="font-bold text-2xl mb-12 hidden sm:block">{deleteAccountTr.title}</h2>

            <div className="delete-account-img">
                <img src={SadSmileImg} />
            </div>

            <div className="delete-account-text">
                <p>{deleteAccountTr.desc[0]}</p>
                <p>
									{deleteAccountTr.desc[1]}
                  <br />{deleteAccountTr.desc[2]}
                </p>
                <p>
									{deleteAccountTr.desc[3]} 
                  <br />{deleteAccountTr.desc[4]}
                </p>
            </div>

            <div className="delete-account-btns">
                <button className="delete-account-btns__confirm" onClick={() => setIsActiveModal(true)}>{deleteAccountTr.deletMyAcc}</button>
            </div>
            
            <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
                <img className="modal-content-img" src={QuestionImg} />
                <h2 className="modal-content-title">{deleteAccountTr.con[0]}<br />{deleteAccountTr.con[1]}</h2>
                <div className="modal-footer-btns">
                    <button onClick={() => setIsActiveModal(false)} className="modal-footer-btns__no">{deleteAccountTr.confirm[0]}</button>
                    <button disabled={loading} onClick={() => onDeleteAccount(user.id)} className="modal-footer-btns__yes">
                        {loading ? <Loader /> : `${deleteAccountTr.confirm[1]}`}       
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteAccount;
