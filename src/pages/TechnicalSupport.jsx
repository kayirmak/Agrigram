import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SupportChat from "../components/SupportChat/SupportChat";

const TechnicalSupport = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const { t } = useTranslation();
  const technicalSupportTr = t("technicalSupport", { returnObjects: true });

  return (
    <div className="main max-w-[1440px] mx-auto px-20 my-20 sm:px-4 sm:mt-10">
      <h1 className="text-[2.27rem] font-bold mb-10">
        {technicalSupportTr[0].title}
      </h1>
      <div className="text-xl font-normal w-full lg:text-2xl sm:text-center mb-10">
        <p className="mb-6">{technicalSupportTr[1].desc[0]}</p>
        <p className="mb-6">{technicalSupportTr[1].desc[1]}</p>
        <p className="mb-6">{technicalSupportTr[1].desc[2]}</p>
        <p className="mb-6">{technicalSupportTr[1].desc[3]}</p>
        <p className="mb-2">{technicalSupportTr[1].desc[4]}</p>
        <p>{technicalSupportTr[1].desc[5]}</p>
      </div>
      {isAuth && <SupportChat supportChat={technicalSupportTr[2].supportChat}/>}
    </div>
  );
};

export default TechnicalSupport;
