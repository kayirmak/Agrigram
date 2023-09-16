import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Settings from "./Settings";
import { profiles } from "../../data";

const Sidebar = () => {
	const [isActiveItem, setIsActiveItem] = useState(profiles[0]);
	const [isActiveChild, setIsActiveChild] = useState("");

	const { t } = useTranslation();
	const profileTr = t("profile", { returnObjects: true });

	const onActiveItem = (item) => {
		setIsActiveItem(item);
		setIsActiveChild("");
	};
	
	const onActiveChild = (item) => {
		setIsActiveChild(item);
	};



	return (
		<div className="flex flex-col justify-between sm:pr-4">
			<div className="sidebar flex flex-col gap-y-[3.8rem] sm:w-[3.5rem]">
				{
					profiles.map((item) => {
						if (item.type === "button") {
							return (
								<div key={item.id}>
									<div
										onClick={() => onActiveItem(item)}
										className={`${
											isActiveItem.id === item.id ? "bg-[#F2F2F2]" : null
										} w-[17.188rem] sm:w-[3.5rem] p-[0.8rem] flex items-center last:mb-0 cursor-pointer `}
									>
										<img src={item.img} alt="image" />
										<h3 className="ml-[0.688rem] text-[1.331rem] font-medium text-[#000] lg:text-[1.45rem] sm:hidden">
											{profileTr[item.title]}
										</h3>
									</div>

									<Settings 
										isActiveItem={isActiveItem}
										onActiveChild={onActiveChild}
										isActiveChild={isActiveChild}
										item={item}
										settings={item.children} />
								</div>
							)
						}
						
						return (
							<Link
								to={item.path}
								onClick={() => onActiveItem(item)}
								key={item.id}
								className={`${
									isActiveItem.id === item.id ? "bg-[#F2F2F2]" : null 
								} w-[17.188rem] sm:w-[3.5rem] p-[0.8rem] flex items-center last:mb-0 cursor-pointer`}
							>
								<img src={item.img} alt="image" />
								<h3 className="ml-[0.688rem] text-[1.331rem] font-medium text-[#000] lg:text-[1.27rem] sm:hidden">
									{profileTr[item.title]}
								</h3>
							</Link>
						)
					})
				}

			</div>
		</div>
	);
};

export default Sidebar;