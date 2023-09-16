import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Sidebar from "../components/Profile/Sidebar";
import Modal from "../components/Modal/Modal";

import { logout } from "../store/auth/authApi";
import { persistor } from "../store/store";
import { useTranslation } from "react-i18next";

import Logout from "../assets/imgs/profile/logout-icon.svg"
import "./profilePage.scss";

export const ProfilePage = () => {
	const [isActiveModal, setIsActiveModal] = useState(false);

	const { t } = useTranslation();
  const prifilePageTr = t("prifilePage", { returnObjects: true });

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogout = () => {
		persistor.pause();
		persistor.flush().then(() => {
			navigate("/auth");
			return persistor.purge();
		})
		persistor.persist();
		logout(dispatch);
	}

  return (
    <div className="profile-page">
      <div className="profile-page-container sm:px-4">
        <div className="profile-page-block">
          <div>
            <div className="flex">
              <Sidebar />
              <Outlet />
            </div>
            <div
              className="flex cursor-pointer w-fit items-center mt-20 pl-[0.8rem] font-medium text-[1.5rem] text-[#504E59]"
              onClick={() => setIsActiveModal(true)}
            >
              {prifilePageTr.logOut}
              <img className="ml-[0.625rem]" src={Logout} alt="logout" />
            </div>
            <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
              <h2 className="modal-content-title">
							{prifilePageTr.questions[0]} <br /> {prifilePageTr.questions[1]}
              </h2>
              <div className="modal-footer-btns">
                <button
                  className="modal-footer-btns__no"
                  onClick={() => setIsActiveModal(false)}
                >
                  {prifilePageTr.confirm[0]} 
                </button>
                <button className="modal-footer-btns__yes" onClick={onLogout}>
									{prifilePageTr.confirm[1]} 
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
