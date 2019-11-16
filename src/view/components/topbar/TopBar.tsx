import * as React from "react";
import * as style from './topBar.module.css'
import {Menu} from "../menu/Menu";

export interface ITopParProps {

}

export interface ITopBarState {

}

export class TopBar extends React.Component<ITopParProps,ITopBarState> {

    render(): any {
        return (
            <div className={style.topBarContainer}>
                PORTAL
                <Menu/>
            </div>
        )
    }

}