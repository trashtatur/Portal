import * as React from "react";
import {Menu} from "../menu/Menu";
import {Dicebar} from "../dicebar/Dicebar";
import {ReactElement} from "react";
import * as style from './topBar.css';

export class TopBar extends React.Component {

    render(): ReactElement {
        return (
            <div className={style.topBarContainer}>
                <Dicebar/>
                <img src={'images/Portal_Logo.png'} className={style.appTitle} alt={"Portal Logo"}/>
                <Menu/>
            </div>
        )
    }
}