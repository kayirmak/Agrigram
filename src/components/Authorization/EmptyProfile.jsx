import { useTranslation } from "react-i18next";
import Kai from "../../assets/imgs/onboard/kai.svg";
import Child from "../../assets/imgs/autorization/child.svg";

import Button from "../../components/Button/Button"


import { Link } from "react-router-dom";

import "./style.scss";

const EmptyProfile = () => {
	const { t } = useTranslation();
	const emptyProfileTr = t("emptyProfile", { returnObjects: true })

	return (
		<section className="authorization">
			<div className="authorization-container">
				<div className="authorization-shadow">
					<div className="empty">
						<div className="empty-el">
							<img src={Child} alt="Child-icon" />
							<p >{emptyProfileTr.title}</p>

              <Link to="sign-in">
                <Button className="btn">
									{emptyProfileTr.btn}
                </Button>
              </Link>
              
							<div className="bottom-link">
								{emptyProfileTr.links[0]}
								<Link to="sign-up">{emptyProfileTr.links[1]}</Link>
							</div>
						</div>
					</div>
					<img className="image" src={Kai} alt="kai-icon" />
				</div>
			</div>
		</section>
	);
};

export default EmptyProfile;
