import { useTranslation } from "react-i18next";
import "./privacy-policy.scss";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const privacyPolicyTr = t("privacyPolicy", { returnObjects: true });

  return (
    <div className="privacy-policy">
      <h1 className="text-[2.27rem] font-bold mb-10 sm:text-[2rem] xb:text-2xl">
        {privacyPolicyTr[0].title}
      </h1>
      <div className="text-xl font-normal w-full">
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
