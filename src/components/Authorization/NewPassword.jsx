import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { changePassword } from "../../store/auth/authApi";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import Kai from "../../assets/imgs/onboard/kai.svg";
import ShowPassword from "../../assets/imgs/autorization/show-password.svg";
import NounSlash from "../../assets/imgs/autorization/noun-slash.svg";

import "./style.scss";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

	const { t } = useTranslation();
	const newPasswordTr = t("newPassword", { returnObjects: true });

  const navigate = useNavigate();

  const {
    register,
    formState: { isValid, errors },
    reset,
    watch,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });
  const { state } = useLocation();

  const onSubmit = (data) => {
    setLoading(true);
    changePassword({user_id: state.data.toString(), new_password: data.password}, state.token)
      .then(() => {
        setLoading(false);
        navigate("/auth/confirmation");
        reset();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setErrorMessage(err.message);
      })
  }

  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="new-password">
            <div className="new-password-el">
              <h2 className="title">{newPasswordTr.title}</h2>
              <p>{newPasswordTr.desc}</p>
              <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-form-item">
                  <div className="auth-form-item-pass">
                    <input
                      {...register("password", {
                        required: `${newPasswordTr.required}`,
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder={newPasswordTr.placeholder}
                    />

                    <div className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                      <div className="img">
                        <img className="" src={ShowPassword} />
                        {showPassword ? <img className="img-slash" src={NounSlash} /> : ""}
                      </div>
                    </div>
                  </div>

                  <div className="h-4">
                    {errors?.password && (
                      <span className="text-[red] text-sm">
                        {errors?.password?.message || "Error"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="auth-form-item">
                  <div className="auth-form-item-pass">
                    <input
                      {...register("confirmPassword", {
                        required: `${newPasswordTr.required}`,
                        validate: (val) => {
                          if (watch("password") != val) {
                            return newPasswordTr.validate;
                          }
                        },
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={newPasswordTr.confPlaceholder}
                    />

                    <div className="toggle-pass" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <div className="img">
                        <img className="" src={ShowPassword} />
                        {showConfirmPassword ? <img className="img-slash" src={NounSlash} /> : ""}
                      </div>
                    </div>
                  </div>

                  <div className="h-4">
                    {errors?.confirmPassword && (
                      <span className="text-[red] text-sm">
                        {errors?.confirmPassword?.message || "Error"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="errorMessage h-4">{errorMessage}</div>
                <Button
                  disabled={!isValid || loading}
                  className="btn flex justify-center items-center"
                >
                  {loading ? <Loader /> : `${newPasswordTr.confirm}`}
                </Button>
              </form>
            </div>
          </div>
          <img className="image" src={Kai} alt="kai-icon" />
        </div>
      </div>
    </section>
  );
};

export default NewPassword;
