import { useTranslation } from "react-i18next";
import "./notifications.scss";

const Notifications = () => {
  const { t } = useTranslation();
  const notificationTr = t("notification", { returnObjects: true });

  return (
    <div className="notification">
      <h2 className="font-bold text-2xl mb-12 text-center hidden sm:block">
        {notificationTr.title}
      </h2>
      <div className="notification-el">
        <p>
          {notificationTr.pushNatification[0]}
          <span> {notificationTr.pushNatification[1]} </span>
          {notificationTr.pushNatification[2]}
        </p>
        <div className="ml-[2rem] sm:ml-[1rem]">
          <input type="checkbox" />
        </div>
      </div>
      <div className="notification-line" />
      <div className="notification-el">
        <p>{notificationTr.newNatification}</p>
        <div className="ml-[2rem] sm:ml-[1rem]">
          <input type="checkbox" />
        </div>
      </div>
      <div className="notification-line hidden sm:block" />

      <button className="mt-[6rem] text-[1.45rem] bg-main rounded-xl text-white h-[4rem] w-full max-w-[30rem] mx-auto">
        {notificationTr.btn}
      </button>
    </div>
  );
};

export default Notifications;
