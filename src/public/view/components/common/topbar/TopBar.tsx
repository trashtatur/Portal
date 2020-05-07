import * as React from "react";
import {ReactElement} from "react";
import {PathfinderMenu} from "../menu/PathfinderMenu";
import {Dicebar} from "../dicebar/Dicebar";
import {SystemsEnum} from "../../../../enumeration/SystemsEnum";
import {DND5Menu} from "../../module-battle/dnd5/menu/DND5Menu";
import {Link} from 'react-router-dom'
import {RoutesEnum} from "../../../../service/RoutesEnum";
import * as style from './topBar.css';

interface TopBarProps {
    system: SystemsEnum;
}

export class TopBar extends React.Component<TopBarProps> {

    render(): ReactElement {
        return (
            <div className={style.topBarContainer}>
                <Dicebar/>
                <img src={'images/Portal_Logo.png'} className={style.appTitle} alt={"Portal Logo"}/>
                <div className={style.systemMenuContainer}>
                    <Link to={RoutesEnum.BATTLE}>⚔</Link>
                    <Link to={RoutesEnum.TOME}>🕮</Link>
                {
                    this.props.system === SystemsEnum.PATHFINDER &&
                    <PathfinderMenu/>
                }
                {
                    this.props.system === SystemsEnum.DND5 &&
                    <DND5Menu/>
                }
                </div>
            </div>
        )
    }
}