import * as React from "react";
import {ReactElement} from "react";
import * as style from './creatureImage.css'

export interface CreatureImageProps {
    imagePath?: string;
}

export class CreatureImage extends React.Component<CreatureImageProps> {

    render(): ReactElement {
        return (
            <img
                className={style.creatureImage}
                src={this.props.imagePath || 'images/creatureImages/__unknown/__unknown.png'}
                alt={"Creature image"}
            />
        )
    }
}