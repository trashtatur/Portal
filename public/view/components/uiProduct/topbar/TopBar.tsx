import * as React from "react";
import {ReactElement} from "react";
import {Dicebar} from "../dicebar/Dicebar.component";
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../../enumeration/RoutesEnum";
import withErrorBoundary from "../../higherOrderComponents/errorBoundary/WithErrorBoundary";
import * as style from './topBar.css';

interface TopBarProps {
    system: string;
}

@withErrorBoundary()
export class TopBar extends React.Component<TopBarProps> {

    render(): ReactElement {
        return (
            <div className={style.topBarContainer}>
                <Dicebar/>
                <img src={'images/Portal_Logo.png'} className={style.appTitle} alt={"Portal Logo"}/>
                <div className={style.systemMenuContainer}>
                    <Link to={RoutesEnum.BATTLE}>⚔</Link>
                    <Link to={RoutesEnum.TOME}>🕮</Link>
                </div>
            </div>
        )
    }
}