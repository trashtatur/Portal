import * as React from "react";
import * as style from './topBar.module.css'
import {Menu} from "../menu/Menu";
import {Dicebar} from "../dicebar/Dicebar";

export interface ITopParProps {

}

export interface ITopBarState {

}

export class TopBar extends React.Component<ITopParProps,ITopBarState> {

    render(): any {
        return (
            <div className={style.topBarContainer}>
                <Dicebar/>
                <h2 className={style.appTitle}>PORTAL</h2>
                <Menu/>
            </div>
        )
    }

}