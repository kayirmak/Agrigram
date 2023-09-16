import React from "react";
import Kai from "../../assets/imgs/onboard/kai.svg";
import TShirt from "../../assets/imgs/onboard/T-shirt.svg";
import Arrow from "../../assets/imgs/onboard/arrow-icon.svg";
import "./style.scss";

const Aspects = () => {
	return (
		<section className="mb-[12.5rem] mt-[6.25rem]">
			<div className="max-w-[1440px] px-[5rem]">
				<div className="flex justify-between shadow-grayShadow">
					<div className="w-full p-[6.5rem] pl-[12.5rem]">
						<div className="skip">Пропустить</div>
						<div className="flex items-center justify-between ">
							<img className="img" src={TShirt} alt="tshirt" />
							<div className="relative">
								<h3 className="title max-w-[18.75rem] m-auto mb-[1.875rem]">
									Широкий спектр магазинов
								</h3>
								<p className="subtitle">
									Доставляем из самых разных магазинов города
								</p>
								<img className="arrow" src={Arrow} alt="arrow" />
							</div>
						</div>
					</div>
					<img className="h-[51.125rem]" src={Kai} alt="kai" />
				</div>
			</div>
		</section>
	);
};

export default Aspects;
