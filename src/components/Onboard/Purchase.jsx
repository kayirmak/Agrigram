import React from "react";
import Kai from "../../assets/imgs/onboard/kai.svg";
import Person from "../../assets/imgs/onboard/person.svg";
import Arrow from "../../assets/imgs/onboard/arrow-icon.svg";
import "./style.scss";

const Purchase = () => {
	return (
		<section className="mb-[12.5rem] mt-[6.25rem]">
			<div className="max-w-[1440px] px-[5rem]">
				<div className="flex justify-between shadow-grayShadow p">
					<div className="w-full p-[6.25rem] pl-[12.5rem]">
						<div className="skip">Пропустить</div>
						<div className="flex items-center justify-between ">
							<img className="img" src={Person} alt="person" />
							<div className="relative">
								<h3 className="title">Онлайн покупки</h3>
								<p className="subtitle">
									Покупайте любимые товары не выходя из дома
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

export default Purchase;
