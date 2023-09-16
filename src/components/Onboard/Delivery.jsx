import React from "react";
import Kai from "../../assets/imgs/onboard/kai.svg";
import Helicopter from "../../assets/imgs/onboard/helicopter.svg";
import Arrow from "../../assets/imgs/onboard/arrow-icon.svg";
import "./style.scss";

const Delivery = () => {
	return (
		<section className="mb-[12.5rem] mt-[6.25rem]">
			<div className="max-w-[1440px] px-[5rem]">
				<div className="flex justify-between shadow-grayShadow">
					<div className="w-full p-[6.5rem] pl-[12.5rem]">
						<div className="skip">Пропустить</div>
						<div className="flex items-center justify-between ">
							<img className="img" src={Helicopter} alt="Helicopter" />
							<div className="relative">
								<h3 className="title">Быстрая доставка</h3>
								<p className="subtitle">
									Своевременная и качественная доставка с системой трекинга
								</p>
								<img className="arrow" src={Arrow} alt="arrow" />
							</div>
						</div>
					</div>
					<img className="h-[51.125rem] ]" src={Kai} alt="kai" />
				</div>
			</div>
		</section>
	);
};

export default Delivery;
