import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Loader from "../Loader/Loader";
import Button from "../Button/Button";

import { authWithGoogle, registerUser } from "../../store/auth/authApi";
import { clearAuthError } from "../../store/auth/authSlice";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase.config";

import Uzor from "../../assets/imgs/autorization/kai.svg";
import Frame from "../../assets/imgs/autorization/Rectangletwo.svg";
import ShowPassword from "../../assets/imgs/autorization/show-password.svg";
import NounSlash from "../../assets/imgs/autorization/noun-slash.svg";
import Google from "../../assets/imgs/autorization/google.svg";

import "./style.scss";

const Register = () => {
  const loading = useSelector((state) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { t } = useTranslation();
	const registerTr = t("register", { returnObjects: true });

  const {
    register,
    watch,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const errorMessage = useSelector((state) => state.auth.error);

  const fromPage = location.state?.from?.pathname || "/";

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    }
  }, []);

  const successReq = () => {
    navigate(fromPage, { replace: true });
    reset();
  };

  const onSubmit = async (data) => {
    const user = {
      login: data.email,
      name: data.userName,
      password: data.password,
      uid: Date.now(),
    };

    registerUser(dispatch, user, successReq);
  };

  const signInWithGoogle = async () => {
    const userByGoogle = await signInWithPopup(auth, provider);
    authWithGoogle(dispatch, userByGoogle, successReq);
  }

  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="register">
            <div className="register-block">
							<div className="frame">
              	<img src={Frame} alt="Frame" />
							</div>
              <div className="register-el">
                <h2 className="title">{registerTr.title}</h2>
                <form className="form auth-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="auth-form-item">
                    <input
                      {...register("userName", {
                        required: `${registerTr.required}`,
                      })}
                      type="text"
                      placeholder={registerTr.namePlaceholder}
                    />
                    <div className="h-4">
                      {errors?.userName && (
                        <span className="text-[red] text-sm">
                          {errors?.userName?.message || "Error"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="auth-form-item">
                    <input
                      {...register("email", {
                        required: `${registerTr.required}`,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: `${registerTr.emailMessage}`,
                        },
                      })}
                      type="text"
                      placeholder={registerTr.emailPlaceholder}
                    />
                    <div className="h-4">
                      {errors?.email && (
                        <span className="text-[red] text-sm">
                          {errors?.email?.message || "Error"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="auth-form-item">
                    <div className="auth-form-item-pass">
                      <input
                        {...register("password", {
                          required: `${registerTr.required}`,
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder={registerTr.passPlaceholder}
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
                          required: `${registerTr.required}`,
                          validate: (val) => {
                            if (watch("password") != val) {
                              return registerTr.confPassValidate;
                            }
                          },
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={registerTr.confPassPlaceholder}
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
                    {loading ? <Loader /> : `${registerTr.btn}`}
                  </Button>
                </form>

                <div className="description">
									{registerTr.desc[0]}
                </div>
                <a href="#" className="link">
									{registerTr.desc[1]}
                </a>
                <h3 className="or">{registerTr.or}</h3>
                <h4 className="des">{registerTr.withOut}</h4>
                <div className="social">
                  <button onClick={signInWithGoogle}>
                    <img src={Google} alt="socialMedia-icon" />
                  </button>
                </div>
                <div className="bottom-link">
									{registerTr.links[0]}
                  <Link to="/auth/sign-in">{registerTr.links[1]}</Link>
                </div>
              </div>
            </div>
          </div>
          <img className="img" src={Uzor} alt="uzor" />
        </div>
      </div>
    </section>
  );
};

export default Register;
