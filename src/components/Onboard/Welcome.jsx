import { Link } from "react-router-dom";

import Kai from "../../assets/imgs/onboard/kai.svg";
import Bag from "../../assets/imgs/onboard/bag.svg";

const Welcome = () => {
	return (
		<section className="mb-[12.5rem] mt-[6.25rem]">
			<div className="max-w-[1440px] px-[5rem]">
				<div className="flex justify-between shadow-grayShadow ">
					<div className="flex items-center justify-between w-full p-[6.25rem]">
						<img className="w-[32rem] h-[32rem]" src={Bag} alt="bag" />
						<div className="mr-[2rem]">
							<h2 className="font-semibold text-[2.25rem] mb-[6.875rem]">
								Добро пожаловать!
							</h2>
							<div className="flex flex-col justify-center">
								<Link to="sign-in">
									<button className="w-full font-semibold text-[1rem] bg-black h-[3.5rem] rounded-[0.5rem] text-white">
										Войти
									</button>
								</Link>
								<Link to="sign-up">
									<button className="w-full font-semibold text-[1rem] h-[3.5rem] rounded-[0.5rem] border-[2px] border-black my-[1.875rem]">
										Зарегистрироваться
									</button>
								</Link>
								<a
									className="font-semibold text-[1.25rem] text-center text-main-dark underline"
									href="#"
								>
									Продолжить как гость
								</a>
							</div>
						</div>
					</div>
					<img className="h-[51.125rem]" src={Kai} alt="kai" />
				</div>
			</div>
		</section>
	);
};

export default Welcome;
