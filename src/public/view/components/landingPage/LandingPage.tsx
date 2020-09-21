import * as React from 'react';
import {ReactNode} from 'react';
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../service/RoutesEnum";
import withErrorBoundary from "@/public/view/components/common/errorBoundary/WithErrorBoundary";
import * as style from "./landingpage.css";

@withErrorBoundary()
export class LandingPage extends React.Component {

    render(): ReactNode {
        return (
            <div className={style.landingPageContainer}>
                <img src={'images/Portal_Logo.png'} className={style.appTitle} alt={"Portal Logo"}/>
                <div className={style.moduleLinksContainer}>
                    <Link to={RoutesEnum.BATTLE} className={style.landingPageModuleLink}>Battle</Link>
                    <Link to={RoutesEnum.TOME} className={style.landingPageModuleLink}>Tome</Link>
                </div>
            </div>
        )
    }
}