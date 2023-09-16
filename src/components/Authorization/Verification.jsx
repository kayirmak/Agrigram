import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { resetPasswordAfterCode } from "../../store/auth/authApi";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import Kai from "../../assets/imgs/onboard/kai.svg";

import "./style.scss";
import "./input.scss";

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

	const { t } = useTranslation();
	const verificationTr = t("verification", { returnObjects: true })

  const {
    register,
    formState: {
      isValid
    },
    reset,
    handleSubmit
  } = useForm({
    mode: "onChange"
  })

  const verifyItems = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    verifyItems.current.firstElementChild.focus();
  }, [])

  const inpVal = (e) => {
    const target = e.target;
    if (target.nextElementSibling && target.maxLength == target.value.length) {
      target.nextElementSibling.focus();
    }
    else if (!target.nextElementSibling) target.blur();
  }

  const sendCode = (data) => {
    let code = "";
    for (const key in data) {
      code += data[key];        
    };
    setLoading(true);
    resetPasswordAfterCode({code})
    .then((res) => {
      setLoading(false);
      reset();
      navigate("/auth/new-password", {state: res.data});
    })
    .catch(err => {
      setLoading(false);
      setErrorMessage(err);
    })
  }

  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="verification">
            <div className="verification-el">
              <h2 className="title">{verificationTr.title}</h2>
              <p>
								{verificationTr.desc}
              </p>
              <form className="verification-form" onSubmit={handleSubmit(sendCode)}>
                <div className="verification-form-inputs" ref={verifyItems}>
                  {[...new Array(6)].map((_, i) => (
                    <input
                      {...register(`code-${i}`, {
                        required: `${verificationTr.required}`
                      })}
                      onChange={inpVal}
                      key={i}
                      type="text"
                      maxLength={1}
                      className="focuse"
                    />
                  ))}
                </div>
                <div className="text-[red]">{errorMessage}</div>
                <Button
                  className="btn md:w-[20.688rem] flex justify-center items-center"
                  disabled={!isValid || loading}
                >
                  {loading ? <Loader /> : `${verificationTr.confirm}`}
                </Button>
              </form>
              <div className="bottom-link">
								{verificationTr.link}
                <a href="#">{verificationTr.linkBtn}</a>
              </div>
            </div>
          </div>
          <img className="image" src={Kai} alt="kai-con" />
        </div>
      </div>
    </section>
  );
};

export default Verification;
