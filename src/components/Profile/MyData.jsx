import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { changeUser } from "../../store/auth/authApi";

import Loader from "../Loader/Loader";
import UploadAvatar from "../UploadAvatar/UploadAvatar";
import Button from "../Button/Button";

import "./mydata.scss";
import { useTranslation } from "react-i18next";

const MyData = () => {
	const user = useSelector(state => state.auth.currentUser);
	const loading = useSelector(state => state.auth.loading);

	const { t } = useTranslation();
	const myDataTr = t("myData", { returnObjects: true });

  const {
    register,
    formState: {
      isValid,
      isDirty,
      errors,
    },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      login: "",
      phone: "",
      address: ""
    }
  });

  const dispatch = useDispatch();

  const onChangeUser = (data) => {
    const changeUserByField = {}
    for (const key in data) {
      if (data[key]) {
        changeUserByField[key] = data[key]
      }
    }
    changeUser(dispatch, changeUserByField, () => reset(), user.id)
  }

  return (
    <div className="my-data">
			<h2 className="font-bold text-2xl mb-12 hidden sm:block">
				{myDataTr.title}
      </h2>
      <div className="my-data-el">
        <div className="full-name">
          <UploadAvatar />
          <div>
            <span>{user.name}</span>
            <br />
            <span className="spantwo">{user.address}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onChangeUser)}>
          <div className="form-el">
            <div>
              <div className="mb-[2rem]">
                <label className="label-my-data">{myDataTr.name}</label>
                <input
                  {...register("name", {
                    minLength: {
                      value: 2,
                      message: `${myDataTr.nameErr}`
                    }
                  })}
                  type="text"
                  placeholder={user.name}
                  className="input-my-data" />
                <div className="h-4 mt-1">
                  {errors?.name && (
                    <span className="text-[red] text-sm">
                      {errors?.name?.message || "Error"}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-[2rem]">
                <label className="label-my-data">Телефон</label>
                <input
                  {...register("phone", {
                    pattern: {
                      message: `${myDataTr.num}`
                    }
                  })}
                  type="number"
                  placeholder={user.phone || ""}
                  className="input-my-data mb-0" />
                <div className="h-4 mt-1">
                  {errors?.phone && (
                    <span className="text-[red] text-sm">
                      {errors?.phone?.message || "Error"}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="mb-[2rem] sm:hidden">
                <label className="label-my-data">E-mail</label>
                <input
                  {...register("login", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${myDataTr.emailErr}`
                    }
                  })}
                  type="email"
                  placeholder={user.login}
                  className="input-my-data" />
                <div className="h-4 mt-1">
                  {errors?.login && (
                    <span className="text-[red] text-sm">
                      {errors?.login?.message || "Error"}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-[2rem]">
                <label className="label-my-data">{myDataTr.address}</label>
                <input
                  {...register("address", {
                    minLength: {
                      value: 5,
                      message: `${myDataTr.addressErr}`
                    }
                  })}
                  type="text"
                  placeholder={user.address || ""}
                  className="input-my-data mb-0" />
                <div className="h-4 mt-1">
                  {errors?.address && (
                    <span className="text-[red] text-sm">
                      {errors?.address?.message || "Error"}
                    </span>
                  )}
                </div>  
              </div>
            </div>
          </div>

          <Button
            className="btn flex justify-center items-center max-w-[17.5rem] mx-auto"
            disabled={!isValid || !isDirty || loading}>
            {loading ? <Loader /> : `${myDataTr.save}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyData;
