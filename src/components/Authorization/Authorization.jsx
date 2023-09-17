import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import { authUser, authWithGoogle } from "../../store/auth/authApi";
import { clearAuthError } from "../../store/auth/authSlice";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase.config";

import Uzor from "../../assets/imgs/autorization/kai.svg";
import Frame from "../../assets/imgs/autorization/Rectangle.svg";
import ShowPassword from "../../assets/imgs/autorization/show-password.svg";
import NounSlash from "../../assets/imgs/autorization/noun-slash.svg";
import Google from "../../assets/imgs/autorization/google.svg";

import "./style.scss";

const Authorization = () => {
  const loading = useSelector((state) => state.auth.loading);
  const errorMessage = useSelector((state) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, []);

  const fromPage = location.state?.from?.pathname || "/";

  const successReq = () => {
    navigate(fromPage, { replace: true });
    reset();
  };

  const onSubmit = async (data) => {
    const user = {
      login: data.email,
      password: data.password,
    };
    authUser(dispatch, user, successReq);
  };

  const signInWithGoogle = async () => {
    const userByGoogle = await signInWithPopup(auth, provider);
    authWithGoogle(dispatch, userByGoogle, successReq);
  };

  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="authorization-block">
            <div className="frame">
              <img src={Frame} alt="Frame-icon" />
            </div>
            <div className="authorization-block-el">
              <h2 className="title">Привет, рады вас видеть снова!</h2>
              <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-form-item">
                  <input
                    {...register("email", {
                      required: `Поле обязательно к заполнению`,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: `Некорректный email`,
                      },
                    })}
                    className="input"
                    type="text"
                    placeholder="Ваш email"
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
                        required: `Поле обязательно к заполнению`,
                      })}
                      className="input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ваш парол"
                    />

                    <div
                      className="toggle-pass"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <div className="img">
                        <img className="" src={ShowPassword} />
                        {showPassword ? (
                          <img className="img-slash" src={NounSlash} />
                        ) : (
                          ""
                        )}
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

                {/* <Link to="/Agrigram/auth/forgot-password" className="a">
                  Ваш пароль
                </Link> */}

                <div className="text-[red] h-4">{errorMessage}</div>
                <Button
                  className="btn flex justify-center items-center"
                  disabled={!isValid || loading}
                >
                  {loading ? <Loader /> : `Войти`}
                </Button>
              </form>
              <h3 className="or">или</h3>
              <h4 className="without">войти через</h4>
              <div className="social">
                <button onClick={signInWithGoogle}>
                  <img src={Google} alt="socialMedia-icon" />
                </button>
              </div>
              <div className="bottom-link ">
                У вас нет аккаунта?
                <Link to="/Agrigram/auth/sign-up">Зарегистрироваться</Link>
              </div>
            </div>
          </div>
          <img className="image" src={Uzor} alt="uzor-icon" />
        </div>
      </div>
    </section>
  );
};

export default Authorization;
