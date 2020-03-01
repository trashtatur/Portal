import * as React from "react";
import {Menu} from "../menu/Menu";
import {Dicebar} from "../dicebar/Dicebar";
import * as style from './topBar.css';

export interface ITopParProps {

}

export interface ITopBarState {

}

export class TopBar extends React.Component<ITopParProps,ITopBarState> {

    render(): any {
        return (
            <div className={style.topBarContainer}>
                <Dicebar/>
                <img src={'images/Portal_Logo.png'} className={style.appTitle} alt={"Portal Logo"}/>
                <Menu/>
            </div>
        )
    }

}