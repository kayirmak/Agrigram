import { useTranslation } from "react-i18next";

const UserAgreement = () => {
  const { t } = useTranslation();
  const userAgreementTr = t("userAgreement", { returnObjects: true });

  return (
    <div className="main max-w-[1440px] mx-auto px-20 my-20 sm:px-4 sm:mt-10">
      <h1 className="text-[2.27rem] font-bold mb-10 sm:text-center">
        {userAgreementTr[0].title}
      </h1>
      <div className="text-xl font-normal w-full lg:text-2xl sm:text-center">
        <p className="mb-6 font-semibold">{userAgreementTr[1].desc[0]}</p>
        <p className="mb-6">{userAgreementTr[1].desc[1]}</p>
        <p className="mb-6">{userAgreementTr[1].desc[2]}</p>
        <p className="mb-6">{userAgreementTr[1].desc[3]}</p>
        <p className="mb-6">{userAgreementTr[1].desc[4]}</p>
        <p className="mb-6 font-semibold">{userAgreementTr[2].desc[0]}</p>
        <p className="mb-6">{userAgreementTr[2].desc[1]}</p>
        <p className="mb-6">{userAgreementTr[2].desc[2]}</p>
        <p className="mb-6">{userAgreementTr[2].desc[3]}</p>
        <p className="mb-6 font-semibold">{userAgreementTr[3].desc[0]}</p>
        <p className="mb-6">{userAgreementTr[3].desc[1]}</p>
        <p className="mb-6">{userAgreementTr[3].desc[2]}</p>
      </div>
    </div>
  );
};

export default UserAgreement;
