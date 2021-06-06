import * as React from 'react';
import {ReactNode} from 'react';
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../enumeration/RoutesEnum";
import withErrorBoundary from "../higherOrderComponents/errorBoundary/WithErrorBoundary";
import {Chip} from "../uiBasic/chip/chip.component";
import {ColorModeEnum} from "../../../enumeration/ColorModeEnum";
import * as style from "./landingpage.less";

@withErrorBoundary()
export class LandingPage extends React.Component {

    render(): ReactNode {
        return (
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
        )
    }
}