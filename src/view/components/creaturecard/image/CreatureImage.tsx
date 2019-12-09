import * as React from "react";
import {CSSProperties} from "react";
import * as style from './creatureImage.module.css'

export interface ICreatureImageProps {
    imagePath?:string
}

export interface ICreatureState {

}

export class CreatureImage extends React.Component<ICreatureImageProps,ICreatureState> {

    render(): any {
        return (
            <img
                className={style.creatureImage}
                src={this.props.imagePath || 'images/creatureImages/__unknown/__unknown.png'}
            />
        )
    }
}