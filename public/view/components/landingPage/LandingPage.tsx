import * as React from 'react';
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../enumeration/RoutesEnum";
import {Chip} from "../uiBasic/chip/chip.component";
import {ColorModeEnum} from "../../../enumeration/ColorModeEnum";
import * as style from "./landingpage.less";

export const LandingPage = () => (
    <div className={style.landingPageContainer}>
        <img src={'images/Portal_Logo.png'} className={style.appTitle} alt={"Portal Logo"}/>
        <div className={style.moduleLinksContainer}>
            <Chip colorMode={ColorModeEnum.ANTHRACITE} hoverEffect>
                <Link to={RoutesEnum.BATTLE}>Battle</Link>
            </Chip>
            <Chip colorMode={ColorModeEnum.ANTHRACITE} hoverEffect>
                <Link to={RoutesEnum.TOME}>Tome</Link>
            </Chip>
        </div>
    </div>
);
