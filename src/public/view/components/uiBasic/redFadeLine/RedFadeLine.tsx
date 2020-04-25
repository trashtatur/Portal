import * as React from "react";
import {ReactElement} from "react";
import * as style from './redFadeLine.css'


export class RedFadeLine extends React.Component{

    render(): ReactElement {
        return <img
            className={style.redLine}
            src="images/red_fade_line.png"
            alt={"Creature card separator"}
        />
    }
}