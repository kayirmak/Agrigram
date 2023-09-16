import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const privacyPolicyTr = t("privacyPolicy", { returnObjects: true });

  return (
    <div className="main max-w-[1440px] mx-auto px-20 my-20 sm:px-4 sm:mt-10">
      <h1 className="text-[2.27rem] font-bold mb-10 sm:text-center">
        {privacyPolicyTr[0].title}
      </h1>
      <div className="text-xl font-normal w-full lg:text-2xl sm:text-center">
        <p className="mb-6">{privacyPolicyTr[1].desc[0]}</p>
        <p className="mb-6 font-semibold">{privacyPolicyTr[1].desc[1]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[2]}</p>
        <p className="mb-6 font-semibold">{privacyPolicyTr[1].desc[3]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[4]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[5]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[6]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[7]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[8]}</p>
        <p className="mb-6 font-semibold">{privacyPolicyTr[1].desc[9]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[10]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[11]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[12]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[13]}</p>
        <p className="mb-6 font-semibold">{privacyPolicyTr[1].desc[14]}</p>
        <p className="mb-6">{privacyPolicyTr[1].desc[15]}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
