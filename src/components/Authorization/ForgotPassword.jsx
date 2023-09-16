import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { resetPassword } from "../../store/auth/authApi";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import Kai from "../../assets/imgs/onboard/kai.svg";
import Frame from "../../assets/imgs/autorization/Rectanglethree.svg";

import "./style.scss";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

	const { t } = useTranslation();
  const forgotPasswordTr = t("forgotPassword", { returnObjects: true });

  const {
    register,
    formState: {
      isValid, errors
    },
    reset,
    handleSubmit
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    setLoading(true);
    resetPassword({login: data.email})
      .then((res) => {
        setLoading(false);
        reset();
        navigate("/auth/verification");
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage(err);
      });
  }

  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="forgot-password">
						<div className="frame">
            	<img src={Frame} alt="Frame-icon" />
						</div>
            <div className="forgot-password-el">
              <div>
                <h2 className="title">
                  {forgotPasswordTr.title}
                </h2>
                <p className="p">
									{forgotPasswordTr.desc}
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register("email", {
                      required: `${forgotPasswordTr.required}`,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: `${forgotPasswordTr.message}`,
                      },
                    })}
                    className="input"
                    type="text"
                    placeholder={forgotPasswordTr.placeholder}
                  />

                  <div className="h-4">
                    {errors?.email && (
                      <span className="text-[red] text-sm">
                        {errors?.email?.message || "Error"}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-[red] mt-[1.875rem]">{errorMessage}</div>
                  <Button
                    className="btn flex justify-center items-center"
                    disabled={!isValid || loading}
                  >
                    {loading ? <Loader /> : `${forgotPasswordTr.btn}`}
                  </Button>
                </form>
              </div>

              <div className="bottom-link">
								{forgotPasswordTr.linkDesc}
                <Link to="/auth/sign-in">{forgotPasswordTr.linkBtn}</Link>
              </div>
            </div>
          </div>

          <img className="image" src={Kai} alt="kai-icon" />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
