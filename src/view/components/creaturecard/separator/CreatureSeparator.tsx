import * as React from "react";
import * as style from './creatureSeparator.module.css'

export interface ICreatureSeparatorProps {

}

export interface ICreatureSeparatorState {

}

export class CreatureSeparator extends React.Component<ICreatureSeparatorProps,ICreatureSeparatorState>{

    render(): any {
        return <img className={style.redLine} src="images/red_fade_line.png"/>
    }
}