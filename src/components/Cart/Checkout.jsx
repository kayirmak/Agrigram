import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import OnlinePaymentImg from '../../assets/imgs/cart/online-payment.svg';
import CashPaymentImg from '../../assets/imgs/cart/cash-payment.svg';
import PhoneImg from '../../assets/imgs/cart/phone.svg';
import LocationImg from '../../assets/imgs/cart/location.svg';

import './checkout.scss';

function Checkout() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const {state} = useLocation();
    const navigate = useNavigate();

		const { t } = useTranslation();
  	const checkoutTr = t("checkout", { returnObjects: true });

    const {
        register,
        formState: {
            errors
        },
        watch,
        reset,
        handleSubmit,
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => {
        navigate("confirm", {state: {userData: data, orderData: state}});
    }

    return (
        <div className="checkout">
            <h2 className="checkout-title">{checkoutTr.title}</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="checkout-details">
                <div className="checkout-details-address md:mr-0">
                    <h3 className="checkout-details-address-title">{checkoutTr.form[0]}</h3>
                    
                    <div className="checkout-details-address-inputs">
                        <div>
                            <div>
                                <input
                                    {...register("phone", {
                                        required: `${checkoutTr.form[3]}`
                                    })}
                                    type="text"
                                    placeholder={checkoutTr.form[1]} />
                                <img src={PhoneImg} />
                            </div>
                            <div className="h-11">
                                {errors?.phone && (
                                    <span className="text-[red] text-lg">
                                        {errors?.phone?.message || "Error"}
                                    </span>
                                    )}
                            </div>
                        </div>

                        <div>
                            <div>
                                <input
                                    {...register("address", {
                                        required: `${checkoutTr.form[3]}`
                                    })}
                                    type="text"
                                    placeholder={checkoutTr.form[2]} />
                                <img src={LocationImg} />
                            </div>
                            <div className="h-11">
                                {errors?.address && (
                                    <span className="text-[red] text-lg">
                                        {errors?.address?.message || "Error"}
                                    </span>
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* <div className="checkout-details-address-map">
                        <span>Указать адрес на карте</span>
                        <div>
                            cart will be here
                        </div>
                    </div> */}

                    <div className="checkout-details-address-comment">
                        <textarea
                            {...register("comments")}
                            placeholder={checkoutTr.form[4]}>
                        </textarea>
                    </div>
                </div>

                <div className="checkout-details-info">
                  <div className="max-w-[27.3rem]">
										<h4 className="checkout-details-info-title">{checkoutTr.checkoutInfo[0]}</h4>
                    <hr />
										<div className="checkout-details-info-total-price flex flex-col gap-y-9 pt-9">
												<div className="total-price-item flex justify-between">
														<span className="text-grey-light font-bold text-xl lg:text-[1.27rem]">{checkoutTr.checkoutInfo[1]}</span>
														<span className="font-bold text-lg lg:text-[1.27rem]">{state.sum || 0} с</span>
												</div>
												<div className="total-price-item flex justify-between">
													<span className="font-bold text-base lg:text-[1.27rem]">{checkoutTr.checkoutInfo[2]}</span>
													<span className="font-medium text-main text-xl lg:text-[1.27rem]">{currentUser.bonus}</span>
												</div>
												<div className="total-price-item">
														<span className="font-bold text-base lg:text-[1.27rem]">{checkoutTr.checkoutInfo[3]}</span>
														<input
																{...register("bonus", {
																		required: false,
																		validate: (val) => {
																				if (val > currentUser.bonus) {
																						return `${checkoutTr.checkoutInfo[4]}`
																				}
																		},
																})}
																className="w-[22rem] h-14 rounded-lg mt-6 font-normal pl-3"
																type="number" />
														<div className="h-11">
																{errors?.bonus && (
																<span className="text-[red] text-lg">
																		{errors?.bonus?.message || "Error"}
																</span>
																)}
														</div>
												</div>

												<div className="total-price-item flex justify-between">
														<span className="font-bold text-xl lg:text-[1.27rem]">{checkoutTr.checkoutInfo[5]}</span>
														<span className="font-bold text-xl text-main lg:text-[1.27rem]">{!errors?.bonus?.message ? state.sum - watch("bonus") || 0 : state.sum} с</span>
												</div>
											</div>

											<div className="checkout-details-info-subtitle">
													<span>{checkoutTr.checkoutInfo[6]}</span>
											</div>

											<div className="checkout-details-info-payment">
												<div className="checkout-details-info-payment__online">
													<div>
															<img src={OnlinePaymentImg} />
															<span>{checkoutTr.checkoutInfo[7]}</span>
													</div>
													<label className="custom-radio">
															<input
																	{...register("paymentType", {
																			required: `${checkoutTr.checkoutInfo[8]}`
																	})}
																	type="radio"
																	value="Онлайн" />
															<span></span>
													</label>
												</div>
												<div className="checkout-details-info-payment__online">
														<div>
																<img src={CashPaymentImg} />
																<span>{checkoutTr.checkoutInfo[9]}</span>
														</div>
														<label className="custom-radio">
																<input 
																		{...register("paymentType", {
																				required: `${checkoutTr.checkoutInfo[8]}`
																		})}
																		type="radio"
																		value="Наличными" />
																<span></span>
														</label>
												</div>
											</div>
											<div className="h-11">
													{errors?.paymentType && (
													<span className="text-[red] text-lg">
															{errors?.paymentType?.message || "Error"}
													</span>
													)}
											</div>
											<button className="checkout-details-info-submit">{checkoutTr.checkoutInfo[10]}</button>
											<button className="checkout-details-info-cancel">{checkoutTr.checkoutInfo[11]}</button>
										</div>
                </div>
            </form>
        </div>
    )
}

export default Checkout;
